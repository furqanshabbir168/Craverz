import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  topic: { type: String, required: true }, // e.g. Orders, Payments
  questions: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true }
    }
  ]
});

const FAQModel = mongoose.model("FAQ", faqSchema);

export default FAQModel;
