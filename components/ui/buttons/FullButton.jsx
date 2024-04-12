import React from "react";

const FullButton = ({ children, onClick }) => {
	return (
		<button
			className="w-full bg-black border-2 font-Merriweather border-black text-base text-white font-semibold rounded-3xl px-4 py-3 hover:scale-95 transition-transform duration-300"
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default FullButton;
