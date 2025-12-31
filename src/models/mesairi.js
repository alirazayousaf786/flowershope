// src/models/mesairi.js

import mongoose from "mongoose";

const mesairiSchema = new mongoose.Schema(
  {
    imageMesairiURL: {
      type: String,
      required: [true, "Image is required"],
    },
    mesairiTitle: {
      type: String,
      required: [true, "Mesairi title is required"],
      trim: true,
    },
    mesairiPrice: {
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
mesairiSchema.virtual("discountedPrice").get(function () {
  if (this.promotionPercentage > 0) {
    return (
      this.mesairiPrice -
      (this.mesairiPrice * this.promotionPercentage) / 100
    );
  }
  return this.mesairiPrice;
});

// Ensure virtual fields are serialized
mesairiSchema.set("toJSON", { virtuals: true });
mesairiSchema.set("toObject", { virtuals: true });

export default mongoose.models.Mesairi ||
  mongoose.model("Mesairi", mesairiSchema);
