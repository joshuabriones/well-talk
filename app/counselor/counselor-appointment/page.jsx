"use client";

import FullButton from "@/components/ui/buttons/FullButton";
import HollowButton from "@/components/ui/buttons/HollowButton";
import TextAreaInput from "@/components/ui/inputs/TextAreaInput";
import TextInput from "@/components/ui/inputs/TextInput";
import { useEffect, useState } from "react";
// css
import "@/styles/counselor.css";

// modals
import { Navbar } from "@/components/ui/Navbar";
import AddStudent from "@/components/ui/modals/counselor/appointments/AddStudent";
import ModalAppointmentInfo from "@/components/ui/modals/counselor/appointments/ModalAppointmentInfo";
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import ModalConfirmResponseAppointment from "@/components/ui/modals/student/appointments/ModalConfirmedResponseAppointment";

import Loading from "@/components/Loading";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { Badge, Calendar, Popover, Whisper } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const Appointment = () => {
	const AppointmentPerPage = 10;

	const [selectedID, setSelectedID] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	//modals
	const [deleteModal, setDeleteModal] = useState(false);
	const [appointmentModal, setAppointmentModal] = useState(null);

	const [isAddAppointment, setIsAddAppointment] = useState(true);
	const [isViewAppointment, setIsViewAppointment] = useState(false);

	const [appointments, setAppointments] = useState([]);
	const [students, setStudents] = useState([{}]);
	const [selectedStudentId, setSelectedStudentId] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [openAddStudent, setOpenAddStudent] = useState(false);
	const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
	const [selectedStudent, setSelectedStudent] = useState(null);

	const [confirmResponseModal, setConfirmResponseModal] = useState(false);

	const userSession = getUserSession();

	const [appointmentDate, setAppointmentDate] = useState(new Date().toISOString().split("T")[0]);
	const [selectedTime, setSelectedTime] = useState(""); // State to store the selected time
	const [endTime, setEndTime] = useState(""); // State to store the end time
	const [appointmentType, setAppointmentType] = useState(""); // State to store the selected appointment type
	const [purpose, setPurpose] = useState(""); // State to store the purpose of the appointment
	const [appointmentOnThatDate, setAppointmentOnThatDate] = useState([]);

	// if (Cookies.get("token") === undefined || Cookies.get("token") === null) {
	// 	return <Load route="login" />;
	// }

	// if (userSession.role !== "counselor") {
	// 	return <Load role={userSession.role} />;
	// }

	useEffect(() => {
		if (userSession) {
			try {
				fetchAppointments();
				fetchStudents();
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	const fetchAppointments = async () => {
		const response = await fetch(
			// `${process.env.BASE_URL}${API_ENDPOINT.STUDENT_GET_ALL_APPOINTMENTS}`,
			`${process.env.BASE_URL}${API_ENDPOINT.GET_APPOINTMENTS_BY_COUNSELORID}${userSession?.id}`,
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

		// const filteredData = data.filter(
		// 	(appointment) =>
		// 		appointment?.counselor?.id === userSession?.id &&
		// 		appointment.appointmentStatus === "Assigned"
		// );
		console.log("Appointments: ", data);
		setAppointments(data);
	};

	const fetchStudents = async () => {
		const response = await fetch(`${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_STUDENTS}`, {
			headers: {
				Authorization: `Bearer ${Cookies.get("token")}`,
			},
		});

		if (!response.ok) {
			console.error("Error fetching students");
		}
		const data = await response.json();
		setStudents(data);
	};

	useEffect(() => {
		fetchAppointmentsOnThatDate();
	}, [appointmentDate]);

	const fetchAppointmentsOnThatDate = async (counselorId) => {
		const response = await fetch(
			`${process.env.BASE_URL}${API_ENDPOINT.GET_APPOINTMENT_BY_DATE_AND_COUNSELOR}${appointmentDate}&counselorId=${userSession.id}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			}
		);
		const data = await response.json();
		console.log("Appointments on that date: ", data);
		setAppointmentOnThatDate(data);
	};

	useEffect(() => {
		if (userSession && userSession.counselorId) {
			fetchAppointmentsOnThatDate(userSession.counselorId);
		}
	}, [appointmentDate, userSession]);

	useEffect(() => {
		if (userSession && userSession.counselorId) {
			fetchAppointmentsOnThatDate(userSession.counselorId);
		}
	}, [appointmentDate, userSession]);

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

	const filteredStudents = students.filter((user) =>
		user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// handle reschedule // TO BE ADDED AFTER CALENDAR IMPLEMENTATION
	// const handleReschedule = () => {
	// 	// Find
	// 	const selected = appointments.find(
	// 		(appointment) => appointment.id === selectedID
	// 	);

	// Calculate the index range of appointment to display for the current page
	const indexOfLastInquiry = currentPage * AppointmentPerPage;
	const indexOfFirstInquiry = indexOfLastInquiry - AppointmentPerPage;
	const currentAppointments = appointments?.slice(indexOfFirstInquiry, indexOfLastInquiry);

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
		return appointmentOnThatDate?.some(
			(appointment) => appointment.appointmentStartTime === time
		);
		// return null;
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
		setConfirmResponseModal(true);
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
					// Handle non-200 responses here
					const errorData = await response.json(); // Get error details
					console.error("Error creating notification:", errorData);
					toast.error("Failed to create notification: " + errorData.message);
				}
			} catch (error) {
				console.error("Notification error: ", error);
				toast.error("Failed to create notification due to an error.");
			}
		};

		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.COUNSELOR_CREATE_APPOINTMENT}${userSession.id}?studentId=${selectedStudentId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
					body: JSON.stringify({
						appointmentDate: appointmentDate,
						appointmentStartTime: convertTo24HourFormat(selectedTime),
						appointmentEndTime: convertTo24HourFormat(endTime),
						appointmentType: appointmentType,
						appointmentPurpose: purpose,
					}),
				}
			);

			if (response.ok) {
				toast.success("Appointment created successfully");
				const appointmentData = await response.json();

				createNotification({
					receiverId: selectedStudentId,
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

		if (hours === 12) {
			period = "PM";
		} else if (hours > 12) {
			period = "PM";
			hours -= 12;
		} else if (hours === 0) {
			hours = 12;
		}

		// Handle cases where minutes might be missing
		if (isNaN(minutes)) {
			minutes = 0;
		}

		return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
	}

	const formatDateCalendar = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
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
			{/* navigation bar */}
			<Navbar userType="counselor" />

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
									: "bg-white border-2 border-maroon text-maroon"
							}`}
							onClick={handleAddAppointmentClick}
						>
							Set Appointment
						</button>
						<button
							className={`font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
								isViewAppointment
									? "bg-maroon text-white"
									: "bg-white border-2 border-maroon text-maroon"
							}`}
							onClick={handleViewAppointmentClick}
						>
							View Appointments
						</button>
					</div>
					{appointments && isViewAppointment ? (
						<div className="overflow-x-auto max-w-full lg:px-10 xs:px-1 flex flex-col items-center mt-10">
							<table className="table bg-gray-100">
								{/* head */}
								<thead className="bg-gray-200">
									<tr className="font-bold text-center">
										<th className="text-center p-5">ID</th>
										<th>Date and Time</th>
										<th className="p-5">ID Number</th>
										<th>Student</th>
										<th className="">Reason</th>
										<th className="text-center">Status</th>
										{/* Delete and Edit*/}
										<th className="no-hover-highlight"></th>
									</tr>
								</thead>
								<tbody>
									{currentAppointments?.map((appointments) => (
										<tr
											key={appointments.appointmentId}
											onClick={() =>
												handleRowClick(appointments.appointmentId)
											}
											className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
										>
											<td className="text-center">
												{appointments.appointmentId}
											</td>
											<td>
												<div className="flex flex-row gap-x-3">
													<div className="text-sm">
														{formatDate(appointments.appointmentDate)}{" "}
														{appointments.appointmentStartTime}
													</div>
												</div>
											</td>
											<td>
												<div className="flex flex-row gap-x-3">
													<div>{appointments.student?.idNumber}</div>
												</div>
											</td>
											<td>
												<div className="flex items-center gap-3">
													<div className="avatar">
														<div className="mask mask-squircle w-12 h-12">
															<img
																src={appointments.student?.image}
																alt="Avatar Tailwind CSS Component"
															/>
														</div>
													</div>
													<div>
														<div className="font-bold">
															{appointments.student?.firstName}{" "}
															{appointments.student?.lastName}
														</div>
														<div className="text-sm opacity-50">
															{
																appointments.student
																	?.institutionalEmail
															}
														</div>
													</div>
												</div>
											</td>
											<td>
												<p>
													{appointments?.appointmentPurpose?.length > 50
														? `${appointments?.appointmentPurpose?.substring(
																0,
																40
														  )}...`
														: appointments?.appointmentPurpose}
												</p>
											</td>
											<td className="text-center flex justify-center">
												<div
													className={`w-28 h-6 rounded-lg border border-black flex items-center justify-center`}
												>
													{appointments &&
														appointments.appointmentStatus ===
															"Pending" &&
														"🟡"}
													{appointments &&
														appointments.appointmentStatus === "Done" &&
														"🟢"}
													{appointments &&
														appointments.appointmentStatus ===
															"Assigned" &&
														"🔵"}
													<span className="ml-2 text-bold text-sm">
														{appointments
															? appointments.appointmentStatus
															: ""}
													</span>
												</div>
											</td>

											{/* Delete and Edit */}
											<td>
												<div className="flex lg:flex-row justify-center items-center lg:gap-x-5 xs:gap-2 xs:flex-col">
													<button
														className="btn btn-xs"
														onClick={(e) => {
															// Stop event propagation to prevent row hover effect
															e.stopPropagation();
															showDeleteModal(
																appointments.appointmentId
															);
														}}
													>
														Delete
													</button>
													<button className="btn btn-xs text-green-700">
														Edit
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>

							{/* Pagination controls */}
							<div className="join pt-5">
								<button
									onClick={() => setCurrentPage(currentPage - 1)}
									disabled={currentPage === 1}
									className="join-item btn w-28"
								>
									Previous
								</button>

								{appointments &&
									[
										...Array(
											Math.ceil(appointments.length / AppointmentPerPage)
										),
									].map((_, index) => (
										<button
											key={index}
											className={`join-item btn ${
												currentPage === index + 1 ? "btn-active" : ""
											}`}
											onClick={() => setCurrentPage(index + 1)}
										>
											{index + 1}
										</button>
									))}

								<button
									onClick={() => setCurrentPage(currentPage + 1)}
									disabled={AppointmentPerPage > appointments?.length}
									className="join-item btn w-28"
								>
									Next
								</button>
							</div>
						</div>
					) : (
						<div className="flex w-full py-10 px-8 gap-10 justify-center md:flex-row flex-col">
							<div className="flex-1 flex flex-col gap-2">
								<Calendar
									bordered
									renderCell={renderCell}
									onSelect={(date) => {
										if (date >= new Date().setHours(0, 0, 0, 0)) {
											setAppointmentDate(formatDateCalendar(date));
											const formattedDate = date.toLocaleDateString("en-US", {
												month: "long",
												day: "numeric",
											});
											toast.success(`Date selected: ${formattedDate}`);
										}
									}}
									disabledDate={(date) => date < new Date().setHours(0, 0, 0, 0)}
								/>
							</div>
							{appointmentOnThatDate && (
								<div className="flex-1">
									<h2 className="font-semibold text-lg mb-2">
										Available Time Slots
									</h2>
									<p>
										🛑 To set an appointment, you must first select a valid date
										in the calendar, then choose your desired time slot.
									</p>
									<p>
										🛑 Do note that you can only select a time slot that has not
										been taken yet.
									</p>
									<div className="flex flex-wrap gap-2 mt-8">
										{timeSlots.map((time, index) => (
											<button
												key={index}
												disabled={isTimeSlotTaken(time)}
												onClick={() => handleTimeSlotClick(time)} // Set the selected time on click
												className={`time-slot-button ${
													isTimeSlotTaken(time)
														? "bg-white border-2 border-maroon text-maroon cursor-not-allowed"
														: time === selectedTimeSlot
														? "bg-white border-2 border-maroon text-maroon font-semibold" // Apply a different style to the selected time slot
														: "bg-maroon text-white hover:bg-primary-green-dark duration-300"
												}  py-2 px-3 rounded-md`}
											>
												{timeFormatter(time)}
											</button>
										))}
									</div>
									<hr />
									<p className="mb-2">
										👨🏻‍🎓 Select a student you wish to assign an appointment
									</p>
									<div className="flex flex-row justify-between items-center space-x-4 pr-2 md:pr-3">
										<div className="flex-grow">
											<SearchInput
												searchTerm={searchTerm}
												setSearchTerm={setSearchTerm}
											/>
										</div>
										<div className="w-5/12 md:w-2/12">
											<HollowButton onClick={() => setOpenAddStudent(true)}>
												Add Student
											</HollowButton>
										</div>
									</div>

									<div className="mt-4 w-full max-h-[10%] overflow-y-scroll text-left">
										{filteredStudents.map((student) => (
											<button
												onClick={() => {
													toast.success(
														`Student selected: ${student.firstName} ${student.lastName}`
													);
													setSelectedStudentId(student.id);
													setSelectedStudent(student.id); // Update the selected student
												}}
												className={`bg-maroon text-maroon font-semibold block w-full mb-2 px-5 py-2 text-left hover:bg-primary-green-dark duration-150 rounded-lg ${
													selectedStudent === student.id
														? "bg-white border-2 border-maroon text-maroon font-semibold"
														: "text-white" // Apply a different style to the selected student
												}`}
												key={student.id}
											>
												{student.idNumber} ⸺ {student.firstName}{" "}
												{student.lastName}
											</button>
										))}
									</div>
									<hr />
									<div className="mt-4">
										<p>
											🤗 Please state the type of appointment and your
											purpose.
										</p>
										<div className="w-full flex lg:flex-col gap-5 my-5 flex-col">
											<TextInput
												value={appointmentType}
												onChange={(e) => setAppointmentType(e.target.value)}
												placeholder="Appointment Type"
												label="Appointment Type"
											/>
											<TextAreaInput
												value={purpose}
												onChange={(e) => setPurpose(e.target.value)}
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
													STUDENT: {selectedStudentId}
												</div>
												<div className="font-bold w-full md:w-auto">
													DATE: {appointmentDate}
												</div>
												<div className="font-bold w-full md:w-auto">
													TIME: {timeFormatter(selectedTime)}
												</div>
											</div>
											<div className="w-full md:w-2/12">
												<FullButton
													onClick={handleAppointmentSubmit}
													className="w-full"
													disabled={
														!selectedStudentId ||
														!selectedTime ||
														!appointmentDate ||
														!purpose ||
														!appointmentType ||
														isLoading
													}
												>
													{isLoading ? "Submitting..." : "Submit"}
												</FullButton>
											</div>
										</div>
										{isLoading && (
											<div className="flex gap-2 items-center mt-5">
												<span className="loading loading-dots loading-lg"></span>
												<span className="text-lg">
													Processing your appointment, please wait a
													moment...
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

			{deleteModal && (
				<ModalDelete
					setDeleteModal={setDeleteModal}
					handleDelete={handleDelete}
					prompt={"appointment"}
				></ModalDelete>
			)}

			{appointmentModal && (
				<ModalAppointmentInfo
					setAppointmentModal={setAppointmentModal}
					selectedID={selectedID}
					appointments={appointments}
					setAppointments={setAppointments}
					fetchAppointments={fetchAppointments}
					role="counselor"
					// TO BE ADDED
					// handleRescedule={handleReschedule}
					// handleUpdateStatus={handleUpdateStatus}
				></ModalAppointmentInfo>
			)}

			{openAddStudent && <AddStudent setOpenAddStudent={setOpenAddStudent} />}
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

function SearchInput({ searchTerm, setSearchTerm }) {
	return (
		<div class="relative">
			<input
				type="text"
				placeholder="Search students..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				class="relative w-full h-12 px-4 transition-all border rounded-xl text-slate-500 autofill:bg-white"
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="absolute w-6 h-6 cursor-pointer top-3 right-4 stroke-slate-400 peer-disabled:cursor-not-allowed"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth="1.5"
				aria-hidden="true"
				aria-labelledby="title-9 description-9"
				role="graphics-symbol"
			>
				<title id="title-9">Search icon</title>
				<desc id="description-9">Icon description here</desc>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>
		</div>
	);
}

function getTodoList(date) {
	const day = date.getDate();

	switch (day) {
		// case 10:
		//   return [
		//     { time: "10:30 am", title: "Meeting" },
		//     { time: "12:00 pm", title: "Lunch" },
		//     { time: "10:00 pm", title: "Going home to walk the dog" },
		//     { time: "11:00 pm", title: "Going home to walk the dog" },
		//     { time: "12:00 pm", title: "Going home to walk the dog" },
		//     { time: "12:00 pm", title: "Going home to walk the dog" },
		//   ];
		// case 15:
		//   return [
		//     { time: "09:30 pm", title: "Products Introduction Meeting" },
		//     { time: "12:30 pm", title: "Client entertaining" },
		//     { time: "02:00 pm", title: "Product design discussion" },
		//     { time: "05:00 pm", title: "Product test and acceptance" },
		//     { time: "06:30 pm", title: "Reporting" },
		//   ];
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
					}
				>
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
