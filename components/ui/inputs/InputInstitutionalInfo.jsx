import React from "react";
import TextInput from "@/components/ui/inputs/TextInput";

const InputInstitutionalInfo = ({ email, setEmail, idno, setIdNo }) => {
  return (
    <>
      <div className="w-1/2">
        <TextInput
          label="Institutional Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
      </div>
      <div className="w-1/2">
        <TextInput
          label="ID Number"
          value={idno}
          onChange={(e) => setIdNo(e.target.value)}
          type="text"
          required
        />
      </div>
    </>
  );
};

export default InputInstitutionalInfo;
