"use client";

import { default as LoadingState } from "@/components/Load";
import TextInput from "@/components/ui/inputs/TextInput";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import { collegeOptions, programOptions } from "@/lib/inputOptions";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-hot-toast";
import FullButton from "../../buttons/FullButton";
import HollowButton from "../../buttons/HollowButton";

const AddReferral = ({ teacherId, onOpen, fetchReferrals }) => {
	const userSession = getUserSession();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [idNumber, setIdNumber] = useState("");
	const [year, setYear] = useState("");
	const [college, setCollege] = useState("");
	const [program, setProgram] = useState("");
	const [reason, setReason] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState({});

	// console.log(teacherId, firstName, lastName, email, idNumber, year, reason, college, program);
	const handleClose = () => {
		onOpen(false);
	};

	const createNotification = async (details) => {
		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.CREATE_REFERRAL_NOTIFICATION_TEACHER_AND_STUDENT}${userSession.id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
					body: JSON.stringify({
						//receiverId: details.studentId, // remove nako cause lahi ni sya na id dapat
						serviceId: details.referralId,
					}),
				}
			);

			if (response.ok) {
				toast.success("Notification created successfully");
			} else {
				// Handle non-200 responses here
				const errorData = await response.json(); // Get error details
				console.error("Error creating notification:", errorData);
				toast.error(
					"Failed to create notification: " + errorData.message
				);
			}
		} catch (error) {
			console.error("Notification error: ", error);
			toast.error("Failed to create notification due to an error.");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		let validationErrors = {};

		// Validate required fields
		if (!firstName) validationErrors.firstName = "First name is required.";
		if (!lastName) validationErrors.lastName = "Last name is required.";
		if (!idNumber) validationErrors.idNumber = "ID number is required.";
		if (!year) validationErrors.year = "Year is required.";
		if (!college) validationErrors.college = "College is required.";
		if (!program) validationErrors.program = "Program is required.";
		if (!email) validationErrors.email = "Email is required.";
		if (!reason) validationErrors.reason = "Reason is required.";

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.CREATE_REFERRAL}${teacherId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
					body: JSON.stringify({
						studentId: idNumber,
						studentEmail: email,
						studentFirstName: firstName,
						studentLastName: lastName,
						studentCollege: college,
						studentProgram: program,
						studentYear: year,
						reason: reason,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to create referral");
			}

			handleClose();
			fetchReferrals();
			setIsLoading(false);
			const data = await response.json();
			console.log("Referral: ", data);
			console.log("Student ID: ", idNumber);

			createNotification({
				studentId: idNumber,
				referralId: data.referralId,
			});

			toast.success("Referral created successfully");
		} catch (error) {
			console.error("Error creating referral:", error);
		}
	};

	return (
		<>
			{/* Modal Wrapper */}
			<div
				className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-25 z-50 backdrop-blur"
				role="dialog">
				{/* Modal Content */}
				<div className="relative w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg border-2 border-gray-200">
					{/* Header */}
					<div className="flex justify-between items-center bg-maroon p-4 border-b-2">
						<div className="flex items-center space-x-2 ml-4">
							<div className="w-4 h-4 border-2 bg-yellow-400 rounded-full cursor-pointer"></div>
							<div className="w-4 h-4 border-2 bg-green-400 rounded-full cursor-pointer"></div>
							<div className="w-4 h-4 border-2 bg-red-400 rounded-full cursor-pointer"></div>
						</div>
					</div>

					{/* Body */}
					<div className="p-6 md:p-12 flex flex-col overflow-auto justify-center">
						{!isLoading ? (
							<>
								{/* Heading */}
								<section>
									<h3 className="text-2xl font-bold font-Merriweather">
										Add Referral
									</h3>
									<p className="text-lg font-Jaldi">
										You can refer a student to a counselor
										by submitting this form.
									</p>
								</section>

								<form onSubmit={handleSubmit}>
									<div className="pt-5 flex flex-col gap-y-4">
										<div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
											<TextInput
												value={firstName}
												onChange={(e) =>
													setFirstName(e.target.value)
												}
												placeholder="First Name"
												label="First Name"
												type="text"
												id="firstName"
												className="flex-1"
											/>
											{errors.firstName && (
												<p className="text-red-500 text-sm">
													{errors.firstName}
												</p>
											)}
											<TextInput
												value={lastName}
												onChange={(e) =>
													setLastName(e.target.value)
												}
												placeholder="Last Name"
												label="Last Name"
												type="text"
												id="lastName"
												className="flex-1"
											/>
											{errors.lastName && (
												<p className="text-red-500 text-sm">
													{errors.lastName}
												</p>
											)}
										</div>

										<div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
											<div className="flex-1">
												<TextInput
													value={idNumber}
													onChange={(e) =>
														setIdNumber(
															e.target.value
														)
													}
													placeholder="ID Number"
													label="ID Number"
													type="text"
													id="idNumber"
												/>
												{errors.idNumber && (
													<p className="text-red-500 text-sm">
														{errors.idNumber}
													</p>
												)}
											</div>
											<div className="flex-1">
												<TextInput
													value={year}
													onChange={(e) =>
														setYear(e.target.value)
													}
													placeholder="Year"
													label="Year"
													type="text"
													id="year"
												/>
												{errors.year && (
													<p className="text-red-500 text-sm">
														{errors.year}
													</p>
												)}
											</div>
										</div>

										<div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
											<div className="flex-1">
												<label
													htmlFor="college"
													className="relative block rounded-md bg-white border border-gray-400 p-1 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black w-full">
													<select
														value={college}
														onChange={(e) =>
															setCollege(
																e.target.value
															)
														}
														className="peer border-none bg-white placeholder-white focus:border-gray-800 focus:outline-none focus:ring-0 rounded-md w-full dark:text-black"
														required>
														{collegeOptions.map(
															(option) => (
																<option
																	key={
																		option.value
																	}
																	value={
																		option.value
																	}>
																	{
																		option.label
																	}
																</option>
															)
														)}
													</select>
													<span className="pointer-events-none absolute start-2.5 bg-white top-0 -translate-y-1/2 p-1 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
														College
													</span>
												</label>
												{errors.college && (
													<p className="text-red-500 text-sm">
														{errors.college}
													</p>
												)}
											</div>
											<div className="flex-1">
												<label
													htmlFor="program"
													className="relative block rounded-md bg-white border border-gray-400 p-1 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black w-full">
													<select
														value={program}
														onChange={(e) =>
															setProgram(
																e.target.value
															)
														}
														className="peer border-none bg-white placeholder-white focus:border-gray-800 focus:outline-none focus:ring-0 rounded-md w-full dark:text-black"
														required>
														{programOptions[
															college
														]?.map((option) => (
															<option
																key={
																	option.value
																}
																value={
																	option.value
																}>
																{option.label}
															</option>
														))}
													</select>
													<span className="pointer-events-none absolute start-2.5 bg-white top-0 -translate-y-1/2 p-1 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
														Program
													</span>
												</label>
												{errors.program && (
													<p className="text-red-500 text-sm">
														{errors.program}
													</p>
												)}
											</div>
										</div>

										<div className="">
											<TextInput
												value={email}
												onChange={(e) =>
													setEmail(e.target.value)
												}
												placeholder="Email"
												label="Email"
												type="text"
												id="email"
											/>
											{errors.email && (
												<p className="text-red-500 text-sm">
													{errors.email}
												</p>
											)}
										</div>

										<div className="">
											<TextInput
												value={reason}
												onChange={(e) =>
													setReason(e.target.value)
												}
												placeholder="Reason"
												label="Reason"
												type="text"
												id="reason"
											/>
											{errors.reason && (
												<p className="text-red-500 text-sm">
													{errors.reason}
												</p>
											)}
										</div>

										{/* Submit */}
										<div className="mt-3 px-16 h-12 flex flex-row gap-x-6">
											<HollowButton onClick={handleClose}>
												Cancel
											</HollowButton>
											<FullButton type="submit">
												Refer Student
											</FullButton>
										</div>
									</div>
								</form>
							</>
						) : (
							<div className="flex flex-col justify-center items-center h-40 mb-12">
								<LoadingState />
								<p className="text-2xl font-Jaldi">
									Creating Referral...
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AddReferral;
