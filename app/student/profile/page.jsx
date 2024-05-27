"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Navbar } from "@/components/ui/Navbar";
import FullButton from "@/components/ui/buttons/FullButton";
import HollowButton from "@/components/ui/buttons/HollowButton";

import TextInput from "@/components/ui/inputs/TextInput";
import TextDisplay from "@/components/ui/student/TextDisplay";

export default function StudentProfile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const [studentProfile, setStudentProfile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showInvalidPassword, setShowInvalidPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

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
        setUpdatedProfile(data.student);
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
    setIsEditMode(true);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [key]: value,
    }));
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setUpdatedProfile(studentProfile);
  };

  const handleSaveProfile = () => {
    // Save the profile with updatedProfile data (API call can be added here)
    setStudentProfile(updatedProfile);
    setIsEditMode(false);
  };

  const handlePasswordChange = (label) => (e) => {
    const pw = e.target.value;

    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [label]: pw,
    }));

    setShowInvalidPassword((prevShowInvalidPassword) => ({
      ...prevShowInvalidPassword,
      [label]: pw && !validatePassword(pw),
    }));
  };

  return (
    <div className="p-4 mt-16 md:p-12">
      <section>
        <Navbar userType="student" />
      </section>
      <div
					className="pattern-overlay pattern-left absolute -z-10"
					style={{ transform: "scaleY(-1)", top: "-50px" }}>
					<img
						src="/images/landing/lleft.png"
						alt="pattern"
					/>
				</div>
				<div
					className="pattern-overlay pattern-right absolute bottom-0 right-0 -z-10"
					style={{ transform: "scaleY(-1)", top: "-15px" }}>
					<img
						src="/images/landing/lright.png"
						alt="pattern"
						className="w-full h-full object-contain"
					/>
				</div>

      <section className="w-full mt-4 md:mt-6 p-8 md:p-12 flex flex-col justify-center items-center">
        <div className="w-full max-w-screen-lg mx-auto flex flex-col gap-4 md:gap-8">
          <section className="flex flex-col md:flex-row items-center md:gap-10 mb-12">
            {/* Avatar */}
            <div className="w-full md:w-2/12 flex justify-center items-center avatar">
              <div className="w-48 rounded-full ring ring-[#6B9080] ring-offset-base-100 ring-offset-1">
                <img src={session?.user.image} />
              </div>
            </div>
            {/* User Info */}
            <div className="w-full md:w-10/12 flex flex-col justify-center md:mt-0 mt-4">
              <h1 className="font-Merriweather text-2xl md:text-4xl font-bold tracking-tight mt-4">
                Hello, {studentProfile?.user.firstName}{" "}
                {studentProfile?.user.lastName}
              </h1>
              <p className="font-Merriweather tracking-tight font-thin my-2">
                {studentProfile?.user.institutionalEmail}
              </p>
              <div className="w-full md:w-5/12 mt-1">
                {!isEditMode && (
                  <FullButton onClick={handleUpdateProfile}>
                    Update Profile
                  </FullButton>
                )}
              </div>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-6 md:gap-10 mt-2">
            {/* User Information */}
            <div className="w-full md:w-4/6">
              <div className="">
                <h1 className="font-Merriweather text-slate-600 text-2xl font-semibold tracking-tight py-4">
                  User Information
                </h1>
                <div className="flex flex-col md:flex-row gap-4 pb-6">
                  <div className="w-full md:w-full">
                    <TextInput
                      label="First Name"
                      value={studentProfile?.user.firstName}
                      onChange={handleChange("user.firstName")}
                      placeholder="First Name"
                      readOnly={!isEditMode}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="w-full md:w-full">
                    <TextInput
                      label="Last Name"
                      value={studentProfile?.user.lastName}
                      onChange={handleChange("user.lastName")}
                      readOnly={!isEditMode}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <TextInput
                      label="Gender"
                      value={studentProfile?.user.gender}
                      onChange={handleChange("user.gender")}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
              </div>
              {/* College Information */}
              <div>
                <div className="flex flex-col md:flex-row gap-4 pb-6">
                  <div className="w-full md:w-1/2">
                    <TextInput
                      label="ID Number"
                      value={studentProfile?.user.idNumber}
                      onChange={handleChange("user.idNumber")}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <TextInput
                      label="Program"
                      value={studentProfile?.program}
                      onChange={handleChange("program")}
                      readOnly={!isEditMode}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <TextInput
                      label="Year Level"
                      value={studentProfile?.year}
                      onChange={handleChange("year")}
                      readOnly={!isEditMode}
                      disabled={!isEditMode}
                    />
                  </div>
                </div>
              </div>
              {/* Additional Details */}
              <div>
                <div className="flex flex-col md:flex-row gap-4 pb-6">
                  <div className="w-full md:w-1/2">
                    <TextInput
                      label="Birth Date"
                      value={formatTime(studentProfile?.birthdate)}
                      onChange={handleChange("birthdate")}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <TextInput
                      label="Contact Number"
                      value={studentProfile?.contactNumber}
                      onChange={handleChange("contactNumber")}
                      readOnly={!isEditMode}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="w-full">
                    <TextInput
                      label="Address"
                      value={studentProfile?.address}
                      onChange={handleChange("address")}
                      readOnly={!isEditMode}
                      disabled={!isEditMode}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Security Information */}
            <div className="w-full md:w-2/6">
              <div>
                <h1 className="font-Merriweather text-slate-600 text-2xl font-semibold tracking-tight py-4">
                  Security Information
                </h1>
                <div className="flex flex-col gap-6">
                  <TextDisplay
                    type="password"
                    id="currentPassword"
                    value="●●●●●●●●"
                    onChange={handlePasswordChange("currentPassword")}
                    placeholder="Enter current password"
                    label="Current Password"
                    showInvalidPassword={
                      showInvalidPassword.currentPassword
                    }
                    readOnly
                    disabled
                  />
                  {/* New Password */}
                  <TextInput
                    type="password"
                    id="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange("newPassword")}
                    placeholder="Enter new password"
                    label="New Password"
                    showInvalidPassword={showInvalidPassword.newPassword}
                    readOnly={!isEditMode}
                    disabled={!isEditMode}
                  />
                  <TextInput
                    type="password"
                    id="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange("confirmPassword")}
                    placeholder="Confirm new password"
                    label="Confirm Password"
                    showInvalidPassword={showInvalidPassword.confirmPassword}
                    readOnly={!isEditMode}
                    disabled={!isEditMode}
                  />
                </div>
              </div>
            </div>
          </section>

          {isEditMode && (
            <div className="flex justify-end mt-4">
              <div className="flex flex-row gap-6 w-full">
              <HollowButton
                onClick={handleCancelEdit}
              >
                Cancel
              </HollowButton>
              <FullButton
                onClick={handleSaveProfile}
              >
                Save
              </FullButton>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
