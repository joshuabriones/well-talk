import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const inquiries = await db.inquiry.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        inquiryId: "desc",
      },
      include: {
        user: true, // Include the associated user details
      },
    });

    return NextResponse.json({
      message: "Inquiries fetched",
      inquiries,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
