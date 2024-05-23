const Events = ({ events }) => {
	return (
		<section className="bg-white w-1/2 h-full p-10 flex flex-col border-gray-400 border-t border-b border-r">
			<div className="">
				<h1 className="mt-5 text-6xl font-Merriweather font-thin">Upcoming Events</h1>
				<div className="border-gray-200 border-t-2 mt-10" />
			</div>

			<div className="overflow-y-auto">
				{events?.map((event) => (
					<div
						className=" flex flex-col gap-y-2.5 py-6 px-10 hover:bg-gray-200 hover:cursor-pointer"
						onClick={() => setTest(true)}
					>
						<div>
							<h1 className="font-Merriweather text-xl font-semibold">
								{event.name}
							</h1>
							<h2 className="font-Jaldi text-xl text-[#425466]">{event.date}</h2>
						</div>
						<div
							className={`px-5 py-1 w-fit rounded-lg text-white font-Jaldi font-semibold  ${
								event.tag === "Event" ? "bg-[#6B9080]" : ""
							}`}
						>
							{event.tag}
						</div>
						<p className="font-Jaldi text-xl text-[#425466]">
							{event.additional_notes}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default Events;
