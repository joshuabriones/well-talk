"use client";

import Loading from "@/components/Loading";
import { Navbar } from "@/components/ui/Navbar";
import FullButton from "@/components/ui/buttons/FullButton";
import TextAreaInput from "@/components/ui/inputs/TextAreaInput";
import TextInput from "@/components/ui/inputs/TextInput";
import StudentModalAppointmentInfo from "@/components/ui/modals/counselor/appointments/ModalAppointmentInfo";
import StudentAddAppointment from "@/components/ui/modals/counselor/appointments/StudentAddAppointment";
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import ModalConfirmResponseAppointment from "@/components/ui/modals/student/appointments/ModalConfirmedResponseAppointment";
import ModalReschedule from "@/components/ui/modals/student/appointments/ModalReschedule";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import "@/styles/counselor.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Badge, Calendar, Popover, Whisper } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const Appointment = () => {
	const AppointmentPerPage = 10;

	const [isLoading, setIsLoading] = useState(false);
	const [selectedID, setSelectedID] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	//modals
	const [deleteModal, setDeleteModal] = useState(false);
	const [appointmentModal, setAppointmentModal] = useState(null);
	const [isAddAppointment, setIsAddAppointment] = useState(true);
	const [isViewAppointment, setIsViewAppointment] = useState(false);
	const [rescheduleModal, setRescheduleModal] = useState(false);

	const [appointments, setAppointments] = useState([]);
	const [appointmentDate, setAppointmentDate] = useState(
		new Date().toISOString().split("T")[0]
	);

	const [confirmResponseModal, setConfirmResponseModal] = useState(false);

	const userSession = getUserSession();
	const [selectedTime, setSelectedTime] = useState(""); // State to store the selected time
	const [endTime, setEndTime] = useState(""); // State to store the end time
	const [appointmentType, setAppointmentType] = useState(""); // State to store the selected appointmenttype
	const [purpose, setPurpose] = useState(""); // State to store the purpose of the appointment
	const [appointmentOnThatDate, setAppointmentOnThatDate] = useState([]);
	const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
	const [showAddAppointmentModal, setShowAddAppointmentModal] =
		useState(false);

	const [counselorIds, setCounselorIds] = useState([]);
	const [studentData, setStudentData] = useState({});

	const [guardianName, setGuardianName] = useState("");
	const [guardianContact, setGuardianContact] = useState("");

	useEffect(() => {
		if (userSession) {
			try {
				fetchAppointments();
				fetchStudentById(userSession.id);
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	const fetchAppointments = async () => {
		const response = await fetch(
			`${process.env.BASE_URL}${API_ENDPOINT.GET_APPOINTMENT_BY_STUDENTID}${userSession.id}`,
			{
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			}
		);

		if (!response.ok) {
			console.error("Error fetching appointments");
		}
		const data = await response.json();
		setAppointments(data);

		// Extract counselor IDs from the appointments
		const counselorIds = data.map(
			(appointment) => appointment.counselor.id
		);
		setCounselorIds(counselorIds);
	};

	const fetchStudentById = async (studentId) => {
		const response = await fetch(
			`${process.env.BASE_URL}${API_ENDPOINT.GET_STUDENT_BY_ID}${studentId}`,
			{
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			}
		);

		if (!response.ok) {
			console.error("Error fetching student");
		}
		const data = await response.json();
		setStudentData(data);
	};

	useEffect(() => {
		fetchAppointmentsOnThatDate();
	}, [appointmentDate, counselorIds]);

	const fetchAppointmentsOnThatDate = async () => {
		const appointments = [];
		for (const counselorId of counselorIds) {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.GET_APPOINTMENT_BY_DATE_AND_COUNSELOR}${appointmentDate}&counselorId=${counselorId}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				}
			);
			const data = await response.json();
			if (Array.isArray(data)) {
				appointments.push(...data);
			}
		}
		setAppointmentOnThatDate(appointments);
	};

	const formatDate = (date) => {
		const dateObject = new Date(date);
		const options = { year: "numeric", month: "long", day: "numeric" };
		const finalDate = dateObject.toLocaleDateString("en-US", options);

		return finalDate;
	};

	const handleRowClick = (id) => {
		setSelectedID(id);
		setAppointmentModal(true);
	};

	const showDeleteModal = (id) => {
		setSelectedID(id);
		setDeleteModal(true);
	};

	const handleDelete = async () => {
		// Find
		const selected = appointments.find(
			(appointment) => appointment.appointmentId === selectedID
		);

		// CORS ISSUE - TO BE FIXED
		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.DELETE_APPOINTMENT}${selectedID}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				}
			);
			if (!response.ok) {
				throw new Error("Failed to delete appointment");
			} else {
				toast.success("Appointment deleted successfully");
				fetchAppointments();
				setDeleteModal(false);
				setSelectedID(null);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const showRescheduleModal = (id) => {
		// Set the appointment ID for rescheduling (if necessary) and open the modal
		setSelectedID(id); // If you need the appointment ID
		setRescheduleModal(true); // Open the modal
	};

	const handleReschedule = () => {
		// Logic for getting appointmentId dynamically
		const appointmentId = appointment ? appointment.appointmentId : null;
		if (appointmentId) {
		  setRescheduleModal(true);
		  return appointmentId;
		} else {
		  console.error('No appointment ID found');
		}
	  };
	  

	// handle reschedule // TO BE ADDED AFTER CALENDAR IMPLEMENTATION
	// const handleReschedule = () => {
	// 	// Find
	// 	const selected = appointments.find(
	// 		(appointment) => appointment.id === selectedID
	// 	);

	// Calculate the index range of appointment to display for the current page
	const indexOfLastInquiry = currentPage * AppointmentPerPage;
	const indexOfFirstInquiry = indexOfLastInquiry - AppointmentPerPage;
	const currentAppointments = appointments?.slice(
		indexOfFirstInquiry,
		indexOfLastInquiry
	);

	const handleAddAppointmentClick = () => {
		setIsAddAppointment(true);
		setIsViewAppointment(false);
	};

	const handleViewAppointmentClick = () => {
		setIsAddAppointment(false);
		setIsViewAppointment(true);
	};

	const timeSlots = [
		"08:00",
		"09:00",
		"10:00",
		"11:00",
		"12:00",
		"13:00",
		"14:00",
		"15:00",
		"16:00",
	];

	// Helper function to check if a time slot is taken
	const isTimeSlotTaken = (time) => {
		return appointmentOnThatDate.some(
			(appointment) => appointment.appointmentStartTime === time
		);
	};

	const addTime = (startTime, duration) => {
		// Split the start time and duration into hours and minutes
		let [startHours, startMinutes] = startTime.split(":").map(Number);
		let [durationHours, durationMinutes] = duration.split(":").map(Number);

		// Convert start time to 24-hour format if it's PM
		if (startHours < 12 && startTime.includes("PM")) {
			startHours += 12;
		}

		// Add the duration to the start time
		let endHours = startHours + durationHours;
		let endMinutes = startMinutes + durationMinutes;

		// Adjust minutes and hours if minutes exceed 60
		if (endMinutes >= 60) {
			endHours += Math.floor(endMinutes / 60);
			endMinutes %= 60;
		}

		// Convert back to 12-hour format if needed
		let endPeriod = "AM";
		if (endHours >= 12) {
			endPeriod = "PM";
			if (endHours > 12) {
				endHours -= 12;
			}
		}

		// Format the end time back to a string
		endHours = endHours.toString().padStart(2, "0");
		endMinutes = endMinutes.toString().padStart(2, "0");

		return `${endHours}:${endMinutes} ${endPeriod}`;
	};

	const convertTo24HourFormat = (time) => {
		let [hours, minutes] = time.split(":").map(Number);

		// If the time is 12:00, always treat it as PM
		if (hours === 12) {
			hours = 12; // Keep it as 12 for PM
		} else if (time.includes("PM") && hours < 12) {
			hours += 12;
		} else if (time.includes("AM") && hours === 12) {
			hours = 0;
		}

		const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}`;
		return formattedTime;
	};

	const handleTimeSlotClick = (time) => {
		if (!isTimeSlotTaken(time)) {
			setSelectedTime(time); // Update the selected time
			setSelectedTimeSlot(time);
			const duration = "1:00"; // Duration to add
			const endTime = addTime(time, duration);
			setEndTime(endTime);
			toast.success(`Time slot selected: ${timeFormatter(time)}`);
		}
	};

	const handleAppointmentSubmit = async () => {
		// Open the confirm response modal
		if (
			(studentData && studentData.parentGuardianName === null) ||
			studentData.parentGuardianContactNumber === null
		) {
			(() => document.getElementById("parentInfoModal").showModal())();
		} else {
			setConfirmResponseModal(true);
		}
	};

	const handleParentInfoSubmit = async () => {
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
						institutionalEmail: studentData.institutionalEmail,
						idNumber: studentData.idNumber,
						firstName: studentData.firstName,
						lastName: studentData.lastName,
						gender: studentData.gender,
						contactNumber: studentData.contactNumber,
						password: studentData.password,
						image: studentData.image,
						college: studentData.college,
						program: studentData.program,
						year: studentData.year,
						birthDate: studentData.birthDate,
						permanentAddress: studentData.permanentAddress,
						parentGuardianName: guardianName,
						parentGuardianContactNumber: guardianContact,
					}),
				}
			);

			if (response.ok) {
				toast.success("Student profile updated successfully");
				document.getElementById("parentInfoModal").close();
			}
		} catch (error) {
			console.error("Error updating student profile: ", error);
			toast.error("Failed to update student profile");
		}
	};

	const handleAppointmentSubmitConfirmed = async () => {
		setConfirmResponseModal(false);
		setIsLoading(true);

		const createNotification = async (details) => {
			try {
				const response = await fetch(
					`${process.env.BASE_URL}${API_ENDPOINT.CREATE_NOTIFICATION}${userSession.id}`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${Cookies.get("token")}`,
						},
						body: JSON.stringify({
							receiverId: details.receiverId,
							serviceId: details.appointmentId,
						}),
					}
				);

				if (response.ok) {
					toast.success("Notification created successfully");
				} else {
					const errorData = await response.json();
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

		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.STUDENT_CREATE_APPOINTMENT}${userSession.id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
					body: JSON.stringify({
						appointmentDate: appointmentDate,
						appointmentStartTime:
							convertTo24HourFormat(selectedTime),
						appointmentEndTime: convertTo24HourFormat(endTime),
						appointmentType: appointmentType,
						appointmentPurpose: purpose,
					}),
				}
			);

			if (response.ok) {
				toast.success("Appointment created successfully");
				const appointmentData = await response.json();

				// for student himself
				createNotification({
					receiverId: userSession.id,
					appointmentId: appointmentData.appointmentId,
				});

				// for counselor
				createNotification({
					receiverId: appointmentData.counselor.id,
					appointmentId: appointmentData.appointmentId,
				});
			}

			setPurpose("");
			setAppointmentType("");
			fetchAppointments();
			fetchAppointmentsOnThatDate();
			setIsAddAppointment(false);
			setIsViewAppointment(true);
			setSelectedTime("");
			setSelectedTimeSlot(null);
		} catch (error) {
			console.log(error);
			toast.error("Failed to create appointment");
		} finally {
			setIsLoading(false);
		}
	};

	function timeFormatter(time) {
		let [hours, minutes] = time.split(":").map(Number);
		let period = "AM";

		if (hours >= 12) {
			period = "PM";
			if (hours > 12) {
				hours -= 12;
			}
		} else if (hours === 0) {
			hours = 12;
		}

		// Handle cases where minutes might be missing
		if (isNaN(minutes)) {
			minutes = 0;
		}

		// Ensure 1:00 to 4:00 are PM
		if (hours >= 1 && hours <= 4) {
			period = "PM";
		}

		return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
	}

	const formatDateCalendar = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const finalDateFormatter = (date) => {
		const dateObject = new Date(date);
		const options = { year: "numeric", month: "long", day: "numeric" };
		const formattedDate = dateObject.toLocaleDateString("en-US", options);

		return formattedDate;
	};

	const notifDateFormatter = (dateInput) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		const date = new Date(dateInput);
		return date.toLocaleDateString(undefined, options);
	};

	const notifTimeFormatter = (timeString) => {
		const [time] = timeString.split(":");
		const hour = Number(time);
		const period = hour < 12 ? "AM" : "PM";
		const formattedHour = hour % 12 || 12;
		return `${formattedHour}:00 ${period}`;
	};

	return (
		<div className="min-h-screen w-full">
			<Navbar userType="student" />
			{/* header */}
			{/*<div className="w-full h-[45vh] md:h-[55vh] relative">
				{/* Background image */}
			{/*<div
					className="absolute inset-0 bg-cover bg-center opacity-40"
					style={{
						backgroundImage: `url(${hdrAppointment.src})`,
					}}
				></div>

				{/* Content */}
			{/*<div className="relative z-10 flex items-center justify-center h-full">
					<div className="flex flex-col text-left px-6 md:px-20 lg:px-44 py-10 gap-y-4">
						<h1 className="font-Merriweather text-4xl md:text-6xl lg:text-8xl">
							Appointments
						</h1>
						<p className="w-full md:w-3/4 lg:w-1/2 font-Jaldi text-lg md:text-xl">
							Manage sessions effortlessly and provide tailored guidance and support
							to students through efficient booking and coordination. Streamline your
							scheduling process and ensure students receive personalized attention.
						</p>
					</div>
				</div>
			</div>*/}

			{userSession ? (
				<div>
					<div className="w-full pt-24 flex items-center gap-3 justify-center">
						<button
							className={`font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
								isAddAppointment
									? "bg-maroon text-white"
									: "border-2 border-maroon text-maroon"
							}`}
							onClick={handleAddAppointmentClick}>
							Set Appointment
						</button>
						<button
							className={`font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
								isViewAppointment
									? "bg-maroon text-white"
									: "border-2 border-maroon text-maroon"
							}`}
							onClick={handleViewAppointmentClick}>
							View Appointments
						</button>
					</div>

					{isViewAppointment ? (
						<div className="w-full flex flex-col text-center">
							{/* table*/}
							<div className="overflow-x-auto max-w-full py-10 px-8 md:px-28 lg:px-28 xs:px-1 flex flex-col items-center mt-10">
								<table className="table bg-gray-100">
									{/* head */}
									<thead className="bg-gray-200">
										<tr className="font-bold text-center">
											<th className="py-2">ID</th>
											<th className="py-2">Date</th>
											<th className="py-2">Time</th>
											<th className="py-2">
												Appointment Type
											</th>
											<th className="py-2">Reason</th>
											<th className="py-2">Status</th>
											{/* Delete and Edit*/}
											<th className="no-hover-highlight"></th>
										</tr>
									</thead>
									<tbody>
										{currentAppointments?.map(
											(appointment) => (
												<tr
													key={
														appointment.appointmentId
													}
													onClick={() =>
														handleRowClick(
															appointment.appointmentId
														)
													}
													className="cursor-pointer hover:bg-silver transition duration-300 ease-in-out">
													<td className="text-center py-2">
														{
															appointment.appointmentId
														}
													</td>
													<td>
														<div className="text-center py-2">
															{formatDate(
																appointment.appointmentDate
															)}
														</div>
													</td>
													<td className="text-center py-2">
														{
															appointment.appointmentStartTime
														}
													</td>
													<td className="text-center py-2">
														{
															appointment.appointmentType
														}
													</td>
													<td className="text-center py-2">
														<p className="truncate">
															{appointment
																.appointmentPurpose
																.length > 50
																? `${appointment.appointmentPurpose.substring(
																		0,
																		40
																  )}...`
																: appointment.appointmentPurpose}
														</p>
													</td>
													<td className="text-center flex justify-center">
														<div
															className={`w-28 h-6 rounded-lg border border-black flex items-center justify-center`}>
															{appointment &&
																appointment.appointmentStatus ===
																	"Pending" &&
																"🟡"}
															{appointment &&
																appointment.appointmentStatus ===
																	"Done" &&
																"🟢"}
															{appointment &&
																appointment.appointmentStatus ===
																	"Assigned" &&
																"🔵"}
															{appointment &&
																appointment.appointmentStatus ===
																	"Cancelled" &&
																"🔴"}{" "}
															{/* Added red dot for Cancelled */}
															<span className="ml-2 text-bold text-sm">
																{appointment
																	? appointment.appointmentStatus
																	: ""}
															</span>
														</div>
													</td>

													{/* Delete and Edit */}
													<td>
														<div className="text-center py-2 flex">
															<button
																className="btn btn-xs text-maroon hover:text-silver hover:bg-maroon mr-2" 
																onClick={(
																	e
																) => {
																	e.stopPropagation();
																	showDeleteModal(
																		appointment.appointmentId
																	);
																}}>
																Delete
															</button>
															<button
																className="btn btn-xs text-gray hover:text-gray hover:bg-gold"
																onClick={(
																	e
																) => {
																	e.stopPropagation();
																	showRescheduleModal(
																		appointment.appointmentId
																	);
																}}>
																Reschedule
															</button>
														</div>
													</td>
												</tr>
											)
										)}
									</tbody>
								</table>

								{/* Pagination controls */}
								<div className="join pt-5">
									<button
										onClick={() =>
											setCurrentPage(currentPage - 1)
										}
										disabled={currentPage === 1}
										className="join-item btn w-28">
										Previous
									</button>

									{appointments &&
										[
											...Array(
												Math.ceil(
													appointments.length /
														AppointmentPerPage
												)
											),
										].map((_, index) => (
											<button
												key={index}
												className={`join-item btn ${
													currentPage === index + 1
														? "btn-active"
														: ""
												}`}
												onClick={() =>
													setCurrentPage(index + 1)
												}>
												{index + 1}
											</button>
										))}

									<button
										onClick={() =>
											setCurrentPage(currentPage + 1)
										}
										disabled={
											AppointmentPerPage >
											appointments?.length
										}
										className="join-item btn w-28">
										Next
									</button>
								</div>
							</div>
						</div>
					) : (
						<div className="flex w-full py-10 px-8 md:px-28 lg:px-28 gap-12 justify-center md:flex-row flex-col">
							<div className="flex-1">
								<Calendar
									bordered
									renderCell={renderCell}
									onSelect={(date) => {
										if (
											date >=
											new Date().setHours(0, 0, 0, 0)
										) {
											setAppointmentDate(
												formatDateCalendar(date)
											);
											const formattedDate =
												date.toLocaleDateString(
													"en-US",
													{
														month: "long",
														day: "numeric",
													}
												);
											toast.success(
												`Date selected: ${formattedDate}`
											);
										}
									}}
									disabledDate={(date) =>
										date < new Date().setHours(0, 0, 0, 0)
									}
								/>
							</div>
							{appointmentOnThatDate && (
								<div className="flex-1">
									<h2 className="font-semibold text-lg mb-2">
										Available Time Slots
									</h2>
									<p>
										🛑 To set an appointment, you must first
										select a valid date in the calendar,
										then choose your desired time slot.
									</p>
									<p>
										🛑 Do note that you can only select a
										time slot that has not been taken yet.
									</p>
									<div className="flex flex-wrap gap-2 mt-8">
										{timeSlots.map((time, index) => (
											<button
												key={index}
												disabled={isTimeSlotTaken(time)}
												onClick={() =>
													handleTimeSlotClick(time)
												} // Set the selected time on click
												className={`time-slot-button ${
													isTimeSlotTaken(time)
														? "bg-white border-[1px] border-[#CCE3DE] text-primary-green cursor-not-allowed"
														: time ===
														  selectedTimeSlot
														? "bg-white border-2 border-maroon text-maroon font-semibold" // Apply a different style to the selected time slot
														: "bg-maroon text-white hover:bg-maroon duration-300"
												}  py-2 px-3 rounded-md`}>
												{timeFormatter(time)}
											</button>
										))}
									</div>
									<hr />
									<div className="mt-4">
										<p>
											🤗 Please state the type of
											appointment and your purpose.
										</p>
										<div className="w-full flex lg:flex-col gap-5 my-5 flex-col">
											{/* <TextInput
												value={appointmentType}
												onChange={(e) => setAppointmentType(e.target.value)}
												placeholder="Appointment Type"
												label="Appointment Type"
											/> */}

											<FormControl fullWidth>
												<InputLabel id="appointment-type">
													Appointment Type
												</InputLabel>
												<Select
													labelId="appointment-type"
													id="appointment-type-select"
													value={appointmentType}
													label="Appointment Type"
													onChange={(e) =>
														setAppointmentType(
															e.target.value
														)
													}>
													<MenuItem value="Academic Counseling">
														Academic Counseling
													</MenuItem>
													<MenuItem value="Career Counseling">
														Career Counseling
													</MenuItem>
													<MenuItem value="Personal Counseling">
														Personal Counseling
													</MenuItem>
													<MenuItem value="Wellness Check">
														Wellness Check
													</MenuItem>
													<MenuItem value="Others">
														Others
													</MenuItem>
												</Select>
											</FormControl>

											<TextAreaInput
												value={purpose}
												onChange={(e) =>
													setPurpose(e.target.value)
												}
												placeholder="Purpose"
												label="Purpose"
												className="w-full mb-4 rounded-md "
												id={purpose}
											/>
										</div>
										<hr />
										<div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-5 rounded-xl px-4 py-2 font-Merriweather gap-4 md:gap-6">
											<div className="flex flex-col md:flex-row justify-between items-start md:items-center border-2 border-black  rounded-xl md:rounded-full px-4 py-2 font-Merriweather gap-4 md:gap-0 w-full h-auto md:h-[56px]">
												<div className="font-bold w-full md:w-auto">
													DATE:{" "}
													{finalDateFormatter(
														appointmentDate
													)}
												</div>
												<div className="font-bold w-full md:w-auto">
													TIME:{" "}
													{timeFormatter(
														selectedTime
													)}
												</div>
											</div>
											<div className="w-full md:w-2/12">
												<FullButton
													disabled={
														!selectedTime ||
														isLoading
													}
													onClick={
														handleAppointmentSubmit
													}
													className="w-full">
													{isLoading
														? "Submitting..."
														: "Submit"}
												</FullButton>
											</div>
										</div>

										<dialog
											id="parentInfoModal"
											className="modal">
											<div className="modal-box overflow-scroll">
												<form method="dialog">
													<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
														✕
													</button>
												</form>
												<div className="flex flex-col gap-4 items-center justify-center">
													<h1 className="text-lg font-bold">
														Parent/Guardian
														Information
													</h1>
													<p>
														To proceed, please fill
														this information first
														to proceed.
													</p>
													<div className="flex flex-col gap-2 w-full">
														<TextInput
															value={guardianName}
															onChange={(e) =>
																setGuardianName(
																	e.target
																		.value
																)
															}
															placeholder="Jane Doe"
															label="Parent/Guardian Name"
															id="parent-guardian-name"
														/>

														<TextInput
															value={
																guardianContact
															}
															onChange={(e) =>
																setGuardianContact(
																	e.target
																		.value
																)
															}
															placeholder="09123456789"
															label="Parent/Guardian Contact Number"
															id="parent-guardian-contact"
														/>
														<button
															onClick={
																handleParentInfoSubmit
															}
															className="mt-2 w-full bg-maroon border-2 font-Merriweather text-sm text-white font-semibold rounded-3xl px-4 py-3 hover:scale-95 transition-transform duration-300">
															Submit
														</button>
													</div>
												</div>
											</div>
										</dialog>

										{isLoading && (
											<div className="flex gap-2 items-center mt-5">
												<span className="loading loading-dots loading-lg"></span>
												<span className="text-lg">
													Processing your appointment,
													please wait a moment...
												</span>
											</div>
										)}
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			) : (
				<Loading />
			)}

			{/* modals */}
			{/* Reschedule Modal */}
			{rescheduleModal && (
				<ModalReschedule
					setRescheduleModal={setRescheduleModal}
					handleReschedule = {handleReschedule}
				/>
			)}

			{deleteModal && (
				<ModalDelete
					setDeleteModal={setDeleteModal}
					handleDelete={handleDelete}></ModalDelete>
			)}

			{appointmentModal && (
				<StudentModalAppointmentInfo
					setAppointmentModal={setAppointmentModal}
					selectedID={selectedID}
					appointments={appointments}

					// TO BE ADDED
					// handleRescedule={handleReschedule}
					// handleUpdateStatus={handleUpdateStatus}
				></StudentModalAppointmentInfo>
			)}

			{showAddAppointmentModal && (
				<StudentAddAppointment
					setShowAddAppointmentModal={setShowAddAppointmentModal}
				/>
			)}
			{confirmResponseModal && (
				<ModalConfirmResponseAppointment
					setConfirmResponse={setConfirmResponseModal}
					setAppointmentModal={setAppointmentModal}
					handleResponse={handleAppointmentSubmitConfirmed}
					fetchAppointments={fetchAppointments}
				/>
			)}
		</div>
	);
};

export default dynamic(() => Promise.resolve(Appointment), { ssr: false });

function getTodoList(date) {
	const day = date.getDate();

	switch (day) {
		case 10:
			return [
				// { time: "10:30 am", title: "Meeting" },
				// { time: "12:00 pm", title: "Lunch" },
				// { time: "10:00 pm", title: "Going home to walk the dog" },
				// { time: "11:00 pm", title: "Going home to walk the dog" },
				// { time: "12:00 pm", title: "Going home to walk the dog" },
				// { time: "12:00 pm", title: "Going home to walk the dog" },
			];
		case 15:
			return [
				// { time: "09:30 pm", title: "Products Introduction Meeting" },
				// { time: "12:30 pm", title: "Client entertaining" },
				// { time: "02:00 pm", title: "Product design discussion" },
				// { time: "05:00 pm", title: "Product test and acceptance" },
				// { time: "06:30 pm", title: "Reporting" },
			];
		default:
			return [];
	}
}

function renderCell(date) {
	const list = getTodoList(date);

	const displayList = list.filter((item, index) => index < 1);

	if (list.length) {
		const moreCount = list.length - displayList.length;
		const moreItem = (
			<li>
				<Whisper
					placement="top"
					trigger="click"
					speaker={
						<Popover>
							{list.map((item, index) => (
								<p key={index}>
									<b>{item.time}</b> - {item.title}
								</p>
							))}
						</Popover>
					}>
					<a>{moreCount} more</a>
				</Whisper>
			</li>
		);

		return (
			<ul className="calendar-todo-list">
				{displayList.map((item, index) => (
					<button key={index}>
						<Badge /> <b>{item.time}</b> - {item.title}
					</button>
				))}
				{moreCount ? moreItem : null}
			</ul>
		);
	}

	return null;
}

function timeFormatter(time) {
	let formmatedTime = "";
	switch (time) {
		case "08:00":
		case "09:00":
		case "10:00":
		case "11:00":
			formmatedTime = `${time} AM`;
			break;
		case "12:00":
		case "1:00":
		case "2:00":
		case "3:00":
		case "4:00":
			formmatedTime = `${time} PM`;
			break;
	}

	return formmatedTime;
}
