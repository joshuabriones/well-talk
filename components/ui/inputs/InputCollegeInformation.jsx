import React, { useState } from "react";
import SelectInput from "./SelectInput";
import TextInput from "@/components/ui/inputs/TextInput";
import InputCollege from "./InputCollege";

const InputCollegeInformation = ({
	college,
	setCollege,
	program,
	setProgram,
	year,
	setYear,
}) => {
	const programOptions = {
		CCS: [
			{ value: "", label: "" },
			{ value: "computerScience", label: "Computer Science" },
			{ value: "informationTechnology", label: "Information Technology" },
		],
		CEA: [
			{ value: "", label: "" },
			{ value: "architecture", label: "Architecture" },
			{ value: "civilEngineering", label: "Civil Engineering" },
			{ value: "electricalEngineering", label: "Electrical Engineering" },
			{
				value: "electronicsEngineering",
				label: "Electronics Engineering",
			},
			{ value: "industrialEngineering", label: "Industrial Engineering" },
			{ value: "mechanicalEngineering", label: "Mechanical Engineering" },
		],
		CCJ: [
			{ value: "", label: "" },
			{ value: "criminology", label: "Criminology" },
		],
	};

	return (
		<>
			<div className="w-6/12">
				<InputCollege college={college} setCollege={setCollege} />
			</div>
			<div className="w-4/12">
				<SelectInput
					label="Program"
					value={program}
					onChange={(e) => setProgram(e.target.value)}
					options={programOptions[college] || []}
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
