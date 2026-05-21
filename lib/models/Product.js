import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title_he:       { type: String, required: true },
  title_en:       String,
  slug:           { type: String, required: true, unique: true },
  description_he: String,
  description_en: String,
  price:          { type: Number, required: true },
  old_price:      Number,
  badge:          String,
  in_stock:       { type: Boolean, default: true },
  featured:       { type: Boolean, default: false },
  images:         [String],
  category_ids:   [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  specs:          [{ icon_url: String, value: String, label: String }],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", schema);
