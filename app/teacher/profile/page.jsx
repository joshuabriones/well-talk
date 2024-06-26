"use client";
import Loading from "@/components/Loading";
import { Navbar } from "@/components/ui/Navbar";
import FullButton from "@/components/ui/buttons/FullButton";
import HollowButton from "@/components/ui/buttons/HollowButton";
import Dropdown from "@/components/ui/inputs/Dropdown";
import TextInput from "@/components/ui/inputs/TextInput";
import { imgDB } from "@/firebaseConfig";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import { collegeOptions } from "@/lib/inputOptions";
import { PlusIcon } from "@heroicons/react/solid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { v4 } from "uuid"; // Make sure this is configured correctly
import { logout } from "@/lib/helperFunctions";
import toast from "react-hot-toast";

export default function Profile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCollege, setEditCollege] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showInvalidPassword, setShowInvalidPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
    passwordMismatch: false,
  });

  const userSession = getUserSession();
  console.log(userSession);

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}${API_ENDPOINT.GET_TEACHER_BY_ID}${userSession.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setTeacherProfile(data);
        setUpdatedProfile(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchTeacherProfile();
  }, []);

  if (userSession && userSession.role !== "teacher") {
    return <Loading route={userSession.role} />;
  }

  const handleUpdateProfile = () => {
    setIsEditMode(true);
    setEditCollege(true);
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
    setUpdatedProfile(teacherProfile);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setShowInvalidPassword((prevShowInvalidPassword) => ({
        ...prevShowInvalidPassword,
        passwordMismatch: true,
      }));
      return;
    }

    if (passwords.newPassword && !validatePassword(passwords.newPassword)) {
      setShowInvalidPassword((prevShowInvalidPassword) => ({
        ...prevShowInvalidPassword,
        newPassword: true,
      }));
      toast.error(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
      );
      return;
    }

    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.UPDATE_TEACHER}${userSession.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            institutionalEmail: updatedProfile.institutionalEmail,
            idNumber: updatedProfile.idNumber,
            firstName: updatedProfile.firstName,
            lastName: updatedProfile.lastName,
            gender: updatedProfile.gender,
            password: updatedProfile.password,
            image: updatedProfile.image,
            college: updatedProfile.college,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        throw new Error(
          `Failed to update teacher profile: ${response.statusText}`
        );
      }

      if (passwords.newPassword && passwords.confirmPassword) {
        try {
          const passwordResponse = await fetch(
            `${process.env.BASE_URL}${API_ENDPOINT.CHANGE_PASSWORD}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
              body: JSON.stringify({
                email: updatedProfile.institutionalEmail,
                oldPassword: passwords.currentPassword,
                newPassword: passwords.newPassword,
              }),
            }
          );

          if (!passwordResponse.ok) {
            const errorData = await passwordResponse.json();
            console.error("Server error response:", errorData);
            throw new Error(
              `Failed to update password: ${passwordResponse.statusText}`
            );
          } else {
            toast.success(
              "Profile updated successfully. You will be logged out for security reasons. Please log in again."
            );
            setTimeout(() => {
              logout();
            }, 3000);
          }
        } catch (error) {
          console.error("Error updating password:", error);
        }
      }

      const data = await response.json();
      setTeacherProfile(data);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating teacher profile:", error);
    }
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
      passwordMismatch:
        label === "confirmPassword" ? pw !== passwords.newPassword : false,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgRef = ref(imgDB, `UserAvatars/${v4()}`);
      const snapshot = await uploadBytes(imgRef, file);
      const imgUrl = await getDownloadURL(snapshot.ref);
      setUpdatedProfile((prevProfile) => ({
        ...prevProfile,
        image: imgUrl,
      }));
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 mt-16 md:p-12">
      <Navbar userType="teacher" />
      <div
        className="pattern-overlay pattern-left absolute -z-10"
        style={{ transform: "scaleY(-1)", top: "-50px" }}
      >
        <img src="/images/landing/lleft.png" alt="pattern" />
      </div>
      <div
        className="pattern-overlay pattern-right absolute bottom-0 right-0 -z-10"
        style={{ transform: "scaleY(-1)", top: "-15px" }}
      >
        <img
          src="/images/landing/lright.png"
          alt="pattern"
          className="w-full h-full object-contain"
        />
      </div>
      <section className="w-full pt-4 md:mt-6 p-8 md:p-12 flex flex-col justify-center items-center">
        <div className="w-full max-w-screen-lg mx-auto flex flex-col gap-4 md:gap-8">
          <section className="flex flex-col md:flex-row md:gap-10 mb-8 justify-center items-center">
            {/* Avatar */}
            <div className="w-full md:w-2/12 flex justify-center items-center avatar relative">
              <div className="w-48 rounded-full ring ring-[#6B9080] ring-offset-base-100 ring-offset-1">
                <img src={teacherProfile?.image} alt="avatar" />
                {isEditMode && (
                  <label
                    htmlFor="file-upload"
                    className="absolute bottom-0 right-5 bg-primary-green text-white p-1 rounded-full cursor-pointer"
                  >
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <PlusIcon className="h-5 w-5 text-white" />
                  </label>
                )}
              </div>
            </div>
            {/* User Info */}
            <div className="w-full md:w-10/12 flex flex-col justify-center md:mt-0 mt-4">
              <h1 className="font-Merriweather text-2xl md:text-4xl font-bold tracking-tight mt-4">
                Hello, {teacherProfile?.firstName} {teacherProfile?.lastName}
              </h1>
              <p className="font-Merriweather tracking-tight font-thin my-2">
                {teacherProfile?.institutionalEmail}
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
                      value={
                        isEditMode
                          ? updatedProfile?.firstName
                          : teacherProfile?.firstName
                      }
                      onChange={handleChange("firstName")}
                      placeholder="First Name"
                      readOnly={!isEditMode}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="w-full md:w-full">
                    <TextInput
                      label="Last Name"
                      value={
                        isEditMode
                          ? updatedProfile.lastName
                          : teacherProfile?.lastName
                      }
                      onChange={handleChange("lastName")}
                      readOnly={!isEditMode}
                      disabled={!isEditMode}
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
                      value={
                        isEditMode
                          ? updatedProfile.idNumber
                          : teacherProfile?.idNumber
                      }
                      onChange={handleChange("idNumber")}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <TextInput
                      label="Gender"
                      value={
                        isEditMode
                          ? updatedProfile.gender
                          : teacherProfile?.gender
                      }
                      onChange={handleChange("gender")}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="w-full pb-6">
                  {/* {editCollege ? (
										<Dropdown
											label="Department"
											value={
												updatedProfile.college ||
												teacherProfile?.college ||
												""
											}
											onChange={(value) =>
												setUpdatedProfile(
													(prevProfile) => ({
														...prevProfile,
														college: value,
													})
												)
											}
											readOnly={!isEditMode}
											disabled={!isEditMode}
											dropdownOptions={collegeOptions}
											isEditMode={isEditMode}
										/>
									) : ( */}
                  <TextInput
                    label="Department"
                    value={
                      updatedProfile.college || teacherProfile?.college || ""
                    }
                    onChange={(e) =>
                      setUpdatedProfile((prevProfile) => ({
                        ...prevProfile,
                        college: e.target.value,
                      }))
                    }
                    readOnly
                    disabled
                    // style={{ display: isEditMode ? "none" : "block" }}
                  />
                  {/* )} */}
                </div>
              </div>
              {/* Additional Details */}
            </div>
            {/* Security Information */}
            <div className="w-full md:w-2/6">
              <div>
                <h1 className="font-Merriweather text-slate-600 text-2xl font-semibold tracking-tight py-4">
                  Security Information
                </h1>
                <div className="flex flex-col gap-6">
                  <TextInput
                    type="password"
                    id="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange("currentPassword")}
                    placeholder="Enter current password"
                    label="Current Password"
                    showInvalidPassword={showInvalidPassword.currentPassword}
                    readOnly={!isEditMode}
                    disabled={!isEditMode}
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
                <HollowButton onClick={handleCancelEdit}>Cancel</HollowButton>
                <FullButton onClick={handleSaveProfile}>Save</FullButton>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
