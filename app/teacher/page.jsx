"use client";
import Blogs from "@/components/ui/Blogs";
import Footer from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import BlogBlock from "@/components/ui/landing/BlogBlock";
import LandingSlider from "@/components/ui/landing/Slider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const StudentPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	const [selectedButton, setSelectedButton] = useState("featured");

	const handleButtonClick = (button) => {
		setSelectedButton(button);
	};

	useEffect(() => {
		if (status === "unauthenticated") router.push("/login");
	}, [status]);

	if (status === "loading" || !session) {
		return <div>Loading...</div>;
	}

	// Redirect authenticated users who are not counselors
	if (session.user.role !== "teacher") {
		router.push("/login"); // Redirect to homepage or appropriate page
		return null; // Prevent rendering anything if redirecting
	}

	console.log(session);
	return (
		<div className="w-full h-screen flex flex-col items-center justify-center">
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

				<div className="flex justify-between items-center px-44 mt-24">
					<h2 className="text-3xl sm:text-6xl lg:text-5xl font-Merriweather mb-4 mt-12">
						Welcome, user!
					</h2>
				</div>
				<div className="flex justify-between items-center px-44 mt-4">
					<div className="flex items-center">
						<button
							className={`text-sm sm:text-lg lg:text-base font-Merriweather mr-4 py-1 px-4 rounded-full ${
								selectedButton === "featured"
									? "bg-[#6B9080] text-white"
									: "bg-transparent text-[#6B9080]"
							}`}
							onClick={() => handleButtonClick("featured")}>
							Featured
						</button>
						<button
							className={`text-sm sm:text-lg lg:text-base font-Merriweather py-1 px-4 rounded-full ${
								selectedButton === "latest"
									? "bg-[#6B9080] text-white"
									: "bg-transparent text-[#6B9080]"
							}`}
							onClick={() => handleButtonClick("latest")}>
							Latest
						</button>
					</div>
					<div className="flex justify-end items-center">
						<form method="GET">
							<div className="relative text-gray-600 focus-within:text-gray-400">
								<span className="absolute inset-y-0 left-0 flex items-center pl-2">
									<button
										type="submit"
										className="p-1 focus:outline-none focus:shadow-outline">
										<svg
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											viewBox="0 0 24 24"
											className="w-6 h-6">
											<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
										</svg>
									</button>
								</span>
								<input
									type="search"
									name="q"
									className="py-2 text-sm text-white bg-gray-200 rounded-full pl-10 focus:outline-none focus:bg-white focus:text-gray-200"
									placeholder="Search..."
									autoComplete="off"
								/>
							</div>
						</form>
					</div>
				</div>

				<Blogs />
				<BlogBlock />

				<div className="flex container mx-auto mt-20">
					<div className="w-1/2">
						<div className="p-5 mt-40">
							<h2 className=" text-3xl sm:text-6xl lg:text-7xl font-Merriweather">
								Discover Our
							</h2>
							<h2 className=" text-3xl sm:text-6xl lg:text-7xl font-Merriweather">
								Dedicated
							</h2>
							<h2 className=" text-3xl sm:text-6xl lg:text-7xl font-Merriweather mb-12">
								Counselors
							</h2>
							<p>
								Meet the compassionate individuals who form the
								backbone of <br></br> our counseling team. Each
								counselor brings a wealth of expertise<br></br>{" "}
								and empathy, ready to guide you through life's
								challenges with<br></br> understanding and
								support.
							</p>
						</div>
					</div>
					<div className="w-1/2">
						<div className="p-5">
							<LandingSlider />
						</div>
					</div>
				</div>
				<Footer />
			</main>
		</div>
	);
};

export default StudentPage;
