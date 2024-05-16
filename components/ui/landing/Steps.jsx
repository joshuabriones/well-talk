export const Content = () => {
	return (
		<div
			style={{ backgroundColor: "#1F2724" }}
			className="mb-12">
			<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
				<div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
					{/* <div>
					<p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
						Brand new
					</p>
				</div> */}
					<h3 className="max-w-lg mb-6 font-Merriweather text-3xl font-semibold sm:text-4xl leading-none tracking-tight text-white md:mx-auto">
						<span className="relative inline-block">
							<svg
								viewBox="0 0 52 24"
								fill="#F9FFFF"
								className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
								<defs>
									<pattern
										id="3071a3ad-db4a-4cbe-ac9a-47850b69e4b7"
										x="0"
										y="0"
										width=".135"
										height=".30">
										<circle
											cx="1"
											cy="1"
											r=".7"
										/>
									</pattern>
								</defs>
								<rect
									fill="url(#3071a3ad-db4a-4cbe-ac9a-47850b69e4b7)"
									width="52"
									height="24"
								/>
							</svg>
							<span className="relative">
								Streamlined Appointment Booking Process
							</span>
						</span>
					</h3>
					<p className="text-base text-white font-Jaldi md:text-lg">
						Our simplified process ensures you can easily book
						appointments with our counselors. Follow these steps to
						get started on your journey towards better mental health
						and well-being.
					</p>
				</div>
				<div className="grid max-w-screen-lg gap-8 lg:grid-cols-2 sm:mx-auto">
					<div className="flex flex-col justify-center">
						<div className="flex">
							<div className="mr-4">
								<div
									className="flex items-center justify-center w-10 h-10 mb-3 rounded-full"
									style={{ backgroundColor: "#6B9080" }}>
									<svg
										className="w-8 h-8"
										stroke="#F9FFFF"
										fill="#6B9080"
										viewBox="0 0 52 52">
										<polygon
											strokeWidth="3"
											strokeLinecap="round"
											strokeLinejoin="round"
											fill="none"
											points="29 13 14 29 25 29 23 39 38 23 27 23"
										/>
									</svg>
								</div>
							</div>
							<div>
								<h6 className="mb-2 font-semibold font-Merriweather text-white  leading-5">
									Step 1: Enter Appointment Details
								</h6>
								<p className="text-sm text-white font-Jaldi">
									Start by entering the purpose of your
									appointment and any additional notes you
									want to include.
								</p>
								<hr className="w-full my-6 border-gray-300" />
							</div>
						</div>
						<div className="flex">
							<div className="mr-4">
								<div
									className="flex items-center justify-center w-10 h-10 mb-3 rounded-full"
									style={{ backgroundColor: "#6B9080" }}>
									<svg
										className="w-8 h-8 text-deep-purple-accent-400"
										stroke="#F9FFFF"
										viewBox="0 0 52 52">
										<polygon
											strokeWidth="3"
											strokeLinecap="round"
											strokeLinejoin="round"
											fill="none"
											points="29 13 14 29 25 29 23 39 38 23 27 23"
										/>
									</svg>
								</div>
							</div>
							<div>
								<h6 className="mb-2 font-semibold font-Merriweather text-white leading-5">
									Step 2: Select Date and Time
								</h6>
								<p className="text-sm text-white font-Jaldi">
									Choose a date and time for your appointment.
									Available slots are from <b>8 am to 5 pm</b>
									. Unavailable slots will be grayed out.
								</p>
								<hr className="w-full my-6 border-gray-300" />
							</div>
						</div>
						<div className="flex">
							<div className="mr-4">
								<div
									className="flex items-center justify-center w-10 h-10 mb-3 rounded-full"
									style={{ backgroundColor: "#6B9080" }}>
									<svg
										className="w-8 h-8 text-deep-purple-accent-400"
										stroke="#F9FFFF"
										viewBox="0 0 52 52">
										<polygon
											strokeWidth="3"
											strokeLinecap="round"
											strokeLinejoin="round"
											fill="none"
											points="29 13 14 29 25 29 23 39 38 23 27 23"
										/>
									</svg>
								</div>
							</div>
							<div>
								<h6 className="mb-2 font-semibold font-Merriweather text-white leading-5">
									Step 3: Confirm Your Appointment
								</h6>
								<p className="text-sm text-white font-Jaldi">
									Confirm your schedule appointment. Note that
									counselors will be assigned based on
									availability; you cannot choose a specific
									counselor.
								</p>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-center -mx-4 lg:pl-8">
						<div className="flex flex-col items-end px-3">
							<img
								className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
								src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXBwb2ludG1lbnR8ZW58MHx8MHx8fDA%3D"
								alt=""
							/>
							<img
								className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
								src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFwcG9pbnRtZW50fGVufDB8fDB8fHww"
								alt=""
							/>
						</div>
						<div className="px-3">
							<img
								className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
								src="https://plus.unsplash.com/premium_photo-1665990294004-90bf3599ead2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y291bnNlbGxpbmd8ZW58MHx8MHx8fDA%3D"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
