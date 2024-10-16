import ScrollAnimationWrapper from "@/components/layout/ScrollAnimationWrapper";
import styles from "../../../css/landing.module.css";
const features = [
	{
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="#F9FFFF"
				viewBox="0 0 24 24"
				className="w-6 h-6">
				<path
					fillRule="evenodd"
					d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
					clipRule="evenodd"
				/>
			</svg>
		),
		title: "Inquiry Feature",
		desc: "Easily inquire and get answers to your questions. WellTalk's inquiry feature allows you to connect with counselors and receive prompt responses.",
	},
	{
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="#F9FFFF"
				viewBox="0 0 24 24"
				className="w-6 h-6">
				<path
					fillRule="evenodd"
					d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
					clipRule="evenodd"
				/>
			</svg>
		),
		title: "Secure and Private",
		desc: "Your privacy matters. WellTalk ensures secure and private conversations, so you can share openly and confidently.",
	},
	{
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="#F9FFFF"
				viewBox="0 0 24 24"
				className="w-6 h-6">
				<path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
			</svg>
		),
		title: "Accessible Support",
		desc: "Get support anytime, anywhere. WellTalk offers accessible counseling services tailored to your needs, promoting well-being on your terms.",
	},
	{
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="#F9FFFF"
				viewBox="0 0 24 24"
				className="w-6 h-6">
				<path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
				<path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
			</svg>
		),
		title: "Personalized Journaling",
		desc: "Reflect and track your journey with WellTalk's personalized journaling feature. Capture your thoughts, progress, and insights in a secure and private space.",
	},
];

const Features = () => {
	return (
		<section className="w-11/12 md:w-8/12 lg:w-8/12 relative py-16 md:py-28 lg:py-24 container mx-auto items-center ">
			<div className="relative z-10 max-w-screen-xl mx-auto px-4 text-gray-300 lg:flex md:flex gap-24 container mx-auto items-center">
				<div className="lg:w-2/5">
					<ScrollAnimationWrapper animationType="default">
						<h3 className="font-Merriweather text-gray-700 text-3xl font-semibold sm:text-4xl">
							Empower Your Conversations with WellTalk
						</h3>
						<p className="font-Jaldi text-gray-700 mt-4">
							Seamlessly connect with counselors and peers.
							Whether you're seeking guidance, support, or simply
							a listening ear, WellTalk fosters meaningful
							conversations that promote well-being and personal
							growth.
						</p>
					</ScrollAnimationWrapper>
				</div>
				<div className="md:w-4/5 lg:w-4/5 mt-12 lg:mt-0">
					<ul className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
						{features.map((item, idx) => (
							<ScrollAnimationWrapper
								animationType="default"
								key={idx}>
								<div className="flex items-start space-x-4">
									{/* Icon Section */}
									<div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border border-black bg-maroon">
										{item.icon}
									</div>

									{/* Title and Description Section */}
									<div className="flex-grow">
										<h4 className="font-Merriweather text-gray-700 text-lg font-medium">
											{item.title}
										</h4>
										<p className="mt-2 font-Jaldi text-gray-700 text-base">
											{item.desc}
										</p>
									</div>
								</div>
							</ScrollAnimationWrapper>
						))}
					</ul>
				</div>
			</div>
			<div
				className={`mt-12 mb-4 max-w-4xl mx-6 md:mx-auto lg:mx-auto border-2 rounded-xl md:${styles.floating} lg:${styles.floating} relative`}>
				<div className="gallery fixed-size border-gray-400 rounded-xl bg-gray-100 shadow-lg">
					<div className="window-bar border-b-2 text-gray px-4 py-4 flex justify-between items-center rounded-t-xl">
						<div className="window-title font-bold"></div>
						<div className="window-controls flex space-x-2">
							<div className="w-4 h-4 border-2 bg-yellow-400 rounded-full"></div>
							<div className="w-4 h-4 border-2 bg-green-400 rounded-full"></div>
							<div className="w-4 h-4 border-2 bg-red-400 rounded-full"></div>
						</div>
					</div>

					<div className="bg-gold rounded-xl h-auto">
						<div className="bg-gold text-left pt-6 md:pt-4 lg:pt-4">
							<h2 className="font-Merriweather text-gray-700 text-2xl md:text-4xl lg:text-4xl p-4 text-left ml-2 md:ml-4 lg:ml-4 font-semibold text-gray-800">
								Guiding You Forward:<br></br> Our{" "}
								<span className="text-maroon">Mission</span> and{" "}
								<span className="text-maroon">Services</span>
							</h2>
						</div>

						<div className="bg-gold rounded-b-xl p-4 md:px-8 md:pb-8 lg:px-8 lg:pb-8">
							<div
								className="relative aspect-w-18"
								style={{ paddingBottom: "56.25%", height: 0 }}>
								<video
									controls
									autoPlay
									loop
									preload="auto"
									style={{
										position: "absolute",
										top: 0,
										left: 0,
										width: "100%",
										height: "100%",
										borderRadius: "10px",
									}}>
									<source
										src="/images/vid.mp4"
										type="video/mp4"
									/>
									Your browser does not support the video tag.
								</video>
							</div>
							<p className="mt-6 text-lg md:text-xl lg:text-xl text-gray-600 text-justify text-center font-Jaldi">
								The CIT University Guidance Center aims for the
								holistic development of our dear Technologians.
								The office is committed to promulgating services
								in shaping students to reach their full
								potential. With that in mind, check out our
								Mission, Vision, and Guidance services that you
								can avail!
							</p>
						</div>
					</div>
				</div>
				<img
					src="/images/cursor.png"
					alt="Cursor"
					className="absolute hidden lg:block bottom-24 -right-32 w-40 h-40"
				/>
			</div>
		</section>
	);
};

export default Features;
