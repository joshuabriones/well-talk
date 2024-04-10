"use client";
import { useEffect, useState } from "react";
const LandingSlider = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const frames = [
		{
			title: "Dr. Olivia Parker",
			imageUrl:
				"https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			description:
				"Dr. Parker's expertise in family therapy and relational dynamics fosters healthy communication, emotional growth, and stronger relationships, helping individuals and families navigate challenges and build resilience.",
		},
		{
			title: "Dr. Emily Watson ",
			imageUrl:
				"https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
			description:
				"Dr. Watson specializes in trauma-informed care and psychotherapy, offering a nurturing environment for clients to explore emotions, develop resilience, and foster positive mental health.",
		},
		{
			title: "Dr. Joshua Evans ",
			imageUrl:
				"https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
			description:
				"With expertise in cognitive-behavioral therapy and mindfulness practices, Dr. Carter helps individuals navigate anxiety, trauma, and life transitions with personalized strategies for holistic well-being.",
		},
		{
			title: "Dr. Benjamin Carter",
			imageUrl:
				"https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHByb2Zlc3Npb25hbHxlbnwwfHwwfHx8MA%3D%3D",
			description:
				"Dr. Evans is dedicated to addiction recovery, providing evidence-based interventions, motivational support, and relapse prevention strategies to empower individuals on their journey to sobriety and wellness.",
		},
	];

	const handlePrev = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? frames.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === frames.length - 1 ? 0 : prevIndex + 1
		);
	};

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.keyCode === 37) handlePrev();
			if (e.keyCode === 39) handleNext();
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<div>
			<div
				className="gallery border-2 rounded mx-auto m-5 bg-white"
				style={{ height: "60vh", maxWidth: "900px" }}>
				<div className="top flex p-2 border-b select-none ">
					<div className="buttons ml-6 text-gray-600 mr-1 bg-gray-200 rounded-md">
						<svg
							onClick={handlePrev}
							className="w-7 border-2 rounded-l-lg p-1 cursor-pointer"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
					</div>
					<div className="buttons ml-auto mr-6 flex text-gray-600 mr-1 bg-gray-200 rounded-md">
						<svg
							onClick={handleNext}
							className="w-7 border-2 rounded-r-lg p-1 cursor-pointer"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</div>
				</div>
				<div className="content-area overflow-hidden flex">
					<div className="image-container w-1/2 mr-6">
						<img
							className={`w-full h-full object-cover slide-animation-${currentIndex}`}
							src={frames[currentIndex].imageUrl}
							alt={frames.title}
						/>
					</div>
					<div className="description-container w-1/2 mt-32 relative">
						<div className="head text-2xl font-bold mb-6 font-Merriweather">
							{frames[currentIndex].title}
						</div>
						<div className="long-text text-lg mr-6">
							{frames[currentIndex].description}
						</div>
						<button className="absolute bottom-0 right-0 inline-flex items-center px-4 py-2 mx-8 my-16 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md">
							View Profile
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LandingSlider;
