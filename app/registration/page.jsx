"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/supabaseClient";

//imgs
import registrationBg from "@/public/images/registrationBg.png";

// utils
import TextInput from "@/components/ui/TextInput";
import SelectInput from "@/components/ui/SelectInput";
import FullButton from "@/components/ui/FullButton";
import InputInstitutionalInfo from "@/components/ui/InputInstitutionalInfo";
import InputName from "@/components/ui/InputName";
import InputRole from "@/components/ui/InputRole";
import PersonalInfo from "@/components/ui/InputPersonalInfo";
import InputCollegeInformation from "@/components/ui/InputCollegeInformation";
import InputCollege from "@/components/ui/InputCollege";
import InputPassword from "@/components/ui/InputPassword";
import ModalTermsUnchecked from "@/components/ui/modals/ModalTermsUnchecked";
import ModalRegistrationSuccessful from "@/components/ui/modals/ModalRegistrationSuccessful";

const Registration = () => {
	const router = useRouter();

	// properties
	const [email, setEmail] = useState("");
	const [idno, setIdNo] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [middleInitial, setMiddleInitial] = useState("");

	const [birthdate, setBirthdate] = useState("");
	const [contactNumber, setContactNumber] = useState("");
	const [address, setAddress] = useState("");

	const [role, setRole] = useState("");
	const [roleStudent, setRoleStudent] = useState(false);
	const [roleTeacher, setRoleTeacher] = useState(false);
	const [roleCounselor, setRoleCounselor] = useState(false);

	const [college, setCollege] = useState("");
	const [program, setProgram] = useState("");
	const [year, setYear] = useState("");
	const [password, setPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");
	const [termsAccepted, setTermsAccepted] = useState(false);

	const handleTermsChange = (e) => {
		setTermsAccepted(e.target.checked);
	};

	// pop ups
	const [showInvalidPassword, setShowInvalidPassword] = useState(false);
	const [showPasswordDoNotMatch, setShowPasswordDoNotMatch] = useState(false);

	// modal
	const [showTermsNotAccepted, setShowTermsNotAccepted] = useState(false);
	const [showRegistrationSuccessful, setShowRegistrationSuccessful] =
		useState(false);

	// create account
	const handleCreateAccount = async (e) => {
		e.preventDefault();

		if (termsAccepted === false) {
			setShowTermsNotAccepted(true);
			return;
		}

		try {
			const { user, error } = await supabase.auth.signIn({
				email,
				password,
			});

			if (error) {
				console.error("Registration error:", error.message);
			} else {
				console.log("Registration successful:", user);
				router.push("/");
			}
		} catch (error) {
			console.error("Registration error:", error.message);
		}

		// successful registration
		setShowRegistrationSuccessful(true);
	};

	// password validation function
	const validatePassword = (password) => {
		const regex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return regex.test(password);
	};

	const handlePasswordChange = (e) => {
		const newPassword = e.target.value;
		setPassword(newPassword);

		if (!validatePassword(newPassword)) {
			// password is not valid
			setShowInvalidPassword(true);
		} else {
			// password is valid
			setShowInvalidPassword(false);
		}
	};

	const handlePasswordCheck = (e) => {
		const newPasswordCheck = e.target.value;
		setPasswordCheck(newPasswordCheck);

		if (newPasswordCheck.trim() === "") {
			// password is empty
			setShowPasswordDoNotMatch(false);
		} else if (validatePassword(password)) {
			// password is valid
			if (newPasswordCheck !== password) {
				// passwords do not match
				setShowPasswordDoNotMatch(true);
			} else {
				// passwords match
				setShowPasswordDoNotMatch(false);
			}
		} else {
			// default
			setShowPasswordDoNotMatch(false);
		}
	};

	const handleRoleChange = (e) => {
		const newRole = e.target.value;
		setRole(newRole);

		console.log(newRole);
		if (newRole === "student") {
			setRoleStudent(true);
			setRoleTeacher(false);
			setRoleCounselor(false);
		} else if (newRole === "teacher") {
			setRoleStudent(false);
			setRoleTeacher(true);
			setRoleCounselor(false);
		} else if (newRole === "counselor") {
			setRoleStudent(false);
			setRoleTeacher(false);
			setRoleCounselor(true);
		} else {
			setRoleStudent(false);
			setRoleTeacher(false);
			setRoleCounselor(false);
		}
	};

	const handleLoginClick = () => {
		router.push("/login");
	};

	return (
		<div
			className="min-h-screen w-full"
			style={{
				backgroundImage: `url(${registrationBg.src})`,
				backgroundSize: "cover",
				backgroundPosition: "center right",
				backgroundAttachment: "fixed",
				minHeight: "100vh",
			}}
		>
			{/* navigation bar */}
			<div className="h-20 w-full bg-white flex flex-row justify-between items-center px-44">
				<div className="text-2xl text-[#6B9080] font-bold">
					WellTalk
				</div>
				<div className="flex flex-row gap-x-16">
					<div className="text-sm">Home</div>
					<div className="text-sm">About</div>
					<div className="text-sm">Contact</div>
				</div>
			</div>

			{/* main content */}
			<div>
				{/* registration form*/}
				<div className="flex justify-start items-center py-16 px-36 flex-row">
					<div className="w-4/12"></div> {/* empty div for spacing */}
					<div className="w-8/12 h-fit pr-2.5 ">
						<form
							className="h-full flex flex-col justify-center"
							onSubmit={handleCreateAccount}
						>
							<p className="text-black text-5xl font-Merriweather pt-5">
								Registration
							</p>
							{/* form inputs */}
							<div className="flex flex-col gap-y-2.5 py-4">
								<div className="w-full flex flex-row gap-x-6">
									<InputInstitutionalInfo
										email={email}
										setEmail={setEmail}
										idno={idno}
										setIdNo={setIdNo}
									/>
								</div>
								<div className="w-full flex flex-row gap-x-6">
									<InputName
										firstName={firstName}
										setFirstName={setFirstName}
										lastName={lastName}
										setLastName={setLastName}
										middleInitial={middleInitial}
										setMiddleInitial={setMiddleInitial}
									/>
								</div>
								<div className="w-full flex flex-row gap-x-6">
									<InputPassword
										password={password}
										setPassword={setPassword}
										passwordCheck={passwordCheck}
										setPasswordCheck={setPasswordCheck}
										showInvalidPassword={
											showInvalidPassword
										}
										showPasswordDoNotMatch={
											showPasswordDoNotMatch
										}
										handlePasswordChange={
											handlePasswordChange
										}
										handlePasswordCheck={
											handlePasswordCheck
										}
									/>
								</div>

								{/* choose role */}
								<div className="flex flex-col">
									<div className="w-1/3 flex flex-row gap-x-6 pt-10">
										<div className="w-full">
											<InputRole
												role={role}
												setRole={setRole}
												handleRoleChange={
													handleRoleChange
												}
											/>
										</div>
									</div>
								</div>

								{/* role === student */}
								{roleStudent && (
									<>
										<div className="w-full flex flex-row gap-x-6">
											<PersonalInfo
												birthdate={birthdate}
												setBirthdate={setBirthdate}
												contactNumber={contactNumber}
												setContactNumber={
													setContactNumber
												}
												address={address}
												setAddress={setAddress}
											/>
										</div>
										<div className="flex flex-col">
											<div className="w-full flex flex-row gap-x-6">
												<InputCollegeInformation
													college={college}
													setCollege={setCollege}
													program={program}
													setProgram={setProgram}
													year={year}
													setYear={setYear}
												/>
											</div>
										</div>
									</>
								)}

								{/* role === teacher */}
								{roleTeacher && (
									<>
										<div className="flex flex-col">
											<div className="w-3/5 flex flex-row gap-x-6">
												<InputCollege
													college={college}
													setCollege={setCollege}
												/>
											</div>
										</div>
									</>
								)}

								{/* role === counselor */}
								{roleTeacher && <></>}
							</div>

							<div className="w-full flex flex-row gap-x-3 py-6 pb-1.5 items-center">
								<input
									type="checkbox"
									checked={termsAccepted}
									onChange={handleTermsChange}
									className="h-5 w-5"
									required
								/>
								<label
									htmlFor="terms"
									className="font-Jaldi text-lg"
								>
									I agree to the Terms and Conditions
								</label>
							</div>

							<div className="w-full h-14 flex flex-row my-6">
								<div className="w-2/3 h-full"></div>
								<div className="w-1/3 h-full flex justify-center items-center">
									<FullButton onClick={handleCreateAccount}>
										Create Account
									</FullButton>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			{/* terms and conditions not accepted */}
			{showTermsNotAccepted && (
				<ModalTermsUnchecked
					setShowTermsNotAccepted={setShowTermsNotAccepted}
				/>
			)}
			{/* terms and conditions not accepted */}

			{showRegistrationSuccessful && (
				<ModalRegistrationSuccessful
					setShowRegistrationSuccessful={
						setShowRegistrationSuccessful
					}
					//  to be deleted
					registrationDetails={`Email: ${email} 
						ID Number: ${idno} 
						First Name: ${firstName} 
						Last Name: ${lastName} 
						Middle Initial: ${middleInitial} 

						Password: ${password} 
						Password Check: ${passwordCheck} 
						Role: ${role}

						Birthdate: ${birthdate} 
						Contact Number: ${contactNumber} 
						Address: ${address} 
						
						College: ${college} 
						Program: ${program} 
						Year: ${year} 
						
						Terms Accepted: ${termsAccepted}`}
					handleLoginClick={handleLoginClick}
				/>
			)}
		</div>
	);
};

export default Registration;
