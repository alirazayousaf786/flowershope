// app/api/jewelry/route.js
export const runtime = "nodejs";

import connectDB from "@/lib/connectDB";
import Jewelry from "@/models/jewelry";
import Promotion from "@/models/promotion.js";
import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

// Helper function to save uploaded image
async function saveImage(file) {
  if (!file) return null;

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.name)}`;

    const filepath = path.join(
      process.cwd(),
      "public",
      "uploads",
      filename
    );

    await writeFile(filepath, buffer);
    return `/uploads/${filename}`;
  } catch (error) {
    console.error("Image save error:", error);
    throw new Error("Failed to save image");
  }
}

/* ================= POST – Create new jewelry ================= */
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const jewelryTitle = formData.get("jewelryTitle");
    const jewelryPrice = formData.get("jewelryPrice");
    const promotionPercentage = formData.get("promotionPercentage");
    const imageJewelry = formData.get("imageJewelry");

    if (!imageJewelry) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    if (!jewelryTitle || !jewelryPrice) {
      return NextResponse.json(
        { message: "Title and price are required" },
        { status: 400 }
      );
    }

    const imageUrl = await saveImage(imageJewelry);

    const newJewelry = await Jewelry.create({
      jewelryTitle: jewelryTitle.toString().trim(),
      jewelryPrice: Number(jewelryPrice),
      promotionPercentage: promotionPercentage
        ? Number(promotionPercentage)
        : 0,
      imageJewelryURL: imageUrl,
    });

    return NextResponse.json(
      { success: true, jewelry: newJewelry },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to create jewelry" },
      { status: 500 }
    );
  }
}

/* ================= GET – Fetch all jewelry ================= */
/* ================= GET – Fetch all jewelry (with promotion) ================= */
export async function GET() {
  try {
    await connectDB();

    const jewelry = await Jewelry.find().sort({ createdAt: -1 });

    // 🔥 Fetch promotion for jewelry category
    const promo = await Promotion.findOne({ category: "jewelry" });
    const percentage = promo ? promo.percentage : 0;

    const jewelryWithPromotion = jewelry.map((item) => ({
      ...item.toObject(),
      promotionPercentage: percentage,
    }));

    return NextResponse.json({ success: true, jewelry: jewelryWithPromotion });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to fetch jewelry" },
      { status: 500 }
    );
  }
}


/* ================= PUT – Update jewelry ================= */
export async function PUT(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const id = formData.get("id");
    const jewelryTitle = formData.get("jewelryTitle");
    const jewelryPrice = formData.get("jewelryPrice");
    const promotionPercentage = formData.get("promotionPercentage");
    const imageJewelry = formData.get("imageJewelry");

    if (!id) {
      return NextResponse.json(
        { message: "Jewelry ID is required" },
        { status: 400 }
      );
    }

    const updateData = {};

    if (jewelryTitle)
      updateData.jewelryTitle = jewelryTitle.toString().trim();

    if (jewelryPrice)
      updateData.jewelryPrice = Number(jewelryPrice);

    if (promotionPercentage !== null && promotionPercentage !== "")
      updateData.promotionPercentage = Number(promotionPercentage);

    if (imageJewelry) {
      const imageUrl = await saveImage(imageJewelry);
      updateData.imageJewelryURL = imageUrl;
    }

    const updatedJewelry = await Jewelry.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedJewelry) {
      return NextResponse.json(
        { message: "Jewelry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      jewelry: updatedJewelry,
    });
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to update jewelry" },
      { status: 500 }
    );
  }
}

/* ================= DELETE – Delete jewelry ================= */
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Jewelry ID is required" },
        { status: 400 }
      );
    }

    const deleted = await Jewelry.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Jewelry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Jewelry deleted successfully",
    });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to delete jewelry" },
      { status: 500 }
    );
  }
}
