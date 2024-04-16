"use client";
import BlogBlock from "@/components/ui/BlogBlock";
import Footer from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import LandingSlider from "@/components/ui/Slider";

import { useState } from "react";
export default function Home() {
	const [selectedButton, setSelectedButton] = useState("featured");

	const handleButtonClick = (button) => {
		setSelectedButton(button);
	};
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

				<div className="flex justify-between items-center px-44 mt-24">
					<h2 className="text-3xl sm:text-6xl lg:text-5xl font-Merriweather mb-4">
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
				<section id="blog-card">
					<div className="container mx-auto mt-4">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
							<div className="blog-post py-3">
								<div className="image-zoom">
									<a
										href="blog-single.html"
										className="blog-img">
										<img
											src="/images/landing/blog6.png"
											alt=""
											className="img-fluid"
										/>
									</a>
								</div>
								<div className="pt-8">
									<span className="blog-date uppercase font-Jaldi">
										by <b>Author</b> on 12th Jan 2023
									</span>
								</div>
								<div>
									<h3 className="py-5">
										<a
											href="blog-single.html"
											className="font-heading font-thin text-2xl hover:text-gray-500 font-Merriweather">
											I am alone, and feel the charm of
											existence created for the bliss
										</a>
									</h3>
									<p className="pb-10 font-Jaldi">
										I am so happy, my dear friend, so
										absorbed in the exquisite sense of mere
										tranquil existence, that I neglect my
										talents. I should be incapable of
										drawing since
									</p>
									<a
										href="blog-single.html"
										className="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out">
										Read More
									</a>
								</div>
							</div>
							<div className="blog-post py-3">
								<div className="image-zoom">
									<a
										href="blog-single.html"
										className="blog-img">
										<img
											src="/images/landing/blog5.png"
											alt=""
											className="img-fluid"
										/>
									</a>
								</div>
								<div className="pt-8">
									<span className="blog-date uppercase font-Jaldi">
										by <b>Author</b> on 12th Jan 2023
									</span>
								</div>
								<div>
									<h3 className="py-5">
										<a
											href="blog-single.html"
											className="font-heading font-thin text-2xl hover:text-gray-500 font-Merriweather">
											I am alone, and feel the charm of
											existence created for the bliss
										</a>
									</h3>
									<p className="pb-10 font-Jaldi">
										I am so happy, my dear friend, so
										absorbed in the exquisite sense of mere
										tranquil existence, that I neglect my
										talents. I should be incapable of
										drawing since
									</p>
									<a
										href="blog-single.html"
										className="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out">
										Read More
									</a>
								</div>
							</div>
							<div className="blog-post py-3">
								<div className="image-zoom">
									<a
										href="blog-single.html"
										className="blog-img">
										<img
											src="/images/landing/blog4.png"
											alt=""
											className="img-fluid"
										/>
									</a>
								</div>
								<div className="pt-8">
									<span className="blog-date uppercase font-Jaldi">
										by <b>Author</b> on 12th Jan 2023
									</span>
								</div>
								<div>
									<h3 className="py-5">
										<a
											href="blog-single.html"
											className="font-heading font-thin text-2xl hover:text-gray-500 font-Merriweather">
											I am alone, and feel the charm of
											existence created for the bliss
										</a>
									</h3>
									<p className="pb-10 font-Jaldi">
										I am so happy, my dear friend, so
										absorbed in the exquisite sense of mere
										tranquil existence, that I neglect my
										talents. I should be incapable of
										drawing since
									</p>
									<a
										href="blog-single.html"
										className="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out">
										Read More
									</a>
								</div>
							</div>
							<div className="blog-post py-3">
								<div className="image-zoom">
									<a
										href="blog-single.html"
										className="blog-img">
										<img
											src="/images/landing/blog3.png"
											alt=""
											className="img-fluid"
										/>
									</a>
								</div>
								<div className="pt-8">
									<span className="blog-date uppercase font-Jaldi">
										by <b>Author</b> on 12th Jan 2023
									</span>
								</div>
								<div>
									<h3 className="py-5">
										<a
											href="blog-single.html"
											className="font-heading font-thin text-2xl hover:text-gray-500 font-Merriweather">
											I am alone, and feel the charm of
											existence created for the bliss
										</a>
									</h3>
									<p className="pb-10 font-Jaldi">
										I am so happy, my dear friend, so
										absorbed in the exquisite sense of mere
										tranquil existence, that I neglect my
										talents. I should be incapable of
										drawing since
									</p>
									<a
										href="blog-single.html"
										className="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out">
										Read More
									</a>
								</div>
							</div>
							<div className="blog-post py-3">
								<div className="image-zoom">
									<a
										href="blog-single.html"
										className="blog-img">
										<img
											src="/images/landing/blog2.png"
											alt=""
											className="img-fluid"
										/>
									</a>
								</div>
								<div className="pt-8">
									<span className="blog-date uppercase font-Jaldi">
										by <b>Author</b> on 12th Jan 2023
									</span>
								</div>
								<div>
									<h3 className="py-5">
										<a
											href="blog-single.html"
											className="font-heading font-thin text-2xl hover:text-gray-500 font-Merriweather">
											I am alone, and feel the charm of
											existence created for the bliss
										</a>
									</h3>
									<p className="pb-10 font-Jaldi">
										I am so happy, my dear friend, so
										absorbed in the exquisite sense of mere
										tranquil existence, that I neglect my
										talents. I should be incapable of
										drawing since
									</p>
									<a
										href="blog-single.html"
										className="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out">
										Read More
									</a>
								</div>
							</div>
							<div className="blog-post py-3">
								<div className="image-zoom">
									<a
										href="blog-single.html"
										className="blog-img">
										<img
											src="/images/landing/blog1.png"
											alt=""
											className="img-fluid"
										/>
									</a>
								</div>
								<div className="pt-8">
									<span className="blog-date uppercase font-Jaldi">
										by <b>Author</b> on 12th Jan 2023
									</span>
								</div>
								<div>
									<h3 className="py-5">
										<a
											href="blog-single.html"
											className="font-heading font-thin text-2xl hover:text-gray-500 font-Merriweather">
											I am alone, and feel the charm of
											existence created for the bliss
										</a>
									</h3>
									<p className="pb-10 font-Jaldi">
										I am so happy, my dear friend, so
										absorbed in the exquisite sense of mere
										tranquil existence, that I neglect my
										talents. I should be incapable of
										drawing since
									</p>
									<a
										href="blog-single.html"
										className="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out">
										Read More
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>

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
}
