import mongoose from "mongoose";

const schema = new mongoose.Schema({
  icon:     String,
  title:    { type: String, required: true },
  subtitle: String,
  position: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.WhyUsItem || mongoose.model("WhyUsItem", schema);
