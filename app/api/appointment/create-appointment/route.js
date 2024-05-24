import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { studentId, date, timeStart, timeEnd, appointmentType, purpose } =
    await request.json();

  const formattedDate = new Date(date);

  try {
    const appointment = await db.appointment.create({
      data: {
        studentId: parseInt(studentId),
        date: formattedDate,
        timeStart,
        timeEnd,
        appointmentType,
        purpose,
        status: "Pending",
      },
    });

    return NextResponse.json({
      message: "Appointment created",
      appointment,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
