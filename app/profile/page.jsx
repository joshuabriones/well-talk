"use client";
import { Navbar } from "@/components/ui/Navbar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CounselorProfile = () => {
	const [counselor, setCounselor] = useState(null);
	const [posts, setPosts] = useState([]);
    const { data: session } = useSession();

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
			},
			{
				id: "2",
				title: "Second Post",
				content: "This is the content of the second post.",
			},
			{
				id: "3",
				title: "Third Post",
				content: "This is the content of the third post.",
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
			<div className="w-full border border-slate-100 border-2 rounded-xl pt-4 md:mt-6 p-8 md:p-12 flex flex-col md:flex-row justify-center items-center">
			
					<section className="flex flex-col md:flex-col items-center md:gap-10 mb-8 justify-center items-center w-full">
            {/* Avatar */}
            <div className="w-full md:w-full flex flex-grow justify-center items-center avatar">
              <div className="w-48 rounded-full ring ring-[#6B9080] ring-offset-base-100 ring-offset-1">
                <img src={session?.user.image} />
              </div>
            </div>
            {/* User Info */}
            <div className="w-full md:w-10/12 flex flex-col justify-center items-center md:justify-start md:mt-0 mt-4">
              <h1 className="font-Merriweather text-2xl md:text-4xl font-bold tracking-tight mt-4">
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
          
          <div className="border-l border-slate-100 h-full mx-8 md:mx-12"></div>

					<section className="flex flex-col gap-6 mt-2 w-full">
						{/* Posts */}
						<div className="w-full">
							<h1 className="font-Merriweather text-slate-600 text-2xl font-semibold tracking-tight py-4">
								Posts by {counselor.name}
							</h1>
							{posts.map((post) => (
								<div
									key={post.id}
									className="border border-slate-100 p-4 w-full">
									<h2 className="text-lg font-semibold mb-2">
										{post.title}
									</h2>
									<p>{post.content}</p>
								</div>
							))}
						</div>
					</section>
		
			</div>
		</div>
	);
};

export default CounselorProfile;
