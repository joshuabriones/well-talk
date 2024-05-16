import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const posts = await db.post.findMany({
      where: { isDeleted: false },
      include: { user: true },
      orderBy: { datePosted: "desc" },
    });
    return NextResponse.json({ message: "Posts fetchped", posts, status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
