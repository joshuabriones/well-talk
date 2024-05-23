"use client";
import Features from "@/components/ui/landing/Features";
import Hero from "@/components/ui/landing/Hero";
import { Navbar } from "@/components/ui/landing/LandingNav";
import { Content } from "@/components/ui/landing/Steps";
import BlogBlock from "@/components/ui/landing/BlogBlock";
import Questions from "@/components/ui/FAQs";
import Footer from "@/components/ui/Footer";
import LandingSlider from "@/components/ui/landing/Slider";


export default function Landing() {
	
	const faqList = [
		{
			question: "What Shipping Options do you have?",
			answer: "Partner removes the hassle and confusion that comes from managing your tax burden effectively.",
		},
		{
			question: "What Shipping Options do you have?",
			answer: "Partner removes the hassle and confusion that comes from managing your tax burden effectively.",
		},
		{
			question: "What Shipping Options do you have?",
			answer: "Partner removes the hassle and confusion that comes from managing your tax burden effectively.",
		},
		{
			question: "What Shipping Options do you have?",
			answer: "Partner removes the hassle and confusion that comes from managing your tax burden effectively.",
		},
		{
			question: "What Shipping Options do you have?",
			answer: "Partner removes the hassle and confusion that comes from managing your tax burden effectively.",
		},
		{
			question: "What Shipping Options do you have?",
			answer: "Partner removes the hassle and confusion that comes from managing your tax burden effectively.",
		},
	];
	return (
		<div className="min-h-screen w-full">
			<main>
				<Navbar userType="landing" />
				<Hero />
				<Features />
				<Content />
				<div className="mb-6">
					<div className="flex flex-col-reverse p-6 md:flex-row container mx-auto items-center">
						<div className="w-full md:w-1/2">
							<div className="p-5">
								<LandingSlider />
							</div>
						</div>
						<div className="w-full md:w-1/2 text-center md:text-right mx-auto mt-8 md:mt-0">
							<div className="mt-8 md:mt-0">
								<h2 className="text-3xl sm:text-5xl lg:text-6xl font-Merriweather">
									Discover Our <br></br>Dedicated<br></br>{" "}
									Counselors
								</h2>
								<p className="mt-4">
									Meet the compassionate individuals who form
									the backbone of<br></br> our counseling
									team. Each counselor brings a wealth of
									expertise<br></br> and empathy, ready to
									guide you through life's challenges with
									<br></br> understanding and support.
								</p>
							</div>
						</div>
					</div>
				</div>
				<BlogBlock />
				<Questions faqList={faqList} />
				<div className="grid grid-cols-12 mt-6">
					<div className="col-span-12 text-center">
						<div
							className="rounded-xl text-white p-4 md:py-6 lg:py-12"
							style={{ backgroundColor: "#1F2724" }}>
							<h4 className="font-Merriweather text-gray-50 text-3xl font-semibold sm:text-4xl">
								Have any additional questions?
							</h4>
							<p className="font-Jaldi text-gray-50 mt-4">
								Lorem, ipsum dolor sit amet consectetur
								adipisicing elit. Aut, odio fuga!
							</p>
							<button
								className="hover:bg-opacity-90 text-white font-bold border border-gray-50 py-3 px-6 rounded-full transition mt-4 mb-0"
								style={{ backgroundColor: "#6B9080" }}>
								Get in touch
							</button>
						</div>
					</div>
				</div>
				<Footer />
			</main>
		</div>
	);
}