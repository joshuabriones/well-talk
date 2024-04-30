import React from "react";
import TextInput from "@/components/ui/inputs/TextInput";
import SelectInput from "./SelectInput";

const InputName = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  gender,
  setGender,
  readOnly = false,
}) => {
  return (
    <>
      <div className="w-5/12">
        <TextInput
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          readOnly={readOnly}
        />
      </div>
      <div className="w-5/12">
        <TextInput
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          readOnly={readOnly}
        />
      </div>
      <div className="w-2/12">
        <TextInput
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          type="text"
          placeholder="male or female"
          readOnly={readOnly}
        />
      </div>
    </>
  );
};

export default InputName;
