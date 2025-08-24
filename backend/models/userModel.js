import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Required fields
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },

  // Optional profile details
  profile: {
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, default: "" },
    postalCode: { type: String, default: "" },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: "" },
    dob: { type: Date },
    language: { type: [String], default: [] }, // multiple languages
    occupation: { type: String, default: "" },
    company: { type: String, default: "" },
    website: { type: String, default: "" },
    about: { type: String, default: "" },
  }
}, { timestamps: true });

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;
