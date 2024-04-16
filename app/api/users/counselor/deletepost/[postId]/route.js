import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    const postId = request.nextUrl.pathname.split('/').pop();
    try {
        const post = await db.post.update({
            where: { postId: Number(postId) },
            data: { isdeleted: true }
        });
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
