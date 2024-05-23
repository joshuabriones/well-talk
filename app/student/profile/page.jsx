"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Navbar } from "@/components/ui/Navbar";
import FullButton from "@/components/ui/buttons/FullButton";

import UpdateProfileModal from "@/components/ui/modals/student/UpdateProfileModal";
import Birthdate from "@/components/ui/student/Birthdate";
import TextDisplay from "@/components/ui/student/TextDisplay";

export default function StudentProfile() {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const [studentProfile, setStudentProfile] = useState(null);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const response = await fetch(
          "/api/users/viewuser/view-student-via-id?studentId=" +
            session?.user.id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setStudentProfile(data.student);
      } catch (error) {
        console.log("Error fetching student profile");
      }
    };

    fetchStudentProfile();
  }, []);

  const formatTime = (time) => {
    return new Date(time).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleUpdateProfile = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <section>
        <Navbar userType="student" />
      </section>

      <section className="mt-20 px-72 py-20">
        <section className="w-full h-fit flex flex-row items-center gap-x-10">
          {/* Main Identification */}
          <div className="w-2/12 h-full flex items-center avatar">
            <div className="w-48 rounded-full ring ring-[#6B9080] ring-offset-base-100 ring-offset-2">
              <img src={session?.user.image} />
            </div>
          </div>
          <div className=" w-10/12 h-full flex flex-col justify-center">
            <h1 className="font-Merriweather text-4xl font-thin tracking-tight">
              Hello, {studentProfile?.user.firstName}{" "}
              {studentProfile?.user.lastName}
            </h1>
            <p className="font-Merriweather tracking-tight font-thin my-2">
              {studentProfile?.user.institutionalEmail}
            </p>
            <div className="w-2/12 mt-1">
              <FullButton onClick={handleUpdateProfile}>
                Update Profile
              </FullButton>
            </div>
          </div>
        </section>

        {/* Profile Details */}
        <section className="flex flex-col gap-y-10 py-16">
          {/* Name */}
          <div>
            <div className="w-full flex flex-row gap-x-6">
              <div className="w-5/12">
                <TextDisplay
                  label="First Name"
                  value={studentProfile?.user.firstName}
                />
              </div>
              <div className="w-5/12">
                <TextDisplay
                  label="Last Name"
                  value={studentProfile?.user.lastName}
                />
              </div>
              <div className="w-2/12">
                <TextDisplay
                  label="Gender"
                  value={studentProfile?.user.gender}
                />
              </div>
            </div>
          </div>

          {/* College Information */}
          <div>
            <div className="w-full flex flex-row gap-x-6">
              <div className="w-5/12">
                <TextDisplay
                  label="ID Number"
                  value={studentProfile?.user.idNumber}
                />
              </div>
              <div className="w-5/12">
                <TextDisplay label="Program" value={studentProfile?.program} />
              </div>
              <div className="w-2/12">
                <TextDisplay label="Year Level" value={studentProfile?.year} />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <div className="w-full flex flex-row gap-x-6">
              <div className="w-3/12">
                <TextDisplay
                  label="Birth Date"
                  value={formatTime(studentProfile?.birthdate)}
                />{" "}
              </div>
              <div className="w-3/12">
                <TextDisplay
                  label="Contact Number"
                  value={studentProfile?.contactNumber}
                />
              </div>
              <div className="w-6/12">
                <TextDisplay label="Address" value={studentProfile?.address} />
              </div>
            </div>
          </div>
        </section>
      </section>

      {showModal && (
        <UpdateProfileModal
          onClose={handleCloseModal}
          student={studentProfile}
        />
      )}
    </div>
  );
}
