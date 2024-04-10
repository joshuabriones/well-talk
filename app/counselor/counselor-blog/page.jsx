"use client";
import { Navbar } from "@/components/ui/Navbar";
import BlogSection from "@/components/ui/BlogSection";
import CreateBlogSection from "@/components/ui/CreateBlog";
import { useState } from "react";
import "../../../css/createblog.css";

export default function Home() {
	const [selectedButton, setSelectedButton] = useState("view");
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const handleButtonClick = (button) => {
		setSelectedButton(button);
		if (button === "create") {
			setIsCreateModalOpen(true);
		}
	};
	return (
		<div>
			<main className="min-h-screen">
				<Navbar userType="counselor" />
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
				<div className="flex justify-between items-center px-44 mt-12">
					<div className="flex items-center">
						<button
							className={`text-sm sm:text-lg lg:text-base font-Merriweather mr-4 py-1 px-4 ${
								selectedButton === "view"
									? "border-b-2 border-[#6B9080] text-[#6B9080]"
									: "text-[#6B9080] hover:border-b-2 hover:border-[#6B9080]"
							}`}
							onClick={() => handleButtonClick("view")}>
							View Blogs
						</button>
						<button
							className={`text-sm sm:text-lg lg:text-base font-Merriweather py-1 px-4 ${
								selectedButton === "create"
									? "border-b-2 border-[#6B9080] text-[#6B9080]"
									: "text-[#6B9080] hover:border-b-2 hover:border-[#6B9080]"
							}`}
							onClick={() => handleButtonClick("create")}>
							Create Blog
						</button>
					</div>
				</div>
				
				{selectedButton === "view" && <BlogSection />}
				{selectedButton === "create" && <CreateBlogSection isOpen={isCreateModalOpen} />}
			</main>
		</div>
	);
}
