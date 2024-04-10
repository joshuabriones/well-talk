import React from "react";

const SelectInput = ({ label, value, onChange, options }) => {
	return (
		<div className="select-wrapper">
			<div className="py-2.5">{label}</div>
			<select
				className="h-14 w-full px-4 py-2 border border-gray-200 drop-shadow-md focus:outline-none focus:border-green-500 bg-white rounded-lg"
				value={value}
				onChange={onChange}
				required
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectInput;
