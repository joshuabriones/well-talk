import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { appointmentId, counselorId } = await request.json();

  try {
    const markAppointmentAsApproved = await db.appointment.update({
      where: {
        appointmentId: parseInt(appointmentId),
      },
      data: {
        counselorId: parseInt(counselorId),
        status: "Approved",
      },
    });

    return NextResponse.json({
      message: "Appointment marked as approved",
      appointment: markAppointmentAsApproved,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
