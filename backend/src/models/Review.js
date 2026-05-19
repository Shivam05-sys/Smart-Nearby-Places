import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    place: { type: mongoose.Schema.Types.ObjectId, ref: "Place", required: true },
    userName: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
