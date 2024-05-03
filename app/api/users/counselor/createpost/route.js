import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    userId,
    posts,
    title,
    shortDescription,
    blogURL,
    author,
    publishDate,
    image,
  } = await request.json();
  const isoPublishDate = new Date(publishDate).toISOString();
  try {
    const newPost = await db.post.create({
      data: {
        userId: parseInt(userId),
        posts,
        title,
        shortDescription,
        blogURL,
        author,
        publishDate: isoPublishDate,
        image,
        datePosted: new Date(),
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
