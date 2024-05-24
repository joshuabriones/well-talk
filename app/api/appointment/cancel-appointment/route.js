import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request) {
	const { searchParams } = new URL(request.url);
	const appointmentId = searchParams.get("appointmentId");

	try {
		const cancelAppointment = await db.appointment.update({
			where: {
				appointmentId: parseInt(appointmentId),
			},
			data: {
				status: "Cancelled",
			},
		});

		return NextResponse.json({
			message: "Appointment marked as approved",
			appointment: cancelAppointment,
			status: 200,
		});
	} catch (error) {
		return NextResponse.json({ message: error.message, status: 500 });
	}
}
