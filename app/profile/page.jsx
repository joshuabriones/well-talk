"use client";
import { Navbar } from "@/components/ui/Navbar";
import { useEffect, useState } from "react";
import { getUserSession } from "@/lib/helperFunctions";
import PostCard from "@/components/ui/PostsCard";

const CounselorProfile = () => {
	const [counselor, setCounselor] = useState(null);
	const [posts, setPosts] = useState([]);
    const userSession = getUserSession();

	useEffect(() => {
		// Dummy data for counselor
		const dummyCounselor = {
			avatarUrl: "https://via.placeholder.com/150",
			email: "counselor@example.com",
			id: "123456",
			name: "John Doe",
		};

		// Dummy data for posts
		const dummyPosts = [
			{
				id: "1",
				title: "First Post",
				content: "This is the content of the first post.",
				author: {
					image: "https://via.placeholder.com/150",
					firstName: "John",
					lastName: "Doe",
					institutionalEmail: "john.doe@example.com",
				},
				postDate: "2024-05-28",
				postTime: "14:00:00",
				postContent: "This is the content of the first post.",
				postImage: "https://via.placeholder.com/300",
			},
			{
				id: "2",
				title: "Second Post",
				content: "This is the content of the second post.",
				author: {
					image: "https://via.placeholder.com/150",
					firstName: "John",
					lastName: "Doe",
					institutionalEmail: "john.doe@example.com",
				},
				postDate: "2024-05-29",
				postTime: "15:00:00",
				postContent: "This is the content of the second post.",
				postImage: "https://via.placeholder.com/300",
			},
			{
				id: "3",
				title: "Third Post",
				content: "This is the content of the third post.",
				author: {
					image: "https://via.placeholder.com/150",
					firstName: "John",
					lastName: "Doe",
					institutionalEmail: "john.doe@example.com",
				},
				postDate: "2024-05-30",
				postTime: "16:00:00",
				postContent: "This is the content of the third post.",
				postImage: "https://via.placeholder.com/300",
			},
		];

		setCounselor(dummyCounselor);
		setPosts(dummyPosts);
	}, []);

	if (!counselor) return <div>Loading...</div>;

	return (
		<div className="p-4 mt-16 md:p-12">
			<section>
				<Navbar userType="student" />
			</section>
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
			<div className="w-full rounded-xl pt-4 md:mt-6 p-4 md:p-8 flex flex-col justify-center items-center mt-20 md:mt-16">
			
			<div className="bg-white dark:bg-slate-800 shadow-xl border border-slate-200 border-2 rounded-xl hover:-translate-y-1 duration-500 h-full w-full lg:w-7/12 p-6 lg:p-8 relative">
    <section className="flex flex-col md:flex-col items-center md:gap-4 mb-8 justify-center items-center w-full">
        {/* Avatar */}
        <div className="w-full flex justify-center avatar absolute -top-16 md:-top-24">
            <div className="w-32 md:w-48 rounded-full ring ring-[#6B9080] ring-offset-base-100 ring-offset-1">
                <img src={userSession?.image} />
            </div>
        </div>
        {/* User Info */}
        <div className="w-full mt-14 md:mt-20 flex flex-col justify-center items-center md:justify-start">
            <h1 className="font-Merriweather text-2xl md:text-2xl lg:text-4xl font-bold tracking-tight mt-4">
                {counselor.name}
            </h1>
            <p className="font-Merriweather tracking-tight font-thin my-2">
                {counselor.email}
            </p>
            <p className="font-Merriweather tracking-tight font-thin ">
                {counselor.id}
            </p>
        </div>
    </section>

          
          <div className="border-l border-slate-100 h-full mx-4 md:mx-8 lg:mx-12"></div>

					<section className="flex flex-col gap-6 mt-2 w-full">
						{/* Posts */}
						<div className="w-full">
							<h1 className="font-Merriweather text-slate-600 text-xl md:text-2xl font-semibold tracking-tight py-4">
								Posts by {counselor.name}
							</h1>
							{posts.map((post) => (
								<PostCard key={post.id} post={post} />
							))}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default CounselorProfile;
