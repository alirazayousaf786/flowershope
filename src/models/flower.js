// src/models/flower.js

import mongoose from "mongoose";

const flowerSchema = new mongoose.Schema(
  {
    imageFlowerURL: {
      type: String,
      required: [true, "Image is required"],
    },
    flowerTitle: {
      type: String,
      required: [true, "Flower title is required"],
      trim: true,
    },
    flowerPrice: {
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

// Virtual field: Discounted price calculate करके देगा (DB में save नहीं होगा)
flowerSchema.virtual("discountedPrice").get(function () {
  if (this.promotionPercentage > 0) {
    return this.flowerPrice - (this.flowerPrice * this.promotionPercentage) / 100;
  }
  return this.flowerPrice;
});

// Ensure virtual fields are serialized when converting to JSON
flowerSchema.set("toJSON", { virtuals: true });
flowerSchema.set("toObject", { virtuals: true });

export default mongoose.models.Flower || mongoose.model("Flower", flowerSchema);