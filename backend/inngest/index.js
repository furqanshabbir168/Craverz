import { Inngest } from "inngest";
import userModel from "../models/userModel.js"; // adjust path if needed

// Create Inngest client
export const inngest = new Inngest({ id: "cravez" });

// Define the delete function for unverified users
const deleteUnverifiedUser = inngest.createFunction(
  {
    id: "delete-unverified-user",
    name: "Delete Unverified User",
  },
  { event: "user/unverified.registered" },
  async ({ event, step }) => {
    const { email } = event.data;

    // Wait for 2 minutes before checking user
    await step.sleep("wait-2-min", "2m");

    const user = await userModel.findOne({ email });

    // Only delete if not verified
    if (user && !user.isVerified) {
      await userModel.deleteOne({ email });
      return { deleted: true, email };
    }

    return { deleted: false, message: "User already verified or not found." };
  }
);

// Define the function to expire OTP for password reset
const expirePasswordResetOtp = inngest.createFunction(
  {
    id: "expire-password-reset-otp",
    name: "Expire Password Reset OTP",
  },
  { event: "user/password-reset.otp-sent" },
  async ({ event, step }) => {
    const { email } = event.data;

    // Wait for 10 minutes before expiring OTP
    await step.sleep("wait-10-min", "10m");

    const user = await userModel.findOne({ email });

    // Clear OTP if user exists and is verified
    if (user && user.isVerified) {
      user.otp = undefined;
      await user.save();
      return { expired: true, email };
    }

    return { expired: false, message: "User not found or not verified." };
  }
);

// Export both functions so Express serves them
export const functions = [deleteUnverifiedUser, expirePasswordResetOtp];