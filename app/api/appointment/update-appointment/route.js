import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { appointmentId, date, timeStart, timeEnd, appointmentType, purpose } =
    await request.json();

  const formattedDate = new Date(date);

  try {
    const appointment = await db.appointment.update({
      where: {
        appointmentId: parseInt(appointmentId),
      },
      data: {
        date: formattedDate,
        timeStart,
        timeEnd,
        appointmentType,
        purpose,
      },
    });

    return NextResponse.json({
      message: "Appointment updated",
      appointment,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
