import axios from "axios";
import { useEffect, useState } from "react";
import ViewPost from "./modals/ViewPost";
import "./../../css/blogimg.css";

const Blogs = () => {
	const [posts, setPosts] = useState([]);
	const [showPost, setShowPost] = useState(false);
	const [selectedPostId, setSelectedPostId] = useState(null); // Add selectedPostId state

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		try {
			const response = await axios.get(
				"http://localhost:3000/api/users/viewallposts"
			);
			setPosts(response.data);
		} catch (error) {
			console.error("Error fetching posts:", error);
		}
	};

	const handleReadMoreClick = (postId) => {
		console.log("Clicked postId:", postId);
		setSelectedPostId(postId); // Set selectedPostId when clicking Read More
		setShowPost(true);
	};

	const handleClosePost = () => {
		setShowPost(false);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		}).format(date);
	};

	return (
		<section className="mx-8">
			<div className="container mx-auto mt-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{posts.map((post) => (
						<div
							key={post.id}
							className="blog-post py-3">
							<div
								className="image-zoom"
								style={{ maxWidth: "100%", height: "auto" }}>
								<a
									href="blog-single.html"
									className="blog-img">
									<img
										src={post.image}
										alt=""
										className="img-fluid"
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover",
										}}
									/>
								</a>
							</div>
							<div className="pt-8">
								<span className="blog-date uppercase font-Jaldi">
									by <b>{post.author}</b> on{" "}
									{formatDate(post.datePosted)}
								</span>
							</div>
							<div>
								<h3 className="py-5">
									<a
										href="blog-single.html"
										className="font-heading font-thin text-2xl hover:text-gray-500 font-Merriweather">
										{post.title}
									</a>
								</h3>
								<p className="pb-10 font-Jaldi">
									{post.shortDescription}
								</p>
								<button
									onClick={() => handleReadMoreClick(post)} // Pass postId to handleReadMoreClick
									className="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out">
									Read More
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			{showPost && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div>
						<ViewPost
							postId={selectedPostId}
							onClose={handleClosePost}
						/>{" "}
						{/* Pass postId to ViewPost */}
					</div>
				</div>
			)}
		</section>
	);
};

export default Blogs;
