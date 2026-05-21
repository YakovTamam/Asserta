import mongoose from "mongoose";

const schema = new mongoose.Schema({
  url:  { type: String, required: true },
  type: { type: String, enum: ["image","video"], default: "image" },
  name: String,
  size: Number,
}, { timestamps: true });

export default mongoose.models.MediaFile || mongoose.model("MediaFile", schema);
