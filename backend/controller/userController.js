import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import validator from 'validator';
import { sendEmail } from "../utils/emailService.js";
import { inngest } from "../inngest/index.js";
import jwt from 'jsonwebtoken'

// REGISTER USER
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Validate password
    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password and OTP
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    // Save user with unverified status
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      otp: hashedOtp,
      isVerified: false
    });

    // Send OTP email
    await sendEmail(email, "Cravez Email Verification", `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff;">
        <h2 style="text-align: center; color: #e63946;">🍔 Welcome to <span style="color: #e63946; font-weight: bold;">CRAVEZ</span></h2>

        <p style="font-size: 16px; color: #333;">Dear <strong>${name}</strong>,</p>

        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          We're thrilled to have you join <strong style="color: #e63946;">CRAVEZ</strong> – your ultimate destination for fast, fresh, and delicious food delivered right to your doorstep.
          <br /><br />
          To complete your registration and ensure your account's security, please verify your email by entering the One-Time Password (OTP) provided below.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 36px; font-weight: bold; color: #1d3557; letter-spacing: 6px;">${otp}</span>
        </div>

        <p style="font-size: 14px; color: #555; line-height: 1.6;">
          🔐 This OTP is valid for <strong>2 minutes</strong> only. For your safety, please do not share this code with anyone. If you did not sign up for <strong style="color: #e63946;">CRAVEZ</strong>, please disregard this email.
        </p>

        <hr style="margin: 32px 0;" />

        <p style="font-size: 14px; color: #333; line-height: 1.6;">
          If you have any questions or need help, feel free to reply to this email or reach out to our support team anytime.
          <br />
          We're here to ensure your experience with <strong style="color: #e63946;">CRAVEZ</strong> is nothing short of delicious!
        </p>

        <p style="font-size: 14px; color: #999; margin-top: 32px;">
          Warm regards,<br />
          The <strong style="color: #e63946;">CRAVEZ</strong> Team
        </p>
      </div>
    `);

    // Trigger Inngest function to delete unverified user after 2 minutes
    await inngest.send({
      name: "user/unverified.registered",
      data: { email }
    });

    res.status(201).json({ message: "OTP sent to email. Please verify within 2 minutes." });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
// VERIFY OTP
async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    const hashedInputOtp = crypto.createHash("sha256").update(otp).digest("hex");

    if (hashedInputOtp !== user.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Update verification status
    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // adjust as needed
    );

    res.status(200).json({
      message: "Email verified successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      }
    });

  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export { registerUser , verifyOtp};
