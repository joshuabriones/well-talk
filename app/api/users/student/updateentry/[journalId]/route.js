import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request) {
    const { userId, journalId, title, entry } = await request.json();
    const id = request.nextUrl.pathname.split('/').pop();
    try {
        const updatedEntry = await db.journal.update({
            where: { journalId: Number(id) },
            data: {
                userId,
                journalId,
                title,
                entry,
                dateOfEntry: new Date(),
                isDeleted: false
            }
        });
        return NextResponse.json(updatedEntry, { status: 200 });
    } catch (error) {
        console.error("Error updating journal entry:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
