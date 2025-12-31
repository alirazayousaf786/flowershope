// src/models/cake.js

import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema(
  {
    imageCakeURL: {
      type: String,
      required: [true, "Image is required"],
    },
    cakeTitle: {
      type: String,
      required: [true, "Cake title is required"],
      trim: true,
    },
    cakePrice: {
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

// Virtual field: Discounted price calculate karega (DB mein save nahi hoga)
cakeSchema.virtual("discountedPrice").get(function () {
  if (this.promotionPercentage > 0) {
    return this.cakePrice - (this.cakePrice * this.promotionPercentage) / 100;
  }
  return this.cakePrice;
});

// Ensure virtual fields JSON/Object mein show hon
cakeSchema.set("toJSON", { virtuals: true });
cakeSchema.set("toObject", { virtuals: true });

export default mongoose.models.Cake || mongoose.model("Cake", cakeSchema);
