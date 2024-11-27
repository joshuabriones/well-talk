"use client";
import { default as LoadingState } from "@/components/Load";
import ScrollAnimationWrapper from "@/components/layout/ScrollAnimationWrapper";
import { Navbar } from "@/components/ui/Navbar";
import FullButton from "@/components/ui/buttons/FullButton";
import HollowButton from "@/components/ui/buttons/HollowButton";
import TextInput from "@/components/ui/inputs/TextInput";
import ConfirmationModal from "@/components/ui/modals/ModalProfileConfirm";
import { imgDB } from "@/firebaseConfig";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession, logout } from "@/lib/helperFunctions";
import { programOptions } from "@/lib/inputOptions";
import { PlusIcon } from "@heroicons/react/solid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 } from "uuid"; // Make sure this is configured correctly
import styles from "../../../css/landing.module.css";

export default function Profile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [counselorProfile, setCounselorProfile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const [previewImage, setPreviewImage] = useState(null);
  const userSession = getUserSession();

  const getAbbreviation = (program) => {
    const programEntries = Object.entries(programOptions);
    for (const [college, programs] of programEntries) {
      const foundProgram = programs.find((p) => p.value === program);
      if (foundProgram) {
        return foundProgram.label; // Return the label (abbreviation)
      }
    }
    return program; // If not found, return the original
  };

  useEffect(() => {
    const fetchCounselorProfile = async () => {
      try {
        const response = await fetch(`${process.env.BASE_URL}/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setCounselorProfile(data);
        setUpdatedProfile(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchCounselorProfile();
  }, []);

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
    setUpdatedProfile(counselorProfile);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleConfirmSave = async (e) => {
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
        `${process.env.BASE_URL}${API_ENDPOINT.UPDATE_COUNSELOR}${userSession.id}`,
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
            image: updatedProfile.image,
            college: updatedProfile.college,
            program: updatedProfile.program,
            assignedYear: updatedProfile.assignedYear,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        throw new Error(
          `Failed to update counselor profile: ${response.statusText}`
        );
      } else {
        toast.success("Profile information updated successfully.");
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
            }, 5000);
          }
        } catch (error) {
          console.error("Error updating password:", error);
        }
      }

      const data = await response.json();
      setCounselorProfile(data);
      setIsEditMode(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating counselor profile:", error);
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
      // Generate a preview URL of the image
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

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
    return <LoadingState />;
  }

  console.log("ok");

  return (
    <div className="p-4 md:p-8">
      <Navbar userType="counselor" />
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
      <ScrollAnimationWrapper animationType="fadeInFromLeft">
        <section
          className={`w-full pt-20 md:mt-6 p-8 md:p-12 flex flex-col justify-center items-center ${styles.floating}`}
        >
          {/* Window Container */}
          <div className="w-full max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg border-2 border-gray-200 relative">
            {/* Header Bar */}
            <div className="flex justify-between items-center bg-maroon p-4 border-b-2">
              <div className="flex items-center space-x-2 ml-4">
                <div className="w-4 h-4 border-2 bg-yellow-400 rounded-full"></div>
                <div className="w-4 h-4 border-2 bg-green-400 rounded-full"></div>
                <div className="w-4 h-4 border-2 bg-red-400 rounded-full"></div>
              </div>
            </div>

            <div className="p-12">
              <div className="w-full max-w-screen-lg mx-auto flex flex-col gap-4 md:gap-8">
                <section className="flex flex-col md:flex-row md:gap-10 mb-8 justify-center items-center">
                  {/* Avatar */}
                  <div className="w-full md:w-2/12 flex justify-center items-center avatar relative">
                    <div className="w-48 rounded-full ring ring-maroon ring-offset-base-100 ring-offset-1">
                      <img
                        src={
                          previewImage ? previewImage : counselorProfile?.image
                        }
                        alt="avatar"
                      />
                      {isEditMode && (
                        <label
                          htmlFor="file-upload"
                          className="absolute bottom-0 right-5 bg-gold text-white p-1 rounded-full border-2 border-maroon cursor-pointer translate-y-1"
                        >
                          <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <PlusIcon className="h-5 w-5 text-gray" />
                        </label>
                      )}
                    </div>
                  </div>
                  {/* User Info */}
                  <div className="w-full md:w-10/12 flex flex-col justify-center md:mt-0 mt-4">
                    <h1 className="font-Merriweather text-2xl md:text-4xl font-bold tracking-tight mt-4">
                      Hello, {counselorProfile?.firstName}{" "}
                      {counselorProfile?.lastName}
                    </h1>
                    <p className="font-Merriweather tracking-tight font-thin my-2">
                      {counselorProfile?.institutionalEmail}
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
                                : counselorProfile?.firstName
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
                                : counselorProfile?.lastName
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
                                : counselorProfile?.idNumber
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
                                : counselorProfile?.gender
                            }
                            onChange={handleChange("gender")}
                            readOnly
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col md:flex-row gap-4 pb-6">
                        <div className="w-full md:w-full">
                          <TextInput
                            label="Department"
                            value={
                              updatedProfile.college ||
                              counselorProfile?.college ||
                              ""
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
                        </div>
                        <div className="w-full md:w-full">
                          <TextInput
                            label="Program"
                            value={getAbbreviation(
                              updatedProfile.program || ""
                            )}
                            onChange={(e) => {
                              const newProgram = e.target.value;
                              setUpdatedProfile((prevProfile) => ({
                                ...prevProfile,
                                program: newProgram,
                              }));
                            }}
                            readOnly
                            disabled
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
                        <TextInput
                          type="password"
                          id="currentPassword"
                          value={passwords.currentPassword}
                          onChange={handlePasswordChange("currentPassword")}
                          placeholder="Enter current password"
                          label="Current Password"
                          showInvalidPassword={
                            showInvalidPassword.currentPassword
                          }
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
                          showInvalidPassword={
                            showInvalidPassword.confirmPassword
                          }
                          readOnly={!isEditMode}
                          disabled={!isEditMode}
                        />
                        {showInvalidPassword.passwordMismatch && (
                          <p className="text-red-500">
                            Passwords do not match.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                {isEditMode && (
                  <div className="flex justify-end mt-4">
                    <div className="flex flex-row gap-6 w-full">
                      <HollowButton onClick={handleCancelEdit}>
                        Cancel
                      </HollowButton>
                      <FullButton onClick={handleSaveProfile}>Save</FullButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimationWrapper>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSave}
      />
    </div>
  );
}
