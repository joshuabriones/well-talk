import React from "react";

import SelectInput from "./SelectInput";

const InputRole = ({ role, setRole, handleRoleChange }) => {
	return (
		<SelectInput
			label="Role"
			value={role}
			onChange={(e) => {
				setRole(e.target.value);
				handleRoleChange(e);
			}}
			options={[
				{ value: "", label: "" },
				{ value: "student", label: "Student" },
				{ value: "teacher", label: "Teacher" },
				{ value: "counselor", label: "Counselor" },
			]}
		/>
	);
};

export default InputRole;
