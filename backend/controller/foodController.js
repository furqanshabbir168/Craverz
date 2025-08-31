import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";

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
      image: req.file.path, // ✅ storing only URL (string)
    });

    await newFood.save();

    res.status(201).json({
      success: true,
      message: "Food added successfully",
      food: newFood,
    });
  } catch (error) {
    console.error("Add Food Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

// Get all foods
async function listedFood(req, res) {
  try {
    const food = await foodModel.find();
    res.status(200).json({ success: true, message: "Food listed successfully", data: food });
  } catch (error) {
    console.error("List Food Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}

// Delete food
async function deleteFood(req, res) {
  try {
    const { id } = req.body;

    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // food.image is the URL like:
    // https://res.cloudinary.com/<cloud_name>/image/upload/v1234567890/Cravez/foods/abcxyz.png
    const imageUrl = food.image;
    const fileName = imageUrl.split("/").pop(); // abcxyz.png
    const publicId = `Cravez/foods/${fileName.split(".")[0]}`; // Cravez/foods/abcxyz

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete from MongoDB
    await foodModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Food deleted successfully" });
  } catch (error) {
    console.error("Delete Food Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}
// Get total dishes
async function getTotalDishes(req, res) {
  try {
    const total = await foodModel.countDocuments();
    res.status(200).json({
      success: true,
      message: "Total dishes fetched successfully",
      totalDishes: total,
    });
  } catch (error) {
    console.error("Get Total Dishes Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}


export { addFood, listedFood, deleteFood , getTotalDishes };
