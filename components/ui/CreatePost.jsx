import { useSession } from "next-auth/react";
import { useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import PostCard from "./PostsCard";
import FullButton from "./buttons/FullButton";

const CreatePostSection = () => {
	const [postData, setPostData] = useState({ content: "", postImageUrl: "" });
    const [posts, setPosts] = useState([]);
	const { data: session, status } = useSession();
	const postHandler = async (e) => {
		e.preventDefault();
	};

	return (
		<div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
			<img
				src={session?.user.image}
				alt="User Profile"
				className="w-10 h-10 rounded-full mr-3"
			/>
			<textarea
				value={postData.content}
				placeholder="What's happening?"
				className="resize-none mt-3 pb-3 w-full h-28 bg-white focus:outline-none rounded-xl p-2 shadow-sm"
				onChange={(e) =>
					setPostData({ ...postData, content: e.target.value })
				}></textarea>
			<div className="flex justify-between items-center mt-4">
				<label className="flex items-center font-Jaldi">
					<input
						className="hidden"
						type="file"
						onChange={(e) =>
							setPostData({
								...postData,
								postImageUrl: e.target.files[0],
							})
						}
						accept="image/*"
					/>
					<BsFillImageFill className="text-xl cursor-pointer mr-2" />
					Add Image
				</label>
				<div className="flex justify-end w-48">
					<FullButton
						disabled={
							!postData.content.trim().length &&
							!postData.postImageUrl
						}
						onClick={postHandler}>
						Post
					</FullButton>
				</div>
			</div>

			{/* Conditional rendering based on posts array */}
			{posts.length === 0 ? (
				<p className="text-center mt-4 text-gray-500">
					No posts yet. Come back later.
				</p>
			) : (
				<div>
					{posts.map((post) => (
						<PostCard
							key={post.id}
							post={post}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default CreatePostSection;
