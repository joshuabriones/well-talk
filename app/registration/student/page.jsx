"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/supabaseClient";

//imgs
import registrationBg from "@/public/images/registrationBg.png";

// utils
import TextInput from "@/components/ui/TextInput";
import FullButton from "@/components/ui/FullButton";
import InputInstitutionalInfo from "@/components/ui/InputInstitutionalInfo";
import InputName from "@/components/ui/InputName";
import PersonalInfo from "@/components/ui/InputPersonalInfo";
import InputCollegeInformation from "@/components/ui/InputCollegeInformation";
import InputPassword from "@/components/ui/InputPassword";

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

	// create account
	const handleCreateAccount = async (e) => {
		e.preventDefault();

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

		// an alert that lets you see the values of the form
		alert(
			"Email: " +
				email +
				" ID Number: " +
				idno +
				" First Name: " +
				firstName +
				" Last Name: " +
				lastName +
				" Middle Initial: " +
				middleInitial +
				" Birthdate: " +
				birthdate +
				" Contact Number: " +
				contactNumber +
				" Address: " +
				address +
				" College: " +
				college +
				" Program: " +
				program +
				" Year: " +
				year +
				" Password: " +
				password +
				" Password Check: " +
				passwordCheck +
				" Terms Accepted: " +
				termsAccepted
		);
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

		// Check if newPassword is valid
		if (!validatePassword(newPassword)) {
			setShowInvalidPassword(true);
		} else {
			setShowInvalidPassword(false);

			// Check if newPassword matches passwordCheck only if the first password is valid
			if (newPassword !== passwordCheck) {
				// If they don't match, set showPasswordDoNotMatch to true
				setShowPasswordDoNotMatch(true);
			} else {
				// If they match, set showPasswordDoNotMatch to false
				setShowPasswordDoNotMatch(false);
			}
		}
	};

	const handlePasswordCheck = (e) => {
		const newPasswordCheck = e.target.value;
		setPasswordCheck(newPasswordCheck);

		// Check if newPassword matches passwordCheck only if the first password is valid
		if (validatePassword(password)) {
			// If the first password is valid, then check if passwordCheck matches
			if (newPasswordCheck !== password) {
				// If they don't match, set showPasswordDoNotMatch to true
				setShowPasswordDoNotMatch(true);
			} else {
				// If they match, set showPasswordDoNotMatch to false
				setShowPasswordDoNotMatch(false);
			}
		} else {
			// If the first password is not valid, reset showPasswordDoNotMatch to false
			setShowPasswordDoNotMatch(false);
		}
	};

	return (
		<div className="min-h-screen w-full">
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
			<div
				className=""
				style={{
					backgroundImage: `url(${registrationBg.src})`,
					width: "full",
					height: "full",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				{/* registration form*/}
				<div className="flex justify-start items-center py-16 px-36">
					<div className="w-4/12"></div> {/* empty div for spacing */}
					<div className="w-8/12 h-[650px] overflow-auto">
						<form
							className="h-full flex flex-col justify-center"
							onSubmit={handleCreateAccount}
						>
							<p className="text-black text-5xl mt-32">
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
									<PersonalInfo
										birthdate={birthdate}
										setBirthdate={setBirthdate}
										contactNumber={contactNumber}
										setContactNumber={setContactNumber}
										address={address}
										setAddress={setAddress}
									/>
								</div>
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
								<div className="flex flex-col">
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
										className="text-base"
									>
										I agree to the Terms and Conditions
									</label>
								</div>
							</div>

							{/* "Create Account" button at the right end */}
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

			{/* footer section */}
			<div className="h-40 w-full bg-white flex flex-row justify-between items-center px-44 ">
				<div className="text-2xl text-[#6B9080] font-bold">Footer</div>
			</div>
		</div>
	);
};

export default Registration;
