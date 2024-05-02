import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    const postId = request.nextUrl.pathname.split('/').pop();
    try {
        const post = await db.post.findUnique({
            where: { postId: Number(postId) },
            include: { user: true },
        });
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
