import adminModel from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";

// register admin
async function registerAdmin(req, res) {
  try {
     const { name, email, password, secretKey } = req.body;

    // check secret admin key
    if (secretKey !== process.env.SECRET_ADMIN_KEY) {
      return res.status(403).json({ message: "Unauthorized request" });
    }

    // check if admin already exists
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save admin
    const newAdmin = new adminModel({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
// login admin
async function loginAdmin (req, res) {
  try {
    const { email, password } = req.body;

    // check if admin exists
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Account not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate token
    const token = jwt.sign(
      { id: admin._id, role: "admin" }, // payload
      process.env.JWT_SECRET,           // secret key
      { expiresIn: "2d" }               // expiry
    );

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { registerAdmin , loginAdmin};
