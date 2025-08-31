import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // User ID only required for Delivery
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.orderType === "Delivery";
      },
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

    // Order type
    orderType: {
      type: String,
      enum: ["Delivery", "Dine-in", "Takeaway"],
      default: "Delivery",
      required: true,
    },

    // Address only for Delivery
    address: {
      type: Object,
      required: function () {
        return this.orderType === "Delivery";
      },
    },

    // Status logic
    status: {
      type: String,
      enum: [
        "Food Processing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Completed" // for Dine-in & Takeaway
      ],
      default: function () {
        return this.orderType === "Delivery" ? "Food Processing" : "Completed";
      },
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
        type: String,
        default: null,
      },
      sessionId: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;
