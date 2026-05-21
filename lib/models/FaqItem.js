import mongoose from "mongoose";

const schema = new mongoose.Schema({
  question: { type: String, required: true },
  answer:   { type: String, required: true },
  position: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.FaqItem || mongoose.model("FaqItem", schema);
