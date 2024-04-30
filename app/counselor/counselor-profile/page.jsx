"use client";
import React, { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import InputName from "@/components/ui/inputs/InputName";
import TextInput from "@/components/ui/inputs/TextInput";
import UpdateProfile from "@/components/ui/modals/counselor/updateProfile/UpdateProfile"; // Corrected import

export default function Profile() {
  const [showModal, setShowModal] = useState(false);

  const handleUpdateProfile = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <main>
        <Navbar userType="counselor" />
        <div className="mx-60 mt-24">
          <div className="flex justify-end">
            <button className="btn w-32 h-12 text-sm rounded-full bg-[#222222] font-Merriweather text-white">
              Log out
            </button>
          </div>
          {/* top part */}
          <div className="flex mt-8">
            <div className="avatar flex">
              <div className="w-40 rounded-full ring ring-[#6B9080] ring-offset-base-100 ring-offset-2">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="ml-16 my-4">
              <h1 className="font-Merriweather text-4xl font-thin tracking-tight">
                Hello, Gwen Stef
              </h1>
              <p className="font-Merriweather tracking-tight font-thin my-2">
                gwen.stef@cit.edu
              </p>
              <button
                className="btn w-44 text-sm rounded-full bg-[#222222] font-Merriweather text-white"
                onClick={handleUpdateProfile}
              >
                Update Profile
              </button>
              {/* Render the modal conditionally */}
              {showModal && <UpdateProfile onClose={handleCloseModal} />}
            </div>
          </div>
          {/* ubos */}
          <div>
            <div className="flex flex-col gap-y-2.5 my-16 py-4">
              <div className="w-full flex flex-row gap-x-6">
                <InputName />
              </div>
              <div className="w-full flex flex-row gap-x-6">
                <div className="w-full">
                  <TextInput label="ID Number" type="text" />
                </div>
                <div className="w-full">
                  <TextInput label="Password" type="password" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
