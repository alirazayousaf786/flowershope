// src/models/birthday.js

import mongoose from "mongoose";

const birthdaySchema = new mongoose.Schema(
  {
    imageBirthdayURL: {
      type: String,
      required: [true, "Image is required"],
    },
    birthdayTitle: {
      type: String,
      required: [true, "Birthday title is required"],
      trim: true,
    },
    birthdayPrice: {
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
birthdaySchema.virtual("discountedPrice").get(function () {
  if (this.promotionPercentage > 0) {
    return (
      this.birthdayPrice -
      (this.birthdayPrice * this.promotionPercentage) / 100
    );
  }
  return this.birthdayPrice;
});

// Ensure virtual fields are serialized
birthdaySchema.set("toJSON", { virtuals: true });
birthdaySchema.set("toObject", { virtuals: true });

export default mongoose.models.Birthday ||
  mongoose.model("Birthday", birthdaySchema);
