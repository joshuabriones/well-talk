import { db } from "@/lib/db";

export default async function handler(req, res) {
    const {
        query: { postId },
    } = req;

    switch (req.method) {
        case 'GET':
            try {
                const post = await db.post.findUnique({
                    where: { postId: Number(postId), isdeleted: false }
                });
                if (!post) {
                    return res.status(404).json({ error: "Post not found" });
                }
                return res.status(200).json(post);
            } catch (error) {
                console.error("Error fetching post:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
