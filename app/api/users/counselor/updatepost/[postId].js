export async function PUT(req, res) {
    const postId = parseInt(req.query.postId); // Access postId from URL path
    const { blogId, posts, title, shortDescription, blogURL, author, publishDate, image } = await req.json();
    try {
        const updatedPost = await db.post.update({
            where: { postId },
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
