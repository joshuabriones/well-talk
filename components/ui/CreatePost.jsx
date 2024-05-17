"use client";
import { imgDB } from "@/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import { v4 } from "uuid";
import PostCard from "./PostsCard";
import FullButton from "./buttons/FullButton";
 import { XCircleIcon } from "@heroicons/react/solid";

const CreatePostSection = () => {
	const [postContent, setPostContent] = useState("");
	const [image, setImage] = useState("");
	const [posts, setPosts] = useState([]);
	const [selectedFile, setSelectedFile] = useState(null);
	const { data: session } = useSession();

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		try {
			const response = await fetch("/api/users/viewallposts");
			if (!response.ok) {
				throw new Error("Failed to fetch posts");
			}
			const data = await response.json();
			setPosts(data.posts);
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	};

	const postHandler = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("/api/users/counselor/createpost", {
				method: "POST",
				body: JSON.stringify({
					userId: session.user.id,
					postContent: postContent,
					image: image,
				}),
			});
			if (!response.ok) {
				throw new Error("Failed to post");
			}
			const data = await response.json();
			console.log(data);
			setPostContent("");
			setSelectedFile(null);
			setImage(null);
			fetchPosts();
		} catch (error) {
			console.error("Error posting:", error);
		}
	};

	const handleFileSelection = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const imgsRef = ref(imgDB, `Postimages/${v4()}`);
			const snapshot = await uploadBytesResumable(imgsRef, file);
			const imgUrl = await getDownloadURL(snapshot.ref);
			setImage(imgUrl);
			setSelectedFile(file); // Set the file after the image URL is obtained
		}
	};

	const removeImage = () => {
		setImage(""); // Clear the image state
		setSelectedFile(null); // Clear the selected file state
	};

	return (
		<div className="max-w-5xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
			<div className="flex items-center">
				<img
					src={session?.user.image}
					alt="User Profile"
					className="w-10 h-10 rounded-full mr-3"
				/>
				<span className="font-semibold flex flex-col font-Jaldi cursor-pointer">
					{session?.user.name}
					<span className="text-slate-500 font-Jaldi">
						{session?.user.email}
					</span>
				</span>
			</div>
			<div className="w-full px-2">
				<textarea
					value={postContent}
					placeholder="What's happening?"
					className="resize-none mt-3 pb-3 w-full h-28 bg-white focus:outline-none rounded-xl p-2"
					onChange={(e) => setPostContent(e.target.value)}></textarea>
				<div className="max-w-xl max-h-100  rounded-md relative">
					{image && (
						<>
							<img
								src={image}
								alt="Uploaded Content"
								className="object-cover max-w-full max-h-32 rounded-md my-2 cursor-pointer"
							/>
							 <button
              onClick={removeImage}
              className="absolute top-0 left-[-2] bg-red-500 text-white rounded-full "
              style={{
                marginTop: "-5px",
                marginRight: "-5px",
              }}
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
						</>
					)}
				</div>
			</div>

			<div className="flex justify-between items-center mt-4 mb-4 px-4">
				<label className="flex items-center font-Jaldi">
					<input
						className="hidden"
						type="file"
						onChange={handleFileSelection}
						x
						accept="image/*"
					/>
					<BsFillImageFill className="text-2xl cursor-pointer mr-2 mt-1" />
				</label>
				<div className="disabled:cursor-not-allowedpt-3 flex justify-end w-40">
					<FullButton
						disabled={!postContent.trim()}
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
				posts.map((post) => (
					<PostCard
						key={post.postId}
						post={post}
					/>
				))
			)}
		</div>
	);
};

export default CreatePostSection;
