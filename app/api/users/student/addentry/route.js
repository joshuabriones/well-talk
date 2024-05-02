import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { userId, title, entry } = await request.json();
    try {
        // Get the current date and time in the Philippines
        const dateOfEntry = new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" });

        const newEntry = await db.journal.create({
            data: {
                userId,
                title,
                entry,
                dateOfEntry: new Date(dateOfEntry),
                isDeleted: false
            }
        });
        return NextResponse.json(newEntry, { status: 201 });
    } catch (error) {
        console.error("Error creating journal entry:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
