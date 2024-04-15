// Assuming your API endpoint is /api/posts/{postId}

// Import necessary modules
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Define the GET handler function
async function getHandler(request) {
    try {
        // Check if request.query is defined and postId is present
        if (!request.query || !request.query.postId) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        // Extract postId from the request query
        const { postId } = request.query;

        // Fetch the post from the database using postId
        const post = await db.post.findUnique({
            where: { postId: parseInt(postId), isdeleted: false }
        });

        // Check if the post exists
        if (!post) {
            // Return a 404 response if the post is not found
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        // Return the post as JSON with a 200 status code
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        // Handle errors
        console.error("Error fetching post:", error);
        // Return a 500 response for internal server errors
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// Export the handler function for the GET method
export const GET = getHandler;
