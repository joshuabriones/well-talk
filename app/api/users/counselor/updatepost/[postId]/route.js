export async function PUT(req, res) {
    const postId = parseInt(req.query.postId); // Access postId from URL query

    // Check if postId is not a valid number
    if (isNaN(postId)) {
        return res.status(400).json({ error: "Invalid postId parameter" });
    }

    const { blogId, posts, title, shortDescription, blogURL, author, publishDate, image } = await req.json();

    try {
        const updatedPost = await db.post.update({
            where: { postIdid: postId }, // Update the where condition to use id instead of postId
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
        return res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
