import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 },
}, { timestamps: true });

const adminModel = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default adminModel;