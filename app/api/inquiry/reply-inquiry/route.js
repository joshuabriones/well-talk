import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function PUT(request) {
  const { inquiry, inquiryId, counselorId, counselorReply, replyDate } =
    await request.json();

  resend.emails.send({
    from: "WellTalk <onboarding@resend.dev>",
    to: "alferkesa@gmail.com",
    subject: inquiry.subject,
    text: counselorReply,
  });

  try {
    const replyInquiry = await db.inquiry.update({
      where: {
        inquiryId: parseInt(inquiryId),
      },
      data: {
        counselorId,
        counselorReply,
        replyDate,
        status: "Responded",
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
