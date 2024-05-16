import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("Request body:", request.body);
  const { userId, postContent, image } = await request.json();
  const isoPublishDate = new Date().toISOString();
  try {
    const newPost = await db.post.create({
      data: {
        userId: parseInt(userId),
        postContent,
        image,
        datePosted: isoPublishDate,
        isDeleted: false,
      },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
