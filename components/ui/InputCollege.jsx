import React from "react";
import SelectInput from "./SelectInput";

const InputCollege = ({ college, setCollege }) => {
	const handleCollegeChange = (e) => {
		setCollege(e.target.value);
	};

	const collegeOptions = [
		{ value: "", label: "" },
		{ value: "CEA", label: "College of Engineering and Architecture" },
		{
			value: "CMBA",
			label: "College of Management, Business, & Accountancy",
		},
		{ value: "CASE", label: "College of Arts and Sciences Education" },
		{
			value: "CNAHS",
			label: "College of Nursing and Allied Health Sciences",
		},
		{ value: "CCS", label: "College of Computer Studies" },

		{ value: "CCJ", label: "College of Criminal Justice" },
	];

	return (
		<div className="w-full">
			<SelectInput
				label="College"
				value={college}
				onChange={handleCollegeChange}
				options={collegeOptions}
			/>
		</div>
	);
};

export default InputCollege;
