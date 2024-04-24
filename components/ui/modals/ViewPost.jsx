import { XCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewPost = ({ postId, onClose }) => {
	const [post, setPost] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		console.log("postId:", postId);
		const fetchPost = async () => {
			try {
				const response = await axios.get(`/api/users/viewpost/1`);
				setPost(response.data);
			} catch (error) {
				console.error("Error fetching post:", error);
				setError("Error fetching post. Please try again later.");
			}
		};
		if (postId) {
			fetchPost();
		}
	}, [postId]);

	if (error) {
		return <div>{error}</div>;
	}

	if (!post) {
		return <div>Loading...</div>;
	}

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		}).format(date);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
			<div className="bg-white w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl rounded-lg overflow-hidden">
				<div className="relative">
					<button
						onClick={onClose}
						className="absolute top-0 right-0 mt-2 mr-2 px-2 py-1">
						<XCircleIcon className="w-8 h-8" />
					</button>
					<img
						className="w-full h-auto rounded-t-lg"
						src="https://via.placeholder.com/1210x636"
						alt="Blog Post Image"
					/>
				</div>
				<div className="px-6 py-8 md:px-8">
					<div className="mb-4">
						<span className="text-sm font-normal text-gray-600 uppercase tracking-wide">
							by <b>{post.author}</b> on{" "}
							{formatDate(post.datePosted)}
						</span>
					</div>
					<div className="text-2xl font-bold text-gray-800 leading-relaxed my-4 font-Merriweather leading-loose">
						{post.title}
					</div>
					<div className="text-lg font-light text-gray-800 font-Jaldi leading-relaxed mb-4">
						{post.shortDescription}
					</div>
					<div className="text-right">
						<div className="text-neutral-800 text-[17px] font-normal font-Merriweather">
							Read the full blog{" "}
							<span
								className="text-red-600 underline cursor-pointer"
								onClick={onClose}>
								here
							</span>
						</div>
					</div>
					<div className="text-right"></div>
				</div>
			</div>
		</div>
	);
};

export default ViewPost;
