"use client";
import { default as Load, default as LoadingState } from "@/components/Load";
import Card from "@/components/ui/Card";
import Footer from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import PostCard from "@/components/ui/PostsCard";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Home() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const userSession = getUserSession();

	const fetchPosts = async () => {
		try {
			const response = await fetch(`${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_POSTS}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			});
			if (!response.ok) {
				throw new Error("Failed to fetch posts");
			}
			const data = await response.json();
			setPosts(data);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching posts:", error);
			setLoading(false);
		}
	};

	/* Handling unauthenticated users */
	if (Cookies.get("token") === undefined || Cookies.get("token") === null) {
		return <Load route="login" />;
	}

	if (userSession && userSession.role !== "teacher") {
		return <Load route={userSession.role} />;
	}

	useEffect(() => {
		fetchPosts();
	}, []);

	console.log(userSession);

	return (
		<div>
			<main className="min-h-screen">
				<Navbar userType="teacher" />
				<div
					className="pattern-overlay pattern-left absolute -z-10"
					style={{ transform: "scaleY(-1)", top: "-50px" }}
				>
					<img src="/images/landing/lleft.png" alt="pattern" />
				</div>
				<div
					className="pattern-overlay pattern-right absolute bottom-0 right-0 -z-10"
					style={{ transform: "scaleY(-1)", top: "-15px" }}
				>
					<img
						src="/images/landing/lright.png"
						alt="pattern"
						className="w-full h-full object-contain"
					/>
				</div>
				{/*Posts*/}
				<div className="flex flex-col md:flex-row py-24 px-4 md:px-12">
					<div className="max-w-screen-xl mx-auto sm:px-12 lg:px-14 flex-grow-2 w-full md:w-11/12">
						<div className="max-w-8xl mx-auto px-5 flex w-full">
							<div className="flex flex-col  flex-grow-1 items-start my-6">
								<h1 className="text-2xl md:text-3xl font-Merriweather font-bold">
									Posts
								</h1>
								<p className="font-Jaldi text-xl sm:text-base">
									Check out the latest posts from the university's Guidance
									Counselor!
								</p>
							</div>
							{/* <div className="ml-auto relative">
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
							</div> */}
						</div>
						<div className="w-full p-2 mx-auto flex-grow max-h-[90vh] overflow-y-auto">
							{loading ? (
								<LoadingState />
							) : posts.length === 0 ? ( // Check if the posts array is empty
								<p className="text-center mt-4 text-gray-500">
									No posts yet. Come back later.
								</p>
							) : (
								posts.map(
									(
										post // Use 'posts' instead of 'sortedPosts' if you haven't sorted the posts yet
									) => <PostCard key={post.postId} post={post} />
								)
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
								Check out the latest posts from the university's Guidance Counselor!
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

export default dynamic(() => Promise.resolve(Home), { ssr: false });
