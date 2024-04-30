import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    const journalId = request.nextUrl.pathname.split('/').pop();
    try {
        const journalEntry = await db.journal.findUnique({
            where: { journalId: Number(journalId) },
        });
        if (!journalEntry) {
            return NextResponse.json({ error: "Journal entry not found" }, { status: 404 });
        }
        return NextResponse.json(journalEntry, { status: 200 });
    } catch (error) {
        console.error("Error fetching journal entry:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
