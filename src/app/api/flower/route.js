// app/api/flower/route.js
export const runtime = "nodejs";

import connectDB from "@/lib/connectDB";
import Flower from "@/models/flower";
import Promotion from "@/models/promotion.js";

import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

/* ================= Helper ================= */
async function saveImage(file) {
  if (!file) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}${path.extname(file.name)}`;

  const filepath = path.join(process.cwd(), "public", "uploads", filename);
  await writeFile(filepath, buffer);

  return `/uploads/${filename}`;
}

/* ================= POST ================= */
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

    return NextResponse.json(
      { success: true, flower: newFlower },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

/* ================= GET (🔥 UPDATED) ================= */
export async function GET() {
  try {
    await connectDB();

    const flowers = await Flower.find().sort({ createdAt: -1 });

    // 🔥 promotion fetch for flower category
    const promo = await Promotion.findOne({ category: "flower" });
    const percentage = promo ? promo.percentage : 0;

    // 🔥 attach promotionPercentage to each flower
    const flowersWithPromotion = flowers.map((flower) => ({
      ...flower.toObject(),
      promotionPercentage: percentage,
    }));

    return NextResponse.json({
      success: true,
      flowers: flowersWithPromotion,
    });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || "Failed to fetch flowers" },
      { status: 500 }
    );
  }
}

/* ================= PUT ================= */
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

    return NextResponse.json({ success: true, flower: updatedFlower });
  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

/* ================= DELETE ================= */
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Flower.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Flower deleted successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}
