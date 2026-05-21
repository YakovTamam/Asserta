import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true },
  full_name: String,
  phone:     String,
}, { timestamps: true });

export default mongoose.models.Customer || mongoose.model("Customer", schema);
