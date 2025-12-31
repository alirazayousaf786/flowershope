// app/api/mesairi/route.js
export const runtime = "nodejs";

import connectDB from "@/lib/connectDB";
import Mesairi from "@/models/mesairi";
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

    // Generate unique filename
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

/* ================= POST – Create new mesairi ================= */
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const mesairiTitle = formData.get("mesairiTitle");
    const mesairiPrice = formData.get("mesairiPrice");
    const promotionPercentage = formData.get("promotionPercentage");
    const imageMesairi = formData.get("imageMesairi");

    if (!imageMesairi) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    if (!mesairiTitle || !mesairiPrice) {
      return NextResponse.json(
        { message: "Title and price are required" },
        { status: 400 }
      );
    }

    const imageUrl = await saveImage(imageMesairi);

    const newMesairi = await Mesairi.create({
      mesairiTitle: mesairiTitle.toString().trim(),
      mesairiPrice: Number(mesairiPrice),
      promotionPercentage: promotionPercentage
        ? Number(promotionPercentage)
        : 0,
      imageMesairiURL: imageUrl,
    });

    return NextResponse.json(
      { success: true, mesairi: newMesairi },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to create mesairi" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const mesairi = await Mesairi.find().sort({ createdAt: -1 });

    // 🔥 Fetch promotion for mesairi category
    const promo = await Promotion.findOne({ category: "mesairi" });
    const percentage = promo ? promo.percentage : 0;

    // Map mesairi and apply promotionPercentage only if not set individually
    const mesairiWithPromotion = mesairi.map((item) => {
      const obj = item.toObject();
      // Override promotionPercentage only if zero or null
      if (!obj.promotionPercentage || obj.promotionPercentage === 0) {
        obj.promotionPercentage = percentage;
      }
      return obj;
    });

    return NextResponse.json({ success: true, mesairi: mesairiWithPromotion });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to fetch mesairi" },
      { status: 500 }
    );
  }
}


/* ================= PUT – Update mesairi ================= */
export async function PUT(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const id = formData.get("id");
    const mesairiTitle = formData.get("mesairiTitle");
    const mesairiPrice = formData.get("mesairiPrice");
    const promotionPercentage = formData.get("promotionPercentage");
    const imageMesairi = formData.get("imageMesairi");

    if (!id) {
      return NextResponse.json(
        { message: "Mesairi ID is required" },
        { status: 400 }
      );
    }

    const updateData = {};

    if (mesairiTitle)
      updateData.mesairiTitle = mesairiTitle.toString().trim();

    if (mesairiPrice)
      updateData.mesairiPrice = Number(mesairiPrice);

    if (promotionPercentage !== null && promotionPercentage !== "")
      updateData.promotionPercentage = Number(promotionPercentage);

    if (imageMesairi) {
      const imageUrl = await saveImage(imageMesairi);
      updateData.imageMesairiURL = imageUrl;
    }

    const updatedMesairi = await Mesairi.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMesairi) {
      return NextResponse.json(
        { message: "Mesairi not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      mesairi: updatedMesairi,
    });
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to update mesairi" },
      { status: 500 }
    );
  }
}

/* ================= DELETE – Delete mesairi ================= */
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Mesairi ID is required" },
        { status: 400 }
      );
    }

    const deleted = await Mesairi.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Mesairi not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Mesairi deleted successfully",
    });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to delete mesairi" },
      { status: 500 }
    );
  }
}
