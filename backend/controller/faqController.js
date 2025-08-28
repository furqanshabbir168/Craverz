import FAQModel from "../models/faqModel.js";

async function faqController(req,res) {
    try {
    const faqs = await FAQModel.find();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQs" });
  }
}
export {faqController}