"use client";

import registrationBg from "@/public/images/bgs/registrationBg.png";
import { useRouter } from "next/navigation";
import { useState } from "react";

// utils
import FullButton from "@/components/ui/buttons/FullButton";
import InputCollege from "@/components/ui/inputs/InputCollege";
import InputCollegeInformation from "@/components/ui/inputs/InputCollegeInformation";
import InputInstitutionalInfo from "@/components/ui/inputs/InputInstitutionalInfo";
import InputName from "@/components/ui/inputs/InputName";
import InputPassword from "@/components/ui/inputs/InputPassword";
import PersonalInfo from "@/components/ui/inputs/InputPersonalInfo";
import InputRole from "@/components/ui/inputs/InputRole";
import { Navbar } from "@/components/ui/landing/LandingNav";
import ModalRegistrationSuccessful from "@/components/ui/modals/ModalRegistrationSuccessful";
import ModalTermsUnchecked from "@/components/ui/modals/ModalTermsUnchecked";

const Registration = () => {
	const router = useRouter();

	// properties
	const [email, setEmail] = useState("");
	const [idno, setIdNo] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [gender, setGender] = useState("");

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

		if (roleStudent) {
			if (
				email.trim() === "" ||
				idno.trim() === "" ||
				firstName.trim() === "" ||
				lastName.trim() === "" ||
				gender.trim() === "" ||
				birthdate.trim() === "" ||
				contactNumber.trim() === "" ||
				address.trim() === "" ||
				college.trim() === "" ||
				program.trim() === "" ||
				year.trim() === "" ||
				password.trim() === "" ||
				passwordCheck.trim() === "" ||
				!termsAccepted
			) {
				// Show error message or handle appropriately
				alert("Please fill out all required fields.");
				return;
			}
		}
		if (roleTeacher) {
			if (
				email.trim() === "" ||
				idno.trim() === "" ||
				firstName.trim() === "" ||
				lastName.trim() === "" ||
				gender.trim() === "" ||
				college.trim() === "" ||
				password.trim() === "" ||
				passwordCheck.trim() === "" ||
				!termsAccepted
			) {
				// Show error message or handle appropriately
				alert("Please fill out all required fields.");
				return;
			}
		}
		if (roleCounselor) {
			if (
				email.trim() === "" ||
				idno.trim() === "" ||
				firstName.trim() === "" ||
				lastName.trim() === "" ||
				gender.trim() === "" ||
				password.trim() === "" ||
				passwordCheck.trim() === "" ||
				!termsAccepted
			) {
				// Show error message or handle appropriately
				alert("Please fill out all required fields.");
				return;
			}
		}

		if (termsAccepted === false) {
			setShowTermsNotAccepted(true);
			return;
		}

		let role;

		if (roleStudent) {
			role = "student";
		} else if (roleTeacher) {
			role = "teacher";
		} else if (roleCounselor) {
			role = "counselor";
		}

		//
		try {
			const response = await fetch("/api/users/createuser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					institutionalEmail: email,
					idNumber: idno,
					firstName: firstName,
					lastName: lastName,
					gender: gender,
					password: password,
					gender: gender,
					image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
					birthDate: birthdate,
					contactNumber: contactNumber,
					address: address,
					college: college,
					program: program,
					year: year,
					role: role,
				}),
			});

			if (!response.ok) {
				console.log("Error status: ", response.status);
			}
			setTimeout(() => {
				router.push("/login");
			}, 5000);
		} catch (error) {
			console.log("Error in creating user", error);
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
			}}>
			{/* navigation bar */}
			<Navbar userType="landing" />

			{/* main content */}
			<div>
				{/* registration form*/}
				<div className="flex justify-start items-center py-32 px-36 flex-row">
					<div className="w-4/12"></div> {/* empty div for spacing */}
					<div className="w-8/12 h-fit pr-2.5 ">
						<form
							className="h-full flex flex-col justify-center"
							onSubmit={() => {}}>
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
										gender={gender}
										setGender={setGender}
									/>
								</div>
								<div className="w-full flex flex-row gap-x-6">
									<InputPassword
										password={password}
										passwordCheck={passwordCheck}
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
									<div className="w-1/3 flex flex-row gap-x-6 pt-2">
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
									className="font-Jaldi text-lg">
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
				
					handleLoginClick={handleLoginClick}
				/>
			)}
		</div>
	);
};

export default Registration;

// const Registration = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleFormChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Hash the password
//       const response = await fetch("/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   return (
//     <div className="w-full h-screen flex flex-col items-center justify-center">
//       <h1 className="text-2xl font-bold mb-5">Registration</h1>

//       <form onSubmit={handleFormSubmit} action="POST">
//         <div className="flex flex-col">
//           <div>
//             <label htmlFor="email">Email: </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleFormChange}
//               placeholder="Email"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password">Password: </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleFormChange}
//               placeholder="Password"
//               required
//             />
//           </div>
//           <button>Register</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Registration;

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import Image from "next/image";

// const RegisterPage = () => {
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const { data: session, status: sessionStatus } = useSession();

//   useEffect(() => {
//     if (sessionStatus === "authenticated") {
//       router.replace("/teacher");
//     }
//   }, [sessionStatus, router]);

//   const isValidEmail = (email) => {
//     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//     return emailRegex.test(email);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const email = e.target[0].value;
//     const password = e.target[1].value;
//     const confirmPassword = e.target[2].value;

//     if (!isValidEmail(email)) {
//       setError("Email is invalid");

//       return;
//     }

//     if (!password || password.length < 8) {
//       setError("Password is invalid");

//       return;
//     }

//     if (confirmPassword !== password) {
//       setError("Passwords are not equal");

//       return;
//     }

//     try {
//       const res = await fetch("/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });
//       if (res.status === 400) {
//         setError("The email already in use");
//       }
//       if (res.status === 200) {
//         setError("");

//         router.push("/login");
//       }
//     } catch (error) {
//       setError("Error, try again");
//       console.log(error);
//     }
//   };

//   if (sessionStatus === "loading") {
//     return <h1>Loading...</h1>;
//   }
//   return (
//     sessionStatus !== "authenticated" && (
//       <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
//         <div className="flex justify-center flex-col items-center">
//           <Image src="/logo 1.png" alt="star logo" width={50} height={50} />
//           <h2 className="mt-6 text-center text-2xl leading-9 tracking-tight text-gray-900">
//             Sign up on our website
//           </h2>
//         </div>

//         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
//           <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
//             <form className="space-y-6" onSubmit={handleSubmit}>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Email address
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Password
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="current-password"
//                     required
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="confirmpassword"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Confirm password
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="confirmpassword"
//                     name="confirmpassword"
//                     type="password"
//                     autoComplete="current-password"
//                     required
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
//                   />
//                   <label
//                     htmlFor="remember-me"
//                     className="ml-3 block text-sm leading-6 text-gray-900"
//                   >
//                     Accept our terms and privacy policy
//                   </label>
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="flex w-full border border-black justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
//                 >
//                   Sign up
//                 </button>
//                 <p className="text-red-600 text-center text-[16px] my-4">
//                   {error && error}
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default RegisterPage;
