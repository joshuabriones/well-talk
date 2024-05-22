import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const appointmentId = searchParams.get("appointmentId");

  try {
    const appointment = await db.appointment.findUnique({
      where: {
        appointmentId: parseInt(appointmentId),
      },
      include: {
        student: true,
        counselor: true,
      },
    });

    return NextResponse.json({
      message: "Appointment fetched",
      appointment,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
