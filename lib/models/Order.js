import mongoose from "mongoose";

const schema = new mongoose.Schema({
  customer:         { full_name: String, email: String, phone: String },
  shipping_address: { address: String, city: String },
  items:            mongoose.Schema.Types.Mixed,
  total_amount:     Number,
  status:           { type: String, enum: ["pending","paid","shipped","delivered","cancelled"], default: "pending" },
  notes:            String,
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", schema);
