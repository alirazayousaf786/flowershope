// app/api/flower/route.js
export const runtime = "nodejs";

import connectDB from "@/lib/connectDB";
import Flower from "@/models/flower";
import Promotion from "@/models/promotion.js";

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// ================= Cloudinary Config =================
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// ================= Helper =================
async function saveImage(file) {
  if (!file) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "flowers" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
}

// ================= POST =================
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const flowerTitle = formData.get("flowerTitle");
    const flowerPrice = formData.get("flowerPrice");
    const imageFlower = formData.get("imageFlower");

    if (!imageFlower || !flowerTitle || !flowerPrice) {
      return NextResponse.json(
        { message: "Title, price and image are required" },
        { status: 400 }
      );
    }

    const imageUrl = await saveImage(imageFlower);

    const newFlower = await Flower.create({
      flowerTitle: flowerTitle.toString().trim(),
      flowerPrice: Number(flowerPrice),
      imageFlowerURL: imageUrl,
    });

    console.log("Inserted Flower:", newFlower);

    return NextResponse.json(
      { success: true, flower: newFlower },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST Flower Error:", err.message);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

// ================= GET =================
export async function GET() {
  try {
    await connectDB();

    const flowers = await Flower.find().sort({ createdAt: -1 });

    const promo = await Promotion.findOne({ category: "flower" });
    const percentage = promo ? promo.percentage : 0;

    const flowersWithPromotion = flowers.map((flower) => ({
      ...flower.toObject(),
      promotionPercentage: percentage,
    }));

    return NextResponse.json({
      success: true,
      flowers: flowersWithPromotion,
    });
  } catch (err) {
    console.error("GET Flowers Error:", err.message);
    return NextResponse.json(
      { message: err.message || "Failed to fetch flowers" },
      { status: 500 }
    );
  }
}

// ================= PUT =================
export async function PUT(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const id = formData.get("id");
    const flowerTitle = formData.get("flowerTitle");
    const flowerPrice = formData.get("flowerPrice");
    const imageFlower = formData.get("imageFlower");

    if (!id) {
      return NextResponse.json(
        { message: "Flower ID is required" },
        { status: 400 }
      );
    }

    const updateData = {};
    if (flowerTitle) updateData.flowerTitle = flowerTitle.toString().trim();
    if (flowerPrice) updateData.flowerPrice = Number(flowerPrice);

    if (imageFlower) {
      updateData.imageFlowerURL = await saveImage(imageFlower);
    }

    const updatedFlower = await Flower.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    console.log("Updated Flower:", updatedFlower);

    return NextResponse.json({ success: true, flower: updatedFlower });
  } catch (err) {
    console.error("PUT Flower Error:", err.message);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

// ================= DELETE =================
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ message: "Flower ID required" }, { status: 400 });

    const deleted = await Flower.findByIdAndDelete(id);
    console.log("Deleted Flower:", deleted);

    return NextResponse.json({
      success: true,
      message: "Flower deleted successfully",
    });
  } catch (err) {
    console.error("DELETE Flower Error:", err.message);
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}
