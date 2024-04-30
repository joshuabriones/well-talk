import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { inquiryId, counselorId, counselorReply, replyDate } =
    await request.json();

  try {
    const replyInquiry = await db.inquiry.update({
      where: {
        inquiryId: parseInt(inquiryId),
      },
      data: {
        counselorId,
        counselorReply,
        replyDate,
        status: "replied",
      },
    });

    return NextResponse.json({
      message: "Inquiry updated with counselor's reply",
      inquiry: replyInquiry,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
