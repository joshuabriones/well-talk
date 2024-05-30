import TextInput from "@/components/ui/inputs/TextInput";
import { useState } from "react";
import FullButton from "../../buttons/FullButton";
import HollowButton from "../../buttons/HollowButton";

const AddReferral = ({ onOpen }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      idNumber,
      reason,
    });
  };

  const handleClose = () => {
    onOpen(false);
  };

  return (
    <>
      <input
        type="checkbox"
        id="my_modal_7"
        className="modal-toggle"
        checked={true}
      />
      <div className="modal" role="dialog">
        <div
          className="modal-box p-12 px-16 flex flex-col overflow-auto justify-center"
          style={{
            // minHeight: "60vh",
            minWidth: "35vw",
          }}
        >
          {/* Heading */}
          <section>
            <h3 className="text-2xl font-bold font-Merriweather">
              Add Referral
            </h3>
            <p className="text-lg font-Jaldi">
              You can refer a student to a counselor by submitting this form.
            </p>
          </section>

          <form action="" onSubmit={handleSubmit}>
            <div className="pt-5 flex flex-col gap-y-4">
              <div className="flex flex-row gap-x-4">
                <TextInput
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  label="First Name"
                  type="text"
                  id="firstName"
                />
                <TextInput
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  label="Last Name"
                  type="text"
                  id="lastName"
                />
              </div>
              <div className="">
                <TextInput
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="ID Number"
                  label="ID Number"
                  type="text"
                  id="idNumber"
                />
              </div>
              <div className="">
                <TextInput
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason"
                  label="Reason"
                  type="text"
                  id="reason"
                />
              </div>

              {/* Submit */}
              <div className="mt-3 px-16 h-12 flex flex-row gap-x-6">
                <HollowButton onClick={handleClose}>Cancel</HollowButton>
                <FullButton type="submit">Refer Student</FullButton>
              </div>
            </div>
          </form>
        </div>

        <label
          className="modal-backdrop"
          htmlFor="my_modal_7"
          onClick={() => onOpen(false)}
        >
          Close
        </label>
      </div>
    </>
  );
};

export default AddReferral;