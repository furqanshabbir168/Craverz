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
    res.status(500).json({ 
      message: "Server error",
     });
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
// LOGIN USER
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is verified
    if (!userExist.isVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    // Compare password
    const passwordMatched = await bcrypt.compare(password, userExist.password);
    if (!passwordMatched) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: userExist._id, email: userExist.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        isVerified: userExist.isVerified,
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
// FORGOT PASSWORD
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    // Save OTP to user
    user.otp = hashedOtp;
    await user.save();

    // Send OTP email
    await sendEmail(email, "Cravez Password Reset", `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #ddd; border-radius: 8px; background-color: #ffffff;">
        <h2 style="text-align: center; color: #e63946;">🔐 Password Reset - <span style="color: #e63946; font-weight: bold;">CRAVEZ</span></h2>

        <p style="font-size: 16px; color: #333;">Dear <strong>${user.name}</strong>,</p>

        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          We received a request to reset your password for your <strong style="color: #e63946;">CRAVEZ</strong> account.
          <br /><br />
          To proceed with resetting your password, please use the One-Time Password (OTP) provided below:
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 36px; font-weight: bold; color: #1d3557; letter-spacing: 6px;">${otp}</span>
        </div>

        <p style="font-size: 14px; color: #555; line-height: 1.6;">
          🔐 This OTP is valid for <strong>10 minutes</strong> only. For your safety, please do not share this code with anyone. If you did not request a password reset, please ignore this email and your password will remain unchanged.
        </p>

        <hr style="margin: 32px 0;" />

        <p style="font-size: 14px; color: #333; line-height: 1.6;">
          If you have any questions or need help, feel free to reply to this email or reach out to our support team anytime.
          <br />
          We're here to keep your <strong style="color: #e63946;">CRAVEZ</strong> account secure!
        </p>

        <p style="font-size: 14px; color: #999; margin-top: 32px;">
          Best regards,<br />
          The <strong style="color: #e63946;">CRAVEZ</strong> Team
        </p>
      </div>
    `);

    // TRIGGER INNGEST FUNCTION - This will expire the OTP after 10 minutes
    await inngest.send({
      name: "user/password-reset.otp-sent",
      data: { email }
    });

    res.status(200).json({ message: "Password reset OTP sent to your email. Please check your inbox." });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
// VERIFY RESET OTP
async function verifyResetOtp(req, res) {
  try {
    const { otp } = req.body;

    // Validate input
    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    // Hash the input OTP to find the user
    const hashedInputOtp = crypto.createHash("sha256").update(otp).digest("hex");
    
    // Find user by the hashed OTP
    const user = await userModel.findOne({ otp: hashedInputOtp });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    // Generate a temporary reset token (valid for 15 minutes)
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    // Save the reset token to user (you might want to add resetToken and resetTokenExpiry fields to schema)
    // For now, we'll reuse the otp field with a prefix to distinguish it
    user.otp = `reset_${hashedResetToken}_${Date.now() + 15 * 60 * 1000}`; // 15 minutes expiry
    await user.save();

    res.status(200).json({
      message: "OTP verified successfully. You can now reset your password.",
      resetToken, // Send unhashed token to frontend
      expiresIn: "15 minutes"
    });

  } catch (error) {
    console.error("Verify Reset OTP Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
// RESET PASSWORD
async function resetPassword(req, res) {
  try {
    const { resetToken, newPassword } = req.body;

    // Validate inputs
    if (!resetToken || !newPassword) {
      return res.status(400).json({ message: "Reset token and new password are required" });
    }

    // Validate password length
    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // Hash the reset token to find the user
    const hashedResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    // Find user with the reset token (remember we stored it as "reset_{hashedToken}_{expiry}")
    const users = await userModel.find({});
    let targetUser = null;
    
    for (const user of users) {
      if (user.otp && user.otp.startsWith('reset_')) {
        const [, storedHashedToken, expiryTime] = user.otp.split('_');
        
        // Check if token matches and hasn't expired
        if (storedHashedToken === hashedResetToken && Date.now() < parseInt(expiryTime)) {
          targetUser = user;
          break;
        }
      }
    }

    if (!targetUser) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    // Check if user is verified
    if (!targetUser.isVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear the reset token
    targetUser.password = hashedNewPassword;
    targetUser.otp = undefined; // Clear the reset token
    await targetUser.save();

    res.status(200).json({
      message: "Password reset successfully. You can now login with your new password.",
      success: true
    });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
// update profile
async function updateProfile (req, res) {
  try {
    const userId = req.user.id; // comes from authMiddleware
    const profileData = req.body; // frontend sends fields to update

    // Merge only provided fields into profile (no overwrite of whole object)
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: Object.fromEntries(
          Object.entries(profileData).map(([key, value]) => [
            `profile.${key}`,
            value,
          ])
        ),
      },
      { new: true, runValidators: true }
    ).select("-password -otp");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// get user profile data
async function getProfile (req, res) {
  try {
    // authMiddleware already attached userId from token
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export { registerUser , verifyOtp , loginUser , forgotPassword , verifyResetOtp , resetPassword , updateProfile , getProfile};
