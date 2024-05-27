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

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login");
		}
	}, [status]);

	useEffect(() => {
		fetchPosts();
	}, []);

	if (status === "loading" || !session) {
		return <LoadingState />;
	}

	// Redirect authenticated users who are not students
	if (session.user.role !== "student") {
		router.push("/login");
		return null; // Prevent rendering anything if redirecting
	}

	console.log(session);


	const getSortedPosts = () => {
		if (sortPostBy === "Latest") {
			return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
		} else if (sortPostBy === "Oldest") {
			return [...posts].sort((a, b) => new Date(a.date) - new Date(b.date));
		} else {
			return posts;
		}
	};

	const sortedPosts = getSortedPosts();

	return (
		<div>
			<main className="min-h-screen">
				<Navbar userType="student" />
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
				<div className="flex flex-col md:flex-row py-24 px-4 md:px-12 items-center justify-center">
					<div className="max-w-screen-xl mx-auto sm:px-12 lg:px-14 flex-grow-2 w-full md:w-11/12">
						<div className="max-w-8xl mx-auto px-5 flex w-full">
							<div className="flex flex-col  flex-grow-1 items-start my-6">
								<h1 className="text-2xl md:text-3xl font-Merriweather font-bold">
									{sortPostBy} Posts
								</h1>
								<p className="font-Jaldi text-xl sm:text-base">
									Check out the latest posts from the
									university's Guidance Counselor!
								</p>
							</div>
						</div>
						<div className="w-full p-2 mx-auto flex-grow max-h-[90vh] overflow-y-auto">
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
					{/*Blogs*/}
					<div className="max-w-screen-xl mx-auto sm:px-12 lg:px-14 flex-grow-2 w-full">
						<div className="flex flex-col px-4 flex-grow-1 items-start my-6">
							<h1 className="text-2xl md:text-3xl font-Merriweather font-bold">
								Editor's Picks
							</h1>
							<p className="font-Jaldi text-xl sm:text-base">
								Check out the latest posts from the university's
								Guidance Counselor!
							</p>
						</div>
						<div className="w-full mx-auto flex-grow max-h-[90vh] overflow-y-auto">
							<Card />
						</div>
					</div>
				</div>
				<Footer />
			</main>
		</div>
	);
}
