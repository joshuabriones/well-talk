import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const inquiryId = searchParams.get("inquiryId");

  try {
    const inquiry = await db.inquiry.findUnique({
      where: {
        inquiryId: parseInt(inquiryId),
      },
    });

    return NextResponse.json({
      message: "Inquiry fetched",
      inquiry,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
