import React from "react";

const SelectInput = ({ label, options, value, onChange, placeholder }) => {
	return (
	  <div className="flex flex-col w-full">
		<label
		  htmlFor="dropdown"
		  className="relative block rounded-md bg-white border border-gray-400 p-1 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black w-full"
		>
		  <select
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className="peer border-none bg-white placeholder-white focus:border-gray-800 focus:outline-none focus:ring-0 rounded-md w-full"
			required
		  >
			<option value="" className="text-gray-300">
			  {placeholder}
			</option>
			{options.map((option) => (
			  <option key={option.value} value={option.value}>
				{option.label}
			  </option>
			))}
		  </select>
		  <span className="pointer-events-none absolute start-2.5 bg-white top-0 -translate-y-1/2 p-1 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
			{label}
		  </span>
		</label>
	  </div>
	);
  };
  

export default SelectInput;
