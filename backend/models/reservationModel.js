import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true, // e.g. "07:30 PM"
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: [1, "At least 1 guest required"],
    },
    message: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const reservationModel = mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);

export default reservationModel;
