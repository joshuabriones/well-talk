// InputCollegeInformation.jsx

import React from "react";
import TextInput from "@/components/ui/TextInput";

const InputCollegeInformation = ({
	college,
	setCollege,
	program,
	setProgram,
	year,
	setYear,
}) => {
	return (
		<>
			<div className="w-5/12">
				<TextInput
					label="College"
					value={college}
					onChange={(e) => setCollege(e.target.value)}
					type="email"
				/>
			</div>
			<div className="w-5/12">
				<TextInput
					label="Program"
					value={program}
					onChange={(e) => setProgram(e.target.value)}
					type="text"
				/>
			</div>
			<div className="w-2/12">
				<TextInput
					label="Year"
					value={year}
					onChange={(e) => setYear(e.target.value)}
					type="number"
				/>
			</div>
		</>
	);
};

export default InputCollegeInformation;
