// src/models/car.js
import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    imageCarURL: {
      type: String,
      required: [true, "Image is required"],
    },
    carTitle: {
      type: String,
      required: [true, "Car title is required"],
      trim: true,
    },
    carPrice: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    promotionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

// Virtual discounted price
carSchema.virtual("discountedPrice").get(function () {
  if (this.promotionPercentage > 0) {
    return this.carPrice - (this.carPrice * this.promotionPercentage) / 100;
  }
  return this.carPrice;
});

carSchema.set("toJSON", { virtuals: true });
carSchema.set("toObject", { virtuals: true });

export default mongoose.models.Car || mongoose.model("Car", carSchema);
