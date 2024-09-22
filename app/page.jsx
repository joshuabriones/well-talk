"use client";
import ScrollAnimationWrapper from "@/components/layout/ScrollAnimationWrapper";
import Questions from "@/components/ui/FAQs";
import Footer from "@/components/ui/Footer";
import Features from "@/components/ui/landing/Features";
import Hero from "@/components/ui/landing/Hero";
import { Navbar } from "@/components/ui/landing/LandingNav";
import LandingSlider from "@/components/ui/landing/Slider";
import { Content } from "@/components/ui/landing/Steps";

export default function Landing() {
	const faqList = [
		{
			question: "What is WellTalk?",
			answer: "WellTalk is a comprehensive platform designed to facilitate seamless communication and scheduling between students and counselors, ensuring a supportive environment for mental health and well-being.",
		},
		{
			question: "How do I schedule an appointment with a counselor on WellTalk?",
			answer: "To schedule an appointment with a counselor on WellTalk, log in to your account and navigate to the Appointments or Schedule section. From there, you can elect a convenient time slot and confirm your appointment.",
		},
		{
			question: "Is my information confidential and secure on WellTalk?",
			answer: "Yes, we take your privacy and security seriously on WellTalk. Your information is encrypted and stored securely according to industry standards. Only authorized personnel have access to your data, and we adhere to strict confidentiality protocols.",
		},
		{
			question: "Can I reschedule or cancel appointments?",
			answer: "Yes, you can reschedule or cancel appointments through your WellTalk account. Simply go to the Appointments section, locate the appointment you wish to change, and follow the prompts to adjust the date and time or cancel the appointment.",
		},
		{
			question: "Are there resources available for self-help and mental health tips?",
			answer: "Absolutely! WellTalk provides a wealth of resources, including self-help guides, mental health tips, and informative articles to support your well-being journey. Explore our Resources section to access these valuable materials.",
		},
		{
			question: "Is WellTalk accessible on mobile devices?",
			answer: "Yes, WellTalk is fully accessible on mobile devices. We've designed the app to be responsive and user-friendly on smartphones and tablets, ensuring that you can access all features and functionalities seamlessly on the go.",
		},
	];

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
					<div className="flex flex-col-reverse w-10/12 lg:w-9/12 sm:w-full md:flex-row mx-auto items-center">	
							<div className="w-full md:w-3/5 lg:w-7/12">
								<div className="w-full">
									<LandingSlider />
								</div>
							</div>

						<div className="w-full md:w-2/5 lg:w-5/12 text-center md:text-right mt-8 md:mt-0">
							<ScrollAnimationWrapper animationType="fadeInFromRight">
								<div className="mt-8 md:mt-0 sm:mt-0">
									<h2 className="text-3xl sm:text-5xl lg:text-6xl font-Merriweather">
										Discover Our <br /> Dedicated <br />
										Counselors
									</h2>
									<p className="mt-4">
										Meet the compassionate individuals who
										form the backbone of <br /> our
										counseling team. Each counselor brings a
										wealth of expertise <br /> and empathy,
										ready to guide you through life's
										challenges with <br /> understanding and
										support.
									</p>
								</div>
							</ScrollAnimationWrapper>
						</div>
					</div>
				</div>

				<Questions faqList={faqList} />

				<ScrollAnimationWrapper animationType="default">
					<div className="w-full flex justify-center items-center mt-6 relative">
						<div className="p-6 w-full max-w-screen-md text-center">
							<div className="p-6 rounded-xl text-white md:py-6 lg:py-12 bg-maroon relative mt-4 lg:-mt-40 z-10 border border-2 border-gray">
								<h4 className="font-Merriweather text-gray-50 text-2xl md:text-3xl font-semibold sm:text-4xl">
									Have any additional questions?
								</h4>
								<p className="font-Jaldi text-gray-50 mt-4">
									Lorem, ipsum dolor sit amet consectetur
									adipisicing elit. Aut, odio fuga!
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
