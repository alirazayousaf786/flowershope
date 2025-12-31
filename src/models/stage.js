// src/models/stage.js

import mongoose from "mongoose";

const stageSchema = new mongoose.Schema(
  {
    imageStageURL: {
      type: String,
      required: [true, "Image is required"],
    },
    stageTitle: {
      type: String,
      required: [true, "Stage title is required"],
      trim: true,
    },
    stagePrice: {
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

// Virtual field: Discounted price (DB mein save nahi hoga)
stageSchema.virtual("discountedPrice").get(function () {
  if (this.promotionPercentage > 0) {
    return (
      this.stagePrice -
      (this.stagePrice * this.promotionPercentage) / 100
    );
  }
  return this.stagePrice;
});

// Ensure virtual fields JSON/Object mein show hon
stageSchema.set("toJSON", { virtuals: true });
stageSchema.set("toObject", { virtuals: true });

export default mongoose.models.Stage ||
  mongoose.model("Stage", stageSchema);
