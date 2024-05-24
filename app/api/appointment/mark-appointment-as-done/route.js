import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { appointmentId, counselorId, notes, additionalNotes } =
    await request.json();

  try {
    const markAppointmentAsDone = await db.appointment.update({
      where: {
        appointmentId: parseInt(appointmentId),
      },
      data: {
        counselorId: parseInt(counselorId),
        notes,
        additionalNotes,
        status: "Done",
      },
    });

    return NextResponse.json({
      message: "Appointment marked as done",
      appointment: markAppointmentAsDone,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
