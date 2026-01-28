import mongoose from "mongoose";

const knowledgeSchema = new mongoose.Schema({
  content: String,
  embedding: [Number],
});

export default mongoose.model("Knowledge", knowledgeSchema);
