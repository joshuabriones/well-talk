import React from "react";

const TextInput = ({ label, value, onChange, type }) => {
	return (
		<div>
			<div className="py-2.5 text-xl font-Jaldi ">{label}</div>
			<input
				className="h-14 w-full text-lg font-Jaldi px-4 py-2 border border-gray-200 drop-shadow-md focus:outline-none focus:border-green-500  bg-white rounded-lg"
				type={type}
				value={value}
				onChange={onChange}
				required
			/>
		</div>
	);
};

export default TextInput;
