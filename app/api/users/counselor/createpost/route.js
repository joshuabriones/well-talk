import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
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
        posts,
        title,
        shortDescription,
        blogURL,
        author,
        publishDate: isoPublishDate,
        image,
        datePosted: new Date(),
        isdeleted: false,
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

export async function getHandler(req, res) {
  try {
    const posts = await db.post.findMany({
      where: { isdeleted: false },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
