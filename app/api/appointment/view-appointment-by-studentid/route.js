import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");

  try {
    const studentAppointments = await db.appointment.findMany({
      where: {
        studentId: parseInt(studentId),
      },
      include: {
        counselor: true,
      },
    });

    return NextResponse.json({
      message: "Appointments fetched",
      studentAppointments,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
