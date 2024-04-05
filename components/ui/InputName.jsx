import React from "react";
import TextInput from "@/components/ui/TextInput";

const InputName = ({
	firstName,
	setFirstName,
	lastName,
	setLastName,
	middleInitial,
	setMiddleInitial,
}) => {
	return (
		<>
			<div className="w-5/12">
				<TextInput
					label="First Name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					type="text"
				/>
			</div>
			<div className="w-5/12">
				<TextInput
					label="Last Name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					type="text"
				/>
			</div>
			<div className="w-2/12">
				<TextInput
					label="M.I."
					value={middleInitial}
					onChange={(e) => setMiddleInitial(e.target.value)}
					type="text"
				/>
			</div>
		</>
	);
};

export default InputName;
