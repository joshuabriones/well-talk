"use client";

import TextInput from "@/components/ui/inputs/TextInput";
import { useState } from "react";
import FullButton from "@/components/ui/buttons/FullButton";
import HollowButton from "@/components/ui/buttons/HollowButton";
import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";

const AddStudent = ({ setOpenAddStudent }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");

  const handleClose = () => {
    setOpenAddStudent(false);
  };
  const handleSubmit = async (e) => {
    const confirmed = window.confirm(
      "Are you sure you want to add this student?"
    );
    if (!confirmed) {
      return; // Don't proceed if the user cancels
    }

    e.preventDefault();

    // TO BE UPDATED WITH THE CORRECT API ENDPOINT
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.REGISTER_STUDENT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            idNumber,
            institutionalEmail: email,
            firstName: firstName,
            lastName: lastName,
            role: "student",
            image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
            password: "12345678",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create student");
      }

      handleClose();
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error creating student:", error.message);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="my_modal_7"
        className="modal-toggle"
        checked={true}
      />
      <div className="modal border-slate-100 border-2" role="dialog">
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
              Add Student
            </h3>
            <p className="text-lg font-Jaldi">
              Please fill in the details of the student you want to create an
              account with.
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  label="Email"
                  type="text"
                  id="email"
                />
              </div>

              {/* Submit */}
              <div className="mt-3 px-16 h-12 flex flex-row gap-x-6">
                <HollowButton onClick={handleClose}>Cancel</HollowButton>
                <FullButton type="submit" onClick={handleSubmit}>
                  Add Student
                </FullButton>
              </div>
            </div>
          </form>
        </div>

        <label
          className="modal-backdrop"
          htmlFor="my_modal_7"
          onClick={() => setOpenAddStudent(false)}
        >
          Close
        </label>
      </div>
    </>
  );
};

export default AddStudent;
