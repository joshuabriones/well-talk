import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");

  try {
    const student = await db.student.findUnique({
      where: {
        userId: parseInt(studentId),
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json({
      message: "Student fetched",
      student,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
