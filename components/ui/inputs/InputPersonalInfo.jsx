import React from "react";
import TextInput from "@/components/ui/inputs/TextInput";

const InputPersonalInfo = ({
	birthdate,
	setBirthdate,
	contactNumber,
	setContactNumber,
	address,
	setAddress,
}) => {
	return (
		<>
			<div className="w-3/12">
				<TextInput
					label="Birthdate"
					value={birthdate}
					onChange={(e) => setBirthdate(e.target.value)}
					type="date"
				/>
			</div>
			<div className="w-3/12">
				<TextInput
					label="Contact Number"
					value={contactNumber}
					onChange={(e) => setContactNumber(e.target.value)}
					type="number"
				/>
			</div>
			<div className="w-6/12">
				<TextInput
					label="Address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					type="text"
				/>
			</div>
		</>
	);
};

export default InputPersonalInfo;
