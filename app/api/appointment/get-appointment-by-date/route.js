import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  try {
    const studentAppointments = await db.appointment.findMany({
      where: {
        date: new Date(date),
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
