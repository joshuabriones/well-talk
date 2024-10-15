import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";

const PostHighlight = ({ post, setShowModal, role }) => {
	const [isVisible, setIsVisible] = useState(true);

	const formatDate = () => {
		const dateObject = new Date(post?.postDate);
		const options = { year: "numeric", month: "long", day: "numeric" };
		return dateObject.toLocaleDateString("en-US", options);
	};

	const formatTime = () => {
		const [hours, minutes] = post.postTime.split(":");
		const ampm = hours >= 12 ? "PM" : "AM";
		const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
		return `${formattedHours}:${minutes} ${ampm}`;
	};

	const formattedDate = formatDate();
	const formattedTime = formatTime();

	const handlePin = async () => {
		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.PIN_POST}${post.postId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
					body: JSON.stringify({
						postContent: post.postContent,
						postImage: post.postImage,
					}),
				}
			);

			if (!response.ok) {
				toast.error("Failed to pin post");
				return;
			}
			setOpenPinModal(false);
			toast.success("Post pinned");
			fetchPosts();
		} catch (error) {
			console.error("Error pinning post:", error);
		}
	};

	const handleUnPin = async () => {
		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.UNPIN_POST}${post.postId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
					body: JSON.stringify({
						postContent: post.postContent,
						postImage: post.postImage,
					}),
				}
			);

			if (!response.ok) {
				toast.error("Failed to unpin post");
				return;
			}
			setOpenPinModal(false);
			toast.success("Post unpinned");
			fetchPosts();
		} catch (error) {
			console.error("Error pinning post:", error);
		}
	};

	const handleDeletePost = async (e) => {
		e.preventDefault();
		setOpenDeleteModal(true);
	};

	const confirmDeletePost = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.DELETE_POST}${post.postId}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				}
			);
			if (!response.ok) {
				throw new Error("Failed to delete post");
			}
			fetchPosts();
			setOpenDeleteModal(false);
			toast.success("Post deleted successfully");
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};

	const handleOverlayClick = () => {
		handleModalClose();
	};

	const handleModalClose = () => {
		setIsVisible(false);
		setShowModal(false);
	};

	return (
		<div>
			{isVisible && (
				<div
					className="w-full h-full rounded-lg bg-gray-50 fixed inset-0 flex items-center justify-center bg-white bg-opacity-25 z-50 backdrop-blur lg:px-28"
					onClick={handleOverlayClick}
				>
					<div className="bg-white flex border-2 rounded-lg shadow-md mb-6 ml-0 sm:mr-0 sm:mx-3 pl-2 pr-1 flex-col sm:pr-0 sm:px-5 py-2 hover:bg-gray-100 transition duration-200 ease-in-out hover:shadow-lg">
						{/* Author and Post Meta Information */}
						<div className="flex items-center mt-3 pl-4">
							<div className="w-14 h-14 flex-none ml-1">
								<img
									src={post?.author?.image || "https://via.placeholder.com/150"}
									className="w-14 h-14 rounded-full border-2 border-maroon cursor-pointer hover:shadow-md transition-transform duration-150 hover:scale-105"
									alt={post?.author?.username || "Author Avatar"}
								/>
							</div>
							<div className="w-full pl-4">
								<h2 className="font-semibold text-sm md:text-md lg:text-md cursor-pointer flex flex-row text-gray-800 hover:underline">
									{`${post.author?.firstName} ${post.author?.lastName}`}
									<span className="hidden md:block lg:block text-slate-500 font-normal pl-2">
										• {post.author?.institutionalEmail}
									</span>
								</h2>
								<div className="flex justify-between items-center mt-1">
									<p className="text-slate-500 font-light text-xs md:text-md">
										{formattedDate} {formattedTime}
									</p>
								</div>
							</div>
						</div>
						{/* Post Content */}
						<div className="w-full px-3 py-2">
							<p
								className="pl-2 md:pl-20 lg:pl-20 mb-4 mr-2 text-gray-700 w-full md:w-full lg:w-11/12 break-words leading-relaxed text-base sm:text-base md:text-md lg:text-lg"
								style={{ whiteSpace: "pre-wrap" }}
							>
								{post?.postContent}
							</p>
							{post?.postImage && (
								<div className="max-w-full max-h-80 rounded-md flex justify-center md:justify-center cursor-pointer">
									<img
										src={post?.postImage}
										className="max-w-full max-h-80 rounded-md shadow-md transition-transform duration-200 ease-in-out hover:scale-105"
										alt="Post Image"
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PostHighlight;
