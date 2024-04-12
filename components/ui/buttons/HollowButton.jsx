import React from "react";

const HollowButton = ({ children, onClick }) => {
	return (
		<button
			className="w-full bg-white border-2 border-black text-base font-Merriweather text-black font-semibold rounded-3xl px-4 py-3 hover:scale-95 transition-transform duration-300"
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default HollowButton;
