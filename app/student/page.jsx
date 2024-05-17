"use client";
import Footer from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import PostCard from "@/components/ui/PostsCard";
import { useEffect, useState } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import LoadingState from "@/components/Load";
import { useSession } from "next-auth/react";
import Loading from "@/components/Skeleton";
import { useRouter } from "next/navigation";

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

	
	const handleButtonClick = (button) => {
		setSelectedButton(button);
	};

	const getSortedPosts = () => {
		if (sortPostBy === "Latest") {
			return [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		} else if (sortPostBy === "Oldest") {
			return [...posts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
		}
		return posts;
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

				<div className="py-24">
					<div className="flex justify-between max-w-5xl mx-auto p-4">
						<h1 className="text-xl font-Merriweather font-semibold">{sortPostBy} Posts</h1>
						<GiSettingsKnobs
							className="fill-black stroke-0 hover:stroke-2 text-2xl cursor-pointer"
							onClick={() => setShowFilterModal((prev) => !prev)}
						/>
						{showFilterPostModal && (
							<div className="w-30 h-22 px-1 shadow-xl bg-slate-100 border border-slate-300 text-slate-600 font-semibold absolute right-11 top-4 z-20 rounded-xl">
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
					<div className="max-w-5xl mx-auto p-4 bg-gray-50 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
						{loading ? (
							<LoadingState />
						) : sortedPosts.length === 0 ? (
							<p className="text-center mt-4 text-gray-500">
								No posts yet. Come back later.
							</p>
						) : (
							sortedPosts.map((post) => (
								<PostCard key={post.postId} post={post} />
							))
						)}
					</div>
				</div>
				<Footer />
			</main>
		</div>
	);
}
