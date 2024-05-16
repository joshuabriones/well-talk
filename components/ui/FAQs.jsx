import { QuestionMarkCircleIcon } from "@heroicons/react/outline";

const Questions = ({ faqList  }) => {
	
	return (
		<section className="ezy__faq15 py-14 md:py-24 bg-gray-50 dark:bg-[#0b1727] text-zinc-900 dark:text-white flex justify-center items-center">
			<div className="container px-16 md:px-8 lg:px-28">
				<div className="grid grid-cols-12">
					<div className="col-span-12 lg:col-span-7 text-center md:text-start pl-6 lg:pl-12">
						<h3 className="font-Merriweather text-gray-700 text-3xl font-semibold sm:text-4xl">
							Frequently Asked Questions
						</h3>
						<p className="font-Jaldi text-gray-700 mt-4">
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Ad dolorem labore assumenda, eveniet culpa
							nisi rerum, quia laborum similique nemo molestiae
							sit amet cumque dolorum!
						</p>
					</div>
				</div>
				{/*  faqs  */}
				<div className="grid grid-cols-12 text-center md:text-start">
					{faqList.map((faq, i) => (
						<div
							className="col-span-12 md:col-span-6 lg:col-span-4"
							key={i}>
							<div>
								<div className="flex flex-col items-center md:items-start p-2 lg:p-10">
									<div
										className="text-white h-10 w-10 rounded-full flex justify-center items-center mb-6"
										style={{ backgroundColor: "#6B9080" }}>
										<QuestionMarkCircleIcon className="h-6 w-6" />
									</div>

									<h3 className="font-Merriweather text-xl font-bold mb-4">
										{faq.question}
									</h3>
									<p className="font-Jaldi text-lg leading-snug opacity-80 mb-2">
										{faq.answer}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

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
			</div>
		</section>
	);
};

export default Questions;
// 	return (
// 		<div className="w-full max-w-screen-xl mx-auto">
// 			<div className="py-auto text-center flex flex-row items-center">
// 				<div className="flex-grow mb-8">
// 					<h2 className="mt-[9.25rem] mb-[1.3125rem] text-xl sm:text-3xl lg:text-5xl font-Merriweather md:text-[2rem]">
// 						Frequently Asked Questions
// 					</h2>
// 					<p className="mx-auto max-w-[46ch] text-very-dark-blue/50 md:text-normal">
// 						Here are some of our FAQs. If you have any other
// 						questions you’d like answered please feel free send us a message!
// 					</p>
// 				</div>
// 			</div>

// 			<div className="mx-auto mt-[3.5rem] mb-[4rem] w-8/12">
// 				<details className="border-t border-very-dark-blue/50">
// 					<summary className="bg-very-light-gray flex w-full cursor-pointer items-center justify-between rounded-md py-[1.1875rem] font-bold tracking-[-0.02em] text-very-dark-blue transition duration-300 hover:text-soft-red md:pr-[1.3125rem] md:text-normal">
// 						Lorem ipsum dolor sit amet?
// 						<ArrowCircleDownIcon
// 							aria-hidden="true"
// 							className="transition-all duration-300 ease-in-out"
// 							width={24}
// 							height={24}
// 						/>
// 					</summary>
// 					<p className="px-4 py-3 text-very-dark-blue/50 transition-all duration-500 ease-in-out md:text-[1rem]">
// 						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
// 						Fusce tincidunt justo eget ultricies fringilla.
// 						Phasellus blandit ipsum quis quam ornare mattis.
// 					</p>
// 				</details>
// 				<details className="border-t border-very-dark-blue/50">
// 					<summary className="bg-very-light-gray flex w-full cursor-pointer items-center justify-between rounded-md pt-[1.1875rem] pb-[1.375rem] font-bold tracking-[-0.01em] text-very-dark-blue transition duration-300 hover:text-soft-red md:pr-[1.3125rem] md:text-normal">
// 						Lorem ipsum dolor sit amet?
// 						<ArrowCircleDownIcon
// 							aria-hidden="true"
// 							className="transition-all duration-300 ease-in-out"
// 							width={24}
// 							height={24}
// 						/>
// 					</summary>
// 					<p className="px-4 py-3 text-very-dark-blue/50 md:text-[1rem]">
// 						Vivamus luctus eros aliquet convallis ultricies. Mauris
// 						augue massa, ultricies non ligula. Suspendisse
// 						imperdiet. Vivamus luctus eros aliquet convallis
// 						ultricies. Mauris augue massa, ultricies non ligula.
// 						Suspendisse imperdie tVivamus luctus eros aliquet
// 						convallis ultricies. Mauris augue massa, ultricies non
// 						ligula. Suspendisse imperdiet.
// 					</p>
// 				</details>
// 				<details className="border-t border-very-dark-blue/50">
// 					<summary className="bg-very-light-gray flex w-full cursor-pointer items-center justify-between rounded-md pt-[1.375rem] pb-[1rem] font-bold tracking-[-0.02em] text-very-dark-blue transition duration-300 hover:text-soft-red md:pr-[1.3125rem] md:text-normal">
// 						Lorem ipsum dolor sit amet?
// 						<ArrowCircleDownIcon
// 							aria-hidden="true"
// 							className="transition-all duration-300 ease-in-out"
// 							width={24}
// 							height={24}
// 						/>
// 					</summary>
// 					<p className="px-4 py-3 text-very-dark-blue/50 md:text-[1rem]">
// 						Sed consectetur quam id neque fermentum accumsan.
// 						Praesent luctus vestibulum dolor, ut condimentum urna
// 						vulputate eget. Cras in ligula quis est pharetra mattis
// 						sit amet pharetra purus. Sed sollicitudin ex et
// 						ultricies bibendum.
// 					</p>
// 				</details>
// 				<details className="border-y border-very-dark-blue/50">
// 					<summary className="bg-very-light-gray flex w-full cursor-pointer items-center justify-between rounded-md py-[1.3125rem] font-bold tracking-[-0.02em] text-very-dark-blue transition duration-300 hover:text-soft-red md:pr-[1.3125rem] md:text-normal">
// 						Lorem ipsum dolor sit amet?
// 						<ArrowCircleDownIcon
// 							aria-hidden="true"
// 							className="transition-all duration-300 ease-in-out"
// 							width={24}
// 							height={24}
// 						/>
// 					</summary>
// 					<p className="px-4 py-3 text-very-dark-blue/50 md:text-[1rem]">
// 						Integer condimentum ipsum id imperdiet finibus. Vivamus
// 						in placerat mi, at euismod dui. Aliquam vitae neque eget
// 						nisl gravida pellentesque non ut velit.
// 					</p>
// 				</details>
// 			</div>
// 		</div>

// 		/*<div className="mt-8 flex justify-center">
//         <a
//           href="#"
//           className="rounded-md border-[0.188rem] border-soft-blue bg-soft-blue py-[0.6558rem] px-[1.5201rem] text-[0.875rem] text-white transition duration-300 hover:bg-white hover:text-soft-blue"
//         >
//           More info
//         </a>
//   </div>*/
// 	);
