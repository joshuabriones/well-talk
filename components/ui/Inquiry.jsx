const Inquiry = () => {
	return (
		<section
			id="cta"
			className="bg-gray-50">
			<div className="container mx-auto xl:px-60 py-40 px-5">
				<div className="lg:grid grid-cols-3 gap-6">
					<div className="grid grid-cols-subgrid col-span-2">
						<div className="col-span-2">
							<h2 className="font-Merriweather text-6xl">
								Need to ask <br />
								Something?
							</h2>
							<p className="pt-5 font-Jaldi text-lg">
								Have a Question or Concern? Our Supportive Team
								is Here to Listen, <br />
								Offer Guidance, and Provide the Help You Need.
								Don’t Hesitate To Ask.
							</p>
						</div>
					</div>
					<div className="mt-6 lg:hidden">
						<div className="grid grid-cols-1 gap-2">
							<label className="block">
								<input
									type="text"
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-300 focus:ring-opacity-50"
									placeholder="Your Name"
								/>
							</label>
							<label className="block">
								<textarea
									className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-300 focus:ring-opacity-50"
									placeholder="Your Message"></textarea>
							</label>
							<button
								className="rounded-md text-white uppercase p-3 w-full"
								type="button"
								style={{ backgroundColor: "#6B9080" }}>
								Subscribe Now
							</button>
						</div>
					</div>
					<div className="mt-6 hidden lg:block">
						<div className="grid grid-cols-1 gap-2">
							<label className="block">
								<input
									type="text"
									className="mt-1 block w-full lg:w-96 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-300 focus:ring-opacity-50"
									placeholder="Your Name"
								/>
							</label>
							<label className="block">
								<textarea
									rows={5}
									cols={50}
									className="mt-1 block w-full lg:w-96 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-300 focus:ring-opacity-50"
									placeholder="Your Message"></textarea>
							</label>

							<button
								className="rounded-md text-white uppercase p-3 w-full lg:w-96"
								type="button"
								style={{ backgroundColor: "#6B9080" }}>
								Subscribe
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Inquiry;
