import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    const journalId = request.nextUrl.pathname.split('/').pop();
    try {
        const journalEntry = await db.journal.update({
            where: { journalId: Number(journalId) },
            data: { isDeleted: true }
        });
        if (!journalEntry) {
            return NextResponse.json({ error: "Journal entry not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Journal entry deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting journal entry:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
