"use client";

import { Navbar } from "@/components/ui/Navbar";

export default function Chat() {
	const counselors = [
		{
			name: "Kathryn Melissa M. Villar",
			program: "BS Architecture Counselor",
			lastmsg: "Hello there! I've been assigned to take care of y...",
			img: "https://thispersondoesnotexist.com",
		},
		{
			name: "Gilda A. Yap",
			program: "CNAHS Counselor",
			lastmsg: "Good morning! How can I help you today? I miss t...",
			img: "https://picsum.photos/200",
		},
		{
			name: "Jennylyn M. Pascua",
			program: "BSME, BSEM Counselor",
			lastmsg: "Good afternoon! Today was a great start for me. I...",
			img: "https://avatar.iran.liara.run/public",
		},
		{
			name: "Kim Anthony Macasero",
			program: "BSIT Counselor",
			lastmsg: "Good evening! I have always admired your intelli...",
			img: "https://loremflickr.com/1280/720",
		},
		{
			name: "Lorena M. Pascua",
			program: "BSA Counselor",
			lastmsg: "Good evening! Twenty-eight days have passed sinc...",
			img: "https://placebeard.it/1280x720",
		},
		{
			name: "Marie Grace M. Villar",
			program: "BSA Counselor",
			lastmsg: "Good evening! The rows of papers have piled up a...",
			img: "https://placebear.com/1280/720",
		},
		{
			name: "Kathryn Melissa M. Villar",
			program: "BS Architecture Counselor",
			lastmsg: "Hello there! I've been assigned to tale care of...",
			img: "https://placecage.lucidinternets.com/200/300",
		},
		{
			name: "Gilda A. Yap",
			program: "CNAHS Counselor",
			lastmsg: "Good morning! How can I help you today? I miss ...",
			img: "https://placecage.lucidinternets.com/g/200/300",
		},
		{
			name: "Jennylyn M. Pascua",
			program: "BSME, BSEM Counselor",
			lastmsg: "Good afternoon! Today was a great start for me...",
			img: "https://avatar.iran.liara.run/public",
		},
		{
			name: "Kim Anthony Macasero",
			program: "BSIT Counselor",
			lastmsg: "Good evening! I have always admired your intell...",
			img: "https://loremflickr.com/1280/720",
		},
		{
			name: "Lorena M. Pascua",
			program: "BSA Counselor",
			lastmsg: "Good evening! Twenty-eight rows of carrots have...",
			img: "https://placebeard.it/1280x720",
		},
		{
			name: "Marie Grace M. Villar",
			program: "BSA Counselor",
			lastmsg: "Good evening! The rows of carrots have piled up and...",
			img: "https://placebear.com/1280/720",
		},
	];

	const messages = [{}];

	return (
		<div className="min-h-screen  ">
			{/* bg-slate-50 */}
			<Navbar userType="student" />
			<section className="h-screen flex flex-row items-center justify-center pt-[90px] pb-10 px-28 gap-x-4">
				{/* Chat List */}
				<section className="w-1/3 h-full px-7 py-6 flex flex-col gap-y-3 rounded-lg border bg-white">
					<div className="flex flex-row justify-between">
						<h1 className="text-xl font-Merriweather font-bold ">Chats</h1>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-5 hover:scale-125"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
							/>
						</svg>
					</div>

					<div className="w-full h-10 bg-gray-100 flex flex-row items-center px-4 rounded-3xl">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6 text-gray-400"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>
						<form action="" className="w-full">
							<input
								type="text"
								placeholder="Search"
								className="w-full h-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:font-Jaldi font-Jaldi"
							/>
						</form>
					</div>

					<div className="w-full flex-grow overflow-scroll">
						{counselors.map((counselor, index) => (
							<div
								key={index}
								className="w-full h-24 px-4 flex flex-row items-center gap-x-1.5 hover:bg-gray-100 rounded-lg"
							>
								<div>
									<img
										src={counselor.img}
										alt="randomperson"
										className="rounded-full h-[65px] w-[65px] mx-3"
									/>
								</div>
								<div>
									<h1 className="text-lg font-semibold">{counselor.name}</h1>
									<p className="text-sm text-gray-400">{counselor.lastmsg}</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Chat */}
				<section className="w-2/3 h-full flex flex-col justify-between px-3 pb-3 rounded-lg border bg-white">
					<div className="w-full h-16 px-3 border-b shadow-sm flex items-center gap-x-3">
						<div>
							<img
								src="https://thispersondoesnotexist.com"
								alt="randomperson"
								className="rounded-full h-10 w-10"
							/>
						</div>
						<h1 className="font-semibold text-lg">Kathryn Melissa M. Villar</h1>
					</div>

					<div className="px-3 pt-3 pb-4 flex-grow flex flex-col gap-y-6 justify-end overflow-auto">
						{/* Counselor */}
						<div className="w-full min-h-9 h-fit flex flex-row items-center gap-x-3 pr-60">
							<div>
								<img
									src="https://thispersondoesnotexist.com"
									alt="randomperson"
									className="rounded-full h-9 w-9"
								/>
							</div>
							<div className="bg-emerald-200 min-h-9 h-fit rounded-tl-2xl rounded-tr-2xl rounded-br-2xl px-5 mb-1 flex items-center justify-start">
								asdasdsadjaskdjamslkdamsdasdashbdjklskdnjfsla;dmnkdslm;adkfndsm;ldknfbd;lsdnkvdsl;fbf
							</div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-5 text-white hover:text-black hover:cursor-pointer"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
						</div>

						{/* Student */}
						<div className="w-full min-h-9 h-fit flex flex-row justify-end items-center gap-x-3 pl-60">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-5 text-white hover:text-black hover:cursor-pointer"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
							<div className="bg-emerald-200 min-h-9 h-fit rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl px-5 flex items-center justify-start">
								asdasdsadjaskdjamslkdamsdasdashbdjklskdnjfsla;dmnkdslm;adkfndsm;ldknfbd;lsdnkvdsl;fbf
							</div>
							<div>
								<img
									src="https://placebeard.it/1280x720"
									alt="randomperson"
									className="rounded-full h-9 w-9"
								/>
							</div>
						</div>
					</div>

					<div className="relative w-full h-10 bg-gray-100 flex items-center px-4 rounded-2xl">
						<form action="" className="w-full">
							<input
								type="text"
								placeholder="Type your message here"
								className="w-full h-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:font-Jaldi font-Jaldi"
							/>
						</form>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="absolute right-4 h-6 w-6 text-gray-500 hover:text-black grayscale hover:grayscale-0 cursor-pointer"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
							/>
						</svg>
					</div>
				</section>
			</section>
		</div>
	);
}
