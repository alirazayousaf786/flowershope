// app/api/stage/route.js
export const runtime = "nodejs";

import connectDB from "@/lib/connectDB";
import Stage from "@/models/stage";
import { writeFile } from "fs/promises";
import Promotion from "@/models/promotion.js";
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

// POST - Create new stage
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const stageTitle = formData.get("stageTitle");
    const stagePrice = formData.get("stagePrice");
    const promotionPercentage = formData.get("promotionPercentage");
    const imageStage = formData.get("imageStage");

    if (!imageStage) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    if (!stageTitle || !stagePrice) {
      return NextResponse.json(
        { message: "Title and price are required" },
        { status: 400 }
      );
    }

    const imageUrl = await saveImage(imageStage);

    const newStage = await Stage.create({
      stageTitle: stageTitle.toString().trim(),
      stagePrice: Number(stagePrice),
      promotionPercentage: promotionPercentage
        ? Number(promotionPercentage)
        : 0,
      imageStageURL: imageUrl,
    });

    return NextResponse.json(
      { success: true, stage: newStage },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to create stage" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const stage = await Stage.find().sort({ createdAt: -1 });

    // Fetch promotion for stage category
   const promo = await Promotion.findOne({ category: "stage" });
const percentage = promo ? promo.percentage : 0;

const stageWithPromotion = stage.map((item) => {
  const obj = item.toObject();
  if (!obj.promotionPercentage || obj.promotionPercentage === 0) {
    obj.promotionPercentage = percentage;
  }
  return obj;
});

    return NextResponse.json({ success: true, stage: stageWithPromotion });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to fetch stage items" },
      { status: 500 }
    );
  }
}


// PUT - Update stage
export async function PUT(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const id = formData.get("id");
    const stageTitle = formData.get("stageTitle");
    const stagePrice = formData.get("stagePrice");
    const promotionPercentage = formData.get("promotionPercentage");
    const imageStage = formData.get("imageStage");

    if (!id) {
      return NextResponse.json(
        { message: "Stage ID is required" },
        { status: 400 }
      );
    }

    const updateData = {};

    if (stageTitle)
      updateData.stageTitle = stageTitle.toString().trim();

    if (stagePrice)
      updateData.stagePrice = Number(stagePrice);

    if (promotionPercentage !== null && promotionPercentage !== "")
      updateData.promotionPercentage = Number(promotionPercentage);

    if (imageStage) {
      const imageUrl = await saveImage(imageStage);
      updateData.imageStageURL = imageUrl;
    }

    const updatedStage = await Stage.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedStage) {
      return NextResponse.json(
        { message: "Stage not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, stage: updatedStage });
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to update stage" },
      { status: 500 }
    );
  }
}

// DELETE - Delete stage
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Stage ID is required" },
        { status: 400 }
      );
    }

    const deleted = await Stage.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Stage not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Stage deleted successfully",
    });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to delete stage" },
      { status: 500 }
    );
  }
}
