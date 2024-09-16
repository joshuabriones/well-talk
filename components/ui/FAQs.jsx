import getScrollAnimation from "@/utils/getScrollAnimation";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import ScrollAnimationWrapper from "../layout/ScrollAnimationWrapper";

const Questions = ({ faqList }) => {
	return (
		<section className="ezy__faq15 py-12 md:py-24 sm:py-32 bg-silver dark:bg-[#0b1727] text-zinc-900 dark:text-white mt-12 border-t-2 border-b-2 border-zinc-900 dark:border-white">
			<div className="w-10/12 container mx-auto md:px-8 lg:px-28">
			<ScrollAnimationWrapper animationType="default">
					<div className="text-center md:text-start">
						<h3 className="font-Merriweather text-gray-700 text-3xl font-semibold sm:text-4xl ">
							Frequently Asked Questions
						</h3>

						<p className="font-Jaldi text-gray-700 mt-4">
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Ad dolorem labore assumenda, eveniet culpa
							nisi rerum, quia laborum similique nemo molestiae
							sit amet cumque dolorum!
						</p>
					</div>
				</ScrollAnimationWrapper>
				<ScrollAnimationWrapper animationType="default">
					<div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
						{faqList.map((faq, i) => (
							<div
								className="flex flex-col items-center dark:bg-[#1a202c] rounded-lg p-6"
								key={i}
								{...getScrollAnimation()}>
								<div className="h-12 w-12 flex rounded-full justify-center items-center mb-4 bg-gold">
									<QuestionMarkCircleIcon className="h-6 w-6 text-gray" />
								</div>
								<h3 className="font-Merriweather text-xl font-bold mb-2 text-gray-900 dark:text-white">
									{faq.question}
								</h3>
								<p className="font-Jaldi text-lg leading-snug opacity-80 mb-4 text-gray-700 dark:text-gray-300">
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

{
	/* <div className="grid grid-cols-12 mt-6">
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
				</div> */
}
