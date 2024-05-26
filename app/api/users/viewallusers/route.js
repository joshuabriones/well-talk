import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await db.user.findMany({
      where: {
        isDeleted: false,
        role: {
          not: "admin",
        },
      },
    });

    return NextResponse.json({
      message: "Users fetched",
      users,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
