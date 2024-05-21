"use client";
import LoadingState from "@/components/Load";
import Card from "@/components/ui/Card";
import Footer from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import PostCard from "@/components/ui/PostsCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";

export default function Home() {
	const [selectedButton, setSelectedButton] = useState("featured");
	const [posts, setPosts] = useState([]);
	const [showFilterPostModal, setShowFilterModal] = useState(false);
	const [sortPostBy, setSortPostBy] = useState("Latest");
	const [loading, setLoading] = useState(true);
	const { data: session, status } = useSession();
	const router = useRouter();

	const fetchPosts = async () => {
		try {
			const response = await fetch("/api/users/viewallposts"); // Replace with your API endpoint
			if (!response.ok) {
				throw new Error("Failed to fetch posts");
			}
			const data = await response.json();
			setPosts(data.posts);
			setLoading(false); // Assuming the posts are in data.posts
		} catch (error) {
			console.error("Error fetching posts:", error);
			setLoading(false);
		}
	};

	// useEffect(() => {
	// 	if (status === "unauthenticated") {
	// 		router.push("/login");
	// 	}
	// }, [status]);

	useEffect(() => {
		fetchPosts();
	}, []);

	// if (status === "loading" || !session) {
	// 	return <Loading />;
	// }

	// Redirect authenticated users who are not students
	// if (session.user.role !== "student") {
	// 	router.push("/login");
	// 	return null; // Prevent rendering anything if redirecting
	// }

	console.log(session);

	const getSortedPosts = () => {
		if (sortPostBy === "Latest") {
			return [...posts].sort(
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			);
		} else if (sortPostBy === "Oldest") {
			return [...posts].sort(
				(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
			);
		}
		return posts;
	};

	const sortedPosts = getSortedPosts();

	return (
		<div>
			<main className="min-h-screen">
				<Navbar userType="teacher" />
				<div
					className="pattern-overlay pattern-left absolute -z-10"
					style={{ transform: "scaleY(-1)", top: "-50px" }}>
					<img
						src="/images/landing/lleft.png"
						alt="pattern"
					/>
				</div>
				<div
					className="pattern-overlay pattern-right absolute bottom-0 right-0 -z-10"
					style={{ transform: "scaleY(-1)", top: "-15px" }}>
					<img
						src="/images/landing/lright.png"
						alt="pattern"
						className="w-full h-full object-contain"
					/>
				</div>
				{/*Posts*/}
				<div className="flex flex-col md:flex-row py-24 items-center justify-center">
					<div className="max-w-screen-xl mx-auto px-4 sm:px-12 lg:px-12 flex-grow-2 w-full md:w-11/12">
						<div className="max-w-8xl mx-auto p-5 flex w-full">
							<div className="flex flex-col flex-grow-1 items-start">
								<h1 className="text-2xl md:text-3xl font-Merriweather font-bold">
									{sortPostBy} Posts
								</h1>
								<p className="font-Jaldi text-lg md:text-xl sm:text-base">
									Check out the latest posts from the
									university's Guidance Counselor!
								</p>
							</div>
							<div className="ml-auto relative">
								<GiSettingsKnobs
									className="fill-black stroke-0 hover:stroke-2 text-2xl cursor-pointer text-center"
									onClick={() =>
										setShowFilterModal((prev) => !prev)
									}
								/>
								{showFilterPostModal && (
									<div className="absolute w-30 h-22 px-1 shadow-xl bg-slate-100 border border-slate-300 text-slate-600 font-semibold right-0 top-7 z-20 rounded-xl">
										<ul className="p-2 cursor-pointer text-start">
											<li
												className="p-1 hover:bg-slate-200 rounded"
												onClick={() => {
													setSortPostBy("Latest");
													setShowFilterModal(false);
												}}>
												Latest
											</li>
											<li
												className="p-1 hover:bg-slate-200 rounded"
												onClick={() => {
													setSortPostBy("Oldest");
													setShowFilterModal(false);
												}}>
												Oldest
											</li>
										</ul>
									</div>
								)}
							</div>
						</div>
						<div className="w-full mx-auto p-3 flex-grow max-h-[100vh] overflow-y-auto">
							{loading ? (
								<LoadingState />
							) : sortedPosts.length === 0 ? (
								<p className="text-center mt-4 text-gray-500">
									No posts yet. Come back later.
								</p>
							) : (
								sortedPosts.map((post) => (
									<PostCard
										key={post.postId}
										post={post}
									/>
								))
							)}
						</div>
					</div>
					<div className="w-full border-t border-gray-300 my-6 md:hidden"></div>
					{/*Blogs*/}
					<div className="flex-grow-1 mx-auto px-8 sm:px-10 lg:px-12 flex-grow-2">
						<div className="flex flex-col px-6 flex-grow-1 items-start my-6">
							<h1 className="text-3xl font-Merriweather font-bold">
								Editor's Picks
							</h1>
							<p className="font-Jaldi text-xl sm:text-base">
								Check out the latest posts from the university's
								Guidance Counselor!
							</p>
						</div>
						<div className="w-full mx-auto flex-grow max-h-[100vh] overflow-y-auto">
							<Card />
						</div>
					</div>
				</div>
				<Footer />
			</main>
		</div>
	);
}
