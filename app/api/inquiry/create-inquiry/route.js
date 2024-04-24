import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { sender, subject, message, date, time } = await request.json();

  try {
    const inquiry = await db.inquiry.create({
      data: {
        sender,
        subject,
        message,
        date,
        time,
      },
    });

    return NextResponse.json({
      message: "Inquiry created",
      inquiry,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
