// app/api/car/route.js
export const runtime = "nodejs";

import connectDB from "@/lib/connectDB";
import Car from "@/models/car";
import Promotion from "@/models/promotion.js";
import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

/* ================= Helper ================= */
async function saveImage(file) {
  if (!file) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${path.extname(file.name)}`;
  const filepath = path.join(process.cwd(), "public/uploads", filename);

  await writeFile(filepath, buffer);
  return `/uploads/${filename}`;
}

/* ================= POST (SAME) ================= */
export async function POST(req) {
  await connectDB();
  const formData = await req.formData();

  const carTitle = formData.get("carTitle");
  const carPrice = formData.get("carPrice");
  const imageCar = formData.get("imageCar");

  if (!carTitle || !carPrice || !imageCar)
    return NextResponse.json({ message: "Title, price and image are required" }, { status: 400 });

  const imageUrl = await saveImage(imageCar);

  const car = await Car.create({
    carTitle: carTitle.trim(),
    carPrice: Number(carPrice),
    imageCarURL: imageUrl,
  });

  return NextResponse.json({ success: true, car }, { status: 201 });
}

/* ================= GET (UPDATED – Promotion Attached) ================= */
export async function GET() {
  await connectDB();
  const cars = await Car.find().sort({ createdAt: -1 });

  // 🔥 Fetch promotion for car category
  const promo = await Promotion.findOne({ category: "car" });
  const percentage = promo ? promo.percentage : 0;

  const carsWithPromotion = cars.map((item) => ({
    ...item.toObject(),
    promotionPercentage: percentage,
  }));

  return NextResponse.json({ success: true, cars: carsWithPromotion });
}

/* ================= PUT (SAME) ================= */
export async function PUT(req) {
  await connectDB();
  const formData = await req.formData();
  const id = formData.get("id");
  if (!id) return NextResponse.json({ message: "ID required" }, { status: 400 });

  const updateData = {};
  if (formData.get("carTitle")) updateData.carTitle = formData.get("carTitle").trim();
  if (formData.get("carPrice")) updateData.carPrice = Number(formData.get("carPrice"));
  if (formData.get("promotionPercentage") !== "") updateData.promotionPercentage = Number(formData.get("promotionPercentage"));
  if (formData.get("imageCar")) updateData.imageCarURL = await saveImage(formData.get("imageCar"));

  const car = await Car.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  return NextResponse.json({ success: true, car });
}

/* ================= DELETE (SAME) ================= */
export async function DELETE(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await Car.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
