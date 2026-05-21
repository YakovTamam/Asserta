import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name_he:   { type: String, required: true },
  name_en:   String,
  slug:      { type: String, required: true, unique: true },
  image_url: String,
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model("Category", schema);
