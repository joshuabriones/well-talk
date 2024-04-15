import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request) {
    const { blogId, posts, title, shortDescription, blogURL, author, publishDate, image } = await request.json();
    const postId = request.nextUrl.pathname.split('/').pop(); 
    try {
        const updatedPost = await db.post.update({
            where: { postId: Number(postId) },
            data: {
                blogId,
                posts,
                title,
                shortDescription,
                blogURL,
                author,
                publishDate,
                image,
                datePosted: new Date(),
                isdeleted: false
            }
        });
        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
