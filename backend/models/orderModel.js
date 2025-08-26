import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Food Processing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Food Processing",
    },
    payment: {
      method: {
        type: String,
        enum: ["Stripe", "Cash on Delivery"],
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
      },
      transactionId: {
        type: String, // only for Stripe
        default: null,
      },
    },
  },
  { timestamps: true }
);

const orderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;
