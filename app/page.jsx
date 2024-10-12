"use client";
import ScrollAnimationWrapper from "@/components/layout/ScrollAnimationWrapper";
import Questions from "@/components/ui/FAQs";
import Footer from "@/components/ui/Footer";
import Features from "@/components/ui/landing/Features";
import Hero from "@/components/ui/landing/Hero";
import { Navbar } from "@/components/ui/landing/LandingNav";
import LandingSlider from "@/components/ui/landing/Slider";
import { Content } from "@/components/ui/landing/Steps";
import styles from "./../css/landing.module.css";

export default function Landing() {
	return (
		<div className="min-h-screen w-full">
			<main>
				<Navbar userType="landing" />
				<Hero />
				<ScrollAnimationWrapper animationType="default">
					<Features />
				</ScrollAnimationWrapper>
				<ScrollAnimationWrapper animationType="fadeInFromLeft">
					<Content />
				</ScrollAnimationWrapper>
				<div>
					<div className="flex flex-col-reverse w-10/12 md:w-9/12 lg:w-9/12 sm:w-full lg:flex-row mx-auto items-center">
						<div className="w-full lg:w-7/12">
							<div className="w-full">
								<LandingSlider />
							</div>
						</div>
						<div className="w-full lg:w-5/12 text-left lg:text-right mt-8 md:mt-0">
							<ScrollAnimationWrapper animationType="fadeInFromRight">
								<div className="mt-4 md:mt-0 sm:mt-0">
									<h2 className="text-3xl md:text-3xl lg:text-6xl font-Merriweather">
										Meet Our <br /> Dedicated <br />
										Counselors
									</h2>
									<p className="mt-4 w-full md:w-9/12 lg:w-9/12 text-justify lg:ml-36">
										Meet the compassionate individuals who
										form the backbone of our
										counseling team. Each counselor brings a
										wealth of expertise and empathy,
										ready to guide you through life's
										challenges with understanding and
										support.
									</p>
								</div>
							</ScrollAnimationWrapper>
						</div>
					</div>
				</div>
				<Questions />
				<ScrollAnimationWrapper animationType="default">
					<div className="w-full flex justify-center items-center mt-6 relative">
						<div className="p-6 w-full max-w-screen-md text-center">
							<div className="p-6 rounded-xl text-white md:py-6 lg:py-12 bg-maroon relative mt-4 lg:-mt-40 z-10 border border-2 border-gray">
								<h4 className="font-Merriweather text-gray-50 text-2xl md:text-3xl font-semibold sm:text-4xl">
									Have any additional questions?
								</h4>
								<p className="font-Jaldi text-gray-50 mt-4 lg:w-10/12 lg:ml-16">
								Create an account today to easily raise your concerns and get the support you need from the guidance office.
								</p>
								<button className="hover:bg-opacity-90 text-gray font-bold border border-gray-50 py-3 px-6 rounded-full transition mt-4 mb-0 bg-gold">
									Get in touch
								</button>
							</div>
						</div>
					</div>
				</ScrollAnimationWrapper>
				<Footer />
			</main>
		</div>
	);
}
