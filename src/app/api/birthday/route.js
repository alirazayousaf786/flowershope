// app/api/birthday/route.js
export const runtime = "nodejs";

import connectDB from "@/lib/connectDB";
import Birthday from "@/models/birthday.js";
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
    const birthdayTitle = formData.get("birthdayTitle");
    const birthdayPrice = formData.get("birthdayPrice");
    const imageBirthday = formData.get("imageBirthday");

    if (!imageBirthday || !birthdayTitle || !birthdayPrice) {
      return NextResponse.json(
        { message: "Title, price and image are required" },
        { status: 400 }
      );
    }

    const imageUrl = await saveImage(imageBirthday);

    const newBirthday = await Birthday.create({
      birthdayTitle: birthdayTitle.toString().trim(),
      birthdayPrice: Number(birthdayPrice),
      imageBirthdayURL: imageUrl,
    });

    return NextResponse.json(
      { success: true, birthday: newBirthday },
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

    const birthdays = await Birthday.find().sort({ createdAt: -1 });

    // 🔥 fetch promotion for birthday category
    const promo = await Promotion.findOne({ category: "birthday" });
    const percentage = promo ? promo.percentage : 0;

    // 🔥 attach promotionPercentage
    const birthdaysWithPromotion = birthdays.map((item) => ({
      ...item.toObject(),
      promotionPercentage: percentage,
    }));

    return NextResponse.json({
      success: true,
      birthdays: birthdaysWithPromotion,
    });
  } catch (err) {
    return NextResponse.json(
      { message: err.message || "Failed to fetch birthdays" },
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
    const birthdayTitle = formData.get("birthdayTitle");
    const birthdayPrice = formData.get("birthdayPrice");
    const imageBirthday = formData.get("imageBirthday");

    if (!id) {
      return NextResponse.json(
        { message: "Birthday ID is required" },
        { status: 400 }
      );
    }

    const updateData = {};
    if (birthdayTitle)
      updateData.birthdayTitle = birthdayTitle.toString().trim();
    if (birthdayPrice)
      updateData.birthdayPrice = Number(birthdayPrice);

    if (imageBirthday) {
      updateData.imageBirthdayURL = await saveImage(imageBirthday);
    }

    const updatedBirthday = await Birthday.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      birthday: updatedBirthday,
    });
  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

/* ================= DELETE (SAME) ================= */
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Birthday.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Birthday deleted successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}
