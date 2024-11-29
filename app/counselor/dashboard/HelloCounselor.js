const HelloCounselor = ({ counselor }) => {
	return (
		<div className="w-2/4 flex flex-col justify-center items-start font-Merriweather text-2xl">
			<div className="h-fit flex flex-row">
				<p>Hello&nbsp;</p>
				<div className="text-[#6B9080]">
					{counselor?.firstName} {counselor?.lastName}
					{"!"}
				</div>
			</div>
			<div className="h-fit mt-1 text-sm text-zinc-500">
				<div>Guidance Counselor of Cebu Institute of Technology - University</div>
			</div>
		</div>
	);
};

export default HelloCounselor;
