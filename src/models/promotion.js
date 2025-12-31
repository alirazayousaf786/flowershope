
import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      "mesairi",
      "car",
      "cake",
      "birthday",
      "flower",
      "stage",
      "jewelry",
    ],
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Promotion ||
  mongoose.model("Promotion", promotionSchema);
