import mongoose from "mongoose";

const schema = new mongoose.Schema({
  position:   { type: Number, required: true, unique: true },
  video_url:  String,
  poster_url: String,
  overlays:   mongoose.Schema.Types.Mixed,
  buttons:    mongoose.Schema.Types.Mixed,
  is_active:  { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.VideoSection || mongoose.model("VideoSection", schema);
