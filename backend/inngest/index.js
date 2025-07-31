import { Inngest } from "inngest";
import userModel from "../models/userModel.js"; // adjust path if needed

// Create Inngest client
export const inngest = new Inngest({ id: "cravez" });

// Define the delete function directly here
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

// Export the function so Express serves it
export const functions = [deleteUnverifiedUser];
