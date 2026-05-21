import mongoose from "mongoose";

const schema = new mongoose.Schema({
  key:   { type: String, required: true, unique: true },
  value: String,
}, { timestamps: true });

export default mongoose.models.Setting || mongoose.model("Setting", schema);
