import foodModel from "../models/foodModel.js";

// Add food
async function addFood(req, res) {
  try {
    const { name, description, category, price, isPopular, isBestSeller } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    if (!name || !description || !category || !price) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (isNaN(price) || price <= 0) {
      return res.status(400).json({ success: false, message: "Price must be a valid number greater than 0" });
    }

    const newFood = new foodModel({
      name,
      description,
      category,
      price: Number(price),
      isPopular: isPopular === "true",
      isBestSeller: isBestSeller === "true",
      image: req.file.path,
    });

    await newFood.save();

    res.status(201).json({
      success: true,
      message: "Food added successfully",
      food: newFood,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

// Get all foods
async function listedFood(req, res) {
  try {
    const food = await foodModel.find();
    res.status(200).json({ success: true, message: "Food listed", data: food });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

export { addFood, listedFood };
