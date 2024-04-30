"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/ui/Navbar";
import InputName from "@/components/ui/inputs/InputName";
import TextInput from "@/components/ui/inputs/TextInput";
import UpdateProfile from "@/components/ui/modals/counselor/updateProfile/UpdateProfile"; // Corrected import

export default function Profile() {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();

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
                <img src={session?.user.image} />
              </div>
            </div>
            <div className="ml-16 my-4">
              <h1 className="font-Merriweather text-4xl font-thin tracking-tight">
                Hello, {session?.user.name}
              </h1>
              <p className="font-Merriweather tracking-tight font-thin my-2">
                {session?.user.email}
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
                <InputName
                  firstName={session?.user.name.split(" ")[0]}
                  lastName={session?.user.name.split(" ")[1]}
                  gender={session?.user.gender}
                  readOnly={true}
                />
              </div>
              <div className="w-full flex flex-row gap-x-6">
                <div className="w-full">
                  <TextInput
                    label="ID Number"
                    type="text"
                    value={session?.user.idNumber}
                  />
                </div>
                <div className="w-full">
                  <TextInput
                    label="Password"
                    type="password"
                    value={session?.user.password}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
