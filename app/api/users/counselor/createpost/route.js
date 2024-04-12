import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { blogId, posts, title, shortDescription, blogURL, author, publishDate, image } = await request.json();
  try {
    const newPost = await db.post.create({
      data: {
        blogId,
        posts,
        title,
        shortDescription,
        blogURL,
        author,
        publishDate,
        image,
        datePosted: new Date()
      }
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function getHandler(req, res) {
  try {
    const posts = await db.post.findMany();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
