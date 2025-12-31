// src/models/jewelry.js

import mongoose from "mongoose";

const jewelrySchema = new mongoose.Schema(
  {
    imageJewelryURL: {
      type: String,
      required: [true, "Image is required"],
    },
    jewelryTitle: {
      type: String,
      required: [true, "Jewelry title is required"],
      trim: true,
    },
    jewelryPrice: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    promotionPercentage: {
      type: Number,
      default: 0,
      min: [0, "Promotion cannot be negative"],
      max: [100, "Promotion cannot exceed 100%"],
    },
  },
  { timestamps: true }
);

// Virtual field: Discounted price (DB me save nahi hoga)
jewelrySchema.virtual("discountedPrice").get(function () {
  if (this.promotionPercentage > 0) {
    return (
      this.jewelryPrice -
      (this.jewelryPrice * this.promotionPercentage) / 100
    );
  }
  return this.jewelryPrice;
});

// Ensure virtual fields are serialized
jewelrySchema.set("toJSON", { virtuals: true });
jewelrySchema.set("toObject", { virtuals: true });

export default mongoose.models.Jewelry ||
  mongoose.model("Jewelry", jewelrySchema);
