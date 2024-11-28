import getScrollAnimation from "@/utils/getScrollAnimation";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import ScrollAnimationWrapper from "../layout/ScrollAnimationWrapper";

const Questions = () => {
	const faqList = [
		{
			question: "What is WellTalk?",
			answer: "WellTalk is a comprehensive platform designed to facilitate seamless communication and scheduling between students and counselors, ensuring a supportive environment for mental health and well-being.",
		},
		{
			question: "How do I schedule an appointment with a counselor on WellTalk?",
			answer: "To schedule an appointment with a counselor on WellTalk, log in to your account and navigate to the Appointments or Schedule section. From there, you can select a convenient time slot and confirm your appointment.",
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
		<section className="ezy__faq15 py-12 md:py-24 sm:py-32 bg-silver  text-zinc-900  mt-12 border-t-2 border-b-2 border-zinc-900">
			<div className="w-10/12 container mx-auto md:px-8 lg:px-28">
				<ScrollAnimationWrapper animationType="default">
					<div className="text-center md:text-start">
						<h3 className="font-Merriweather text-gray-700 text-3xl font-semibold sm:text-4xl">
							Frequently Asked Questions
						</h3>
						<p className="font-Jaldi text-gray-700 mt-4">
							Have questions? We’ve compiled answers to some of the most common inquiries to help you navigate our services and find the information you need.
						</p>
					</div>
				</ScrollAnimationWrapper>

				<ScrollAnimationWrapper animationType="default">
					<div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
						{faqList.map((faq, i) => (
							<div
								className="flex flex-col items-center  rounded-lg p-6 cursor-pointer hover:bg-gold hover:border-2 transition"
								key={i}
								{...getScrollAnimation()}
								role="region"
								aria-labelledby={`faq-question-${i}`}
								tabIndex={0} 
							>
								<div className="h-12 w-12 flex rounded-full justify-center items-center mb-4 bg-gold">
									<QuestionMarkCircleIcon
										className="h-6 w-6 text-gray"
										aria-hidden="true"
									/>
								</div>
								<h3
									className="font-Merriweather text-xl font-bold mb-2 text-gray-900"
									id={`faq-question-${i}`}
								>
									{faq.question}
								</h3>
								<p className="font-Jaldi text-lg leading-snug opacity-80 mb-4 text-gray-700">
									{faq.answer}
								</p>
							</div>
						))}
					</div>
				</ScrollAnimationWrapper>
			</div>
		</section>
	);
};

export default Questions;
