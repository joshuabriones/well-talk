import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const appointments = await db.appointment.findMany({
      include: {
        student: true,
        counselor: true,
      },
    });

    return NextResponse.json({
      message: "Appointments fetched",
      appointments,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
