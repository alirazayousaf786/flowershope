// src/app/api/promotion/route.js
import connectDB from "@/lib/connectDB";
import Promotion from "@/models/promotion.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { category, percentage } = await req.json();

    if (!category || percentage === "") {
      return NextResponse.json(
        { message: "Category and percentage required" },
        { status: 400 }
      );
    }

    // old promotion remove (1 category = 1 promotion)
    await Promotion.deleteMany({ category });

    const promo = await Promotion.create({
      category,
      percentage,
    });

    return NextResponse.json({ success: true, promo });
  } catch (err) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

/* GET promotions */
export async function GET() {
  await connectDB();
  const promotions = await Promotion.find();
  return NextResponse.json({ success: true, promotions });
}
