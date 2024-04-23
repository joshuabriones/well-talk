import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const entries = await db.journal.findMany({
            where: { isDeleted: false }
        });
        return NextResponse.json(entries, { status: 200 });
    } catch (error) {
        console.error("Error fetching journal entries:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function getAllEntriesHandler(request) {
    try {
        const entries = await db.journal.findMany();
        return NextResponse.json(entries, { status: 200 });
    } catch (error) {
        console.error("Error fetching all journal entries:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
