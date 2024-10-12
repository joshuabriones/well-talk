"use client";
import Loading from "@/components/Loading";
import ScrollAnimationWrapper from "@/components/layout/ScrollAnimationWrapper";
import { Navbar } from "@/components/ui/Navbar";
import FullButton from "@/components/ui/buttons/FullButton";
import HollowButton from "@/components/ui/buttons/HollowButton";
import TextInput from "@/components/ui/inputs/TextInput";
import { imgDB } from "@/firebaseConfig";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession, logout } from "@/lib/helperFunctions";
import { PlusIcon } from "@heroicons/react/solid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 } from "uuid"; // Make sure this is configured correctly
import styles from "../../../css/landing.module.css";
import { default as LoadingState } from "@/components/Load";

export default function StudentProfile() {
	const userSession = getUserSession();
	const [isEditMode, setIsEditMode] = useState(false);
	const [studentProfile, setStudentProfile] = useState(null);
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

	const [previewImage, setPreviewImage] = useState(null);

	useEffect(() => {
		const fetchStudentProfile = async () => {
			try {
				const response = await fetch(
					`${process.env.BASE_URL}${API_ENDPOINT.GET_STUDENT_BY_ID}${userSession.id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${Cookies.get("token")}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error("Failed to fetch student profile");
				}
				const data = await response.json();
				setStudentProfile(data);
				setUpdatedProfile(data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching student profile:", error);
				setLoading(false);
			}
		};

		fetchStudentProfile();
	}, []);

	if (userSession && userSession.role !== "student") {
		return <Load route={userSession.role} />;
	}

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
				`${process.env.BASE_URL}${API_ENDPOINT.UPDATE_STUDENT}${userSession.id}`,
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
						contactNumber: updatedProfile.contactNumber,
						password: updatedProfile.password,
						image: updatedProfile.image,
						college: updatedProfile.college,
						program: updatedProfile.program,
						year: updatedProfile.year,
						birthDate: updatedProfile.birthDate,
						permanentAddress: updatedProfile.permanentAddress, // Use the single string for address
					}),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				console.error("Server error response:", errorData);
				throw new Error(
					`Failed to update student profile: ${response.statusText}`
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
			setStudentProfile(data);
			setIsEditMode(false);
		} catch (error) {
			console.error("Error updating student profile:", error);
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
				label === "confirmPassword"
					? pw !== passwords.newPassword
					: false,
		}));
	};

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
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

	console.log("Student Profile:", studentProfile);
	console.log("Updated Profile:", updatedProfile);

	return (
		<div className="p-4 md:p-8">
			<Navbar userType="student" />

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

			<ScrollAnimationWrapper animationType="fadeInFromLeft">
				<section
					className={`w-full pt-16 md:mt-6 p-8 md:p-12 flex flex-col justify-center items-center ${styles.floating}`}>
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

						{/* Main Content */}
						<div className="p-12">
							<div className="w-full max-w-screen-lg mx-auto flex flex-col gap-4 md:gap-8 rounded-2xl">
								<section className="flex flex-col md:flex-row md:gap-10 mb-8 justify-center items-center">
									{/* Avatar */}
									<div className="w-full md:w-2/12 flex justify-center items-center avatar relative">
										<div className="w-48 rounded-full ring ring-maroon ring-offset-base-100 ring-offset-1">
											<img
												src={
													previewImage
														? previewImage
														: studentProfile?.image
												}
												alt="avatar"
											/>
											{isEditMode && (
												<label
													htmlFor="file-upload"
													className="absolute bottom-0 right-5 bg-gold text-white p-1 rounded-full border-2 border-maroon cursor-pointer translate-y-1">
													<input
														id="file-upload"
														type="file"
														className="hidden"
														accept="image/*"
														onChange={
															handleFileChange
														}
													/>
													<PlusIcon className="h-5 w-5 text-gray" />
												</label>
											)}
										</div>
									</div>

									{/* User Info */}
									<div className="w-full md:w-10/12 flex flex-col justify-center md:mt-0 mt-4">
										<h1 className="font-Merriweather text-2xl md:text-4xl font-bold tracking-tight mt-4">
											Hello, {studentProfile?.firstName}{" "}
											{studentProfile?.lastName}
										</h1>
										<p className="font-Merriweather tracking-tight font-thin my-2">
											{studentProfile?.institutionalEmail}
										</p>
										<div className="w-full md:w-5/12 mt-1">
											{!isEditMode && (
												<FullButton
													onClick={
														handleUpdateProfile
													}>
													Update Profile
												</FullButton>
											)}
										</div>
									</div>
								</section>

								{/* Rest of the content */}
								<section className="flex flex-col md:flex-row gap-6 md:gap-10 mt-2">
									<div className="w-full md:w-4/6">
										{/* User Information */}
										<div>
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
																: studentProfile?.firstName
														}
														onChange={handleChange(
															"firstName"
														)}
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
																: studentProfile?.lastName
														}
														onChange={handleChange(
															"lastName"
														)}
														readOnly={!isEditMode}
														disabled={!isEditMode}
													/>
												</div>
												<div className="w-full md:w-1/2">
													<TextInput
														label="Gender"
														value={
															isEditMode
																? updatedProfile.gender
																: studentProfile?.gender
														}
														onChange={handleChange(
															"gender"
														)}
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
														value={
															isEditMode
																? updatedProfile.idNumber
																: studentProfile?.idNumber
														}
														onChange={handleChange(
															"idNumber"
														)}
														readOnly
														disabled
													/>
												</div>
												<div className="w-full md:w-1/2">
													<TextInput
														label="Program"
														value={
															isEditMode
																? updatedProfile.program
																: studentProfile?.program
														}
														onChange={handleChange(
															"program"
														)}
														readOnly={!isEditMode}
														disabled={!isEditMode}
													/>
												</div>
												<div className="w-full md:w-1/2">
													<TextInput
														label="Year Level"
														value={
															isEditMode
																? updatedProfile.year
																: studentProfile?.year
														}
														onChange={handleChange(
															"year"
														)}
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
														value={formatTime(
															studentProfile?.birthDate
														)}
														onChange={handleChange(
															"birthDate"
														)}
														readOnly={!isEditMode}
														disabled={true}
													/>
												</div>
												<div className="w-full md:w-1/2">
													<TextInput
														label="Contact Number"
														value={
															isEditMode
																? updatedProfile.contactNumber
																: studentProfile?.contactNumber
														}
														onChange={handleChange(
															"contactNumber"
														)}
														readOnly={!isEditMode}
														disabled={!isEditMode}
													/>
												</div>
												<div className="w-full">
													<TextInput
														label="Address"
														value={
															isEditMode
																? updatedProfile.permanentAddress
																: studentProfile?.permanentAddress
														}
														onChange={handleChange(
															"permanentAddress"
														)}
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
												<TextInput
													type="password"
													id="currentPassword"
													value={
														passwords.currentPassword
													}
													onChange={handlePasswordChange(
														"currentPassword"
													)}
													placeholder="Enter current password"
													label="Current Password"
													showInvalidPassword={
														showInvalidPassword.currentPassword
													}
													readOnly={!isEditMode}
													disabled={!isEditMode}
												/>
												<TextInput
													type="password"
													id="newPassword"
													value={
														passwords.newPassword
													}
													onChange={handlePasswordChange(
														"newPassword"
													)}
													placeholder="Enter new password"
													label="New Password"
													showInvalidPassword={
														showInvalidPassword.newPassword
													}
													readOnly={!isEditMode}
													disabled={!isEditMode}
												/>
												<TextInput
													type="password"
													id="confirmPassword"
													value={
														passwords.confirmPassword
													}
													onChange={handlePasswordChange(
														"confirmPassword"
													)}
													placeholder="Confirm new password"
													label="Confirm Password"
													showInvalidPassword={
														showInvalidPassword.confirmPassword
													}
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
												onClick={handleCancelEdit}>
												Cancel
											</HollowButton>
											<FullButton
												onClick={handleSaveProfile}>
												Save
											</FullButton>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>
			</ScrollAnimationWrapper>
		</div>
	);
}
