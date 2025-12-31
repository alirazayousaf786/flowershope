// app/api/cake/route.js
export const runtime = "nodejs";

import connectDB from "@/lib/connectDB";
import Cake from "@/models/cake";
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

  const filepath = path.join(
    process.cwd(),
    "public",
    "uploads",
    filename
  );

  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

/* ================= POST (SAME) ================= */
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const cakeTitle = formData.get("cakeTitle");
    const cakePrice = formData.get("cakePrice");
    const imageCake = formData.get("imageCake");

    if (!imageCake || !cakeTitle || !cakePrice) {
      return NextResponse.json(
        { message: "Title, price and image are required" },
        { status: 400 }
      );
    }

    const imageUrl = await saveImage(imageCake);

    const newCake = await Cake.create({
      cakeTitle: cakeTitle.toString().trim(),
      cakePrice: Number(cakePrice),
      imageCakeURL: imageUrl,
    });

    return NextResponse.json({ success: true, cake: newCake }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

/* ================= GET (UPDATED – Promotion Attached) ================= */
export async function GET() {
  try {
    await connectDB();

    const cakes = await Cake.find().sort({ createdAt: -1 });

    // 🔥 fetch promotion for cake category
    const promo = await Promotion.findOne({ category: "cake" });
    const percentage = promo ? promo.percentage : 0;

    const cakesWithPromotion = cakes.map((item) => ({
      ...item.toObject(),
      promotionPercentage: percentage,
    }));

    return NextResponse.json({
      success: true,
      cakes: cakesWithPromotion,
    });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || "Failed to fetch cakes" },
      { status: 500 }
    );
  }
}

/* ================= PUT (SAME) ================= */
export async function PUT(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id");
    const cakeTitle = formData.get("cakeTitle");
    const cakePrice = formData.get("cakePrice");
    const imageCake = formData.get("imageCake");

    if (!id) return NextResponse.json({ message: "Cake ID is required" }, { status: 400 });

    const updateData = {};
    if (cakeTitle) updateData.cakeTitle = cakeTitle.toString().trim();
    if (cakePrice) updateData.cakePrice = Number(cakePrice);
    if (imageCake) updateData.imageCakeURL = await saveImage(imageCake);

    const updatedCake = await Cake.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json({ success: true, cake: updatedCake });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

/* ================= DELETE (SAME) ================= */
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Cake.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Cake deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
