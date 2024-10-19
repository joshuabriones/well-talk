export default function Header(props) {
	return (
		<div className="w-full h-[55vh] relative">
			{/* Background image */}
			<div
				className="absolute inset-0 bg-cover bg-center opacity-40"
				style={{
					backgroundImage: `url(${props.image})`,
				}}
			></div>

			{/* Content */}
			<div className="relative z-10 flex justify-start items-center h-full">
				<div className="flex flex-col text-left px-6 md:px-12 lg:px-24 xl:px-44 py-10 gap-y-4">
					<h1 className="font-Merriweather text-4xl md:text-5xl lg:text-6xl xl:text-8xl">Referrals</h1>
					<p className="w-full md:w-1/2 font-Jaldi text-lg md:text-xl">{props.desc}</p>
				</div>
			</div>
		</div>
	);
}
