import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {     
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // usually store image URL or path
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Pizzas",
        "Burgers & Sandwiches",
        "Wings & Nuggets",
        "Pasta",
        "Fried Rice & Chinese",
        "Noodles & Chow Mein",
        "Wraps & Rolls",
        "Sides & Snacks",
        "Drinks & Shakes",
        "Desserts",
      ],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // auto add createdAt & updatedAt
  }
);

const foodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default foodModel;
