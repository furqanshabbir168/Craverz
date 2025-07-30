import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendEmail } from "../utils/emailService.js";

// REGISTER USER
async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const emailExist = await userModel.findOne({ email });
    if (emailExist) return res.status(400).json({ message: "User already exists" });

    // Hash password & OTP
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    // Create user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      otp: hashedOtp,
      otpExpiry: Date.now() + 2 * 60 * 1000 // 2 minutes
    });

    // Send email with styled HTML
    await sendEmail(email, "Craverz Email Verification", `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #ddd; border-radius: 8px; background-color: #fff;">
        <h2 style="text-align: center; color: #e63946;">🍔 Welcome to <span style="color: #1d3557;">Craverz</span></h2>
        <p style="font-size: 16px; color: #333;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 16px; color: #333;">
          Thank you for signing up on <strong>Craverz</strong>. To verify your email, use the OTP below:
        </p>
        <div style="text-align: center; margin: 24px 0;">
          <span style="font-size: 32px; font-weight: bold; color: #1d3557; letter-spacing: 4px;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #555;">This OTP is valid for <strong>2 minutes</strong>. Do not share it with anyone.</p>
        <hr style="margin: 24px 0;" />
        <p style="font-size: 12px; color: #999;">If you didn’t request this, ignore the email.</p>
      </div>
    `);

    res.status(201).json({ message: "OTP sent to email. Please verify." });

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

    // Check OTP expiry
    if (Date.now() > user.otpExpiry) {
      await userModel.deleteOne({ email }); // Delete user on expiry
      return res.status(400).json({
        message: "OTP expired. Please register again. Your data has been removed.",
      });
    }

    const hashedInputOtp = crypto.createHash("sha256").update(otp).digest("hex");

    if (hashedInputOtp !== user.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Success — update user
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });

  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export { registerUser, verifyOtp };
