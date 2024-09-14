"use client";

import FullButton from "@/components/ui/buttons/FullButton";
import TextAreaInput from "@/components/ui/inputs/TextAreaInput";
import StudentAddAppointment from "@/components/ui/modals/counselor/appointments/StudentAddAppointment";
import hdrAppointment from "@/public/images/headers/hdrAppointment.png";
import { useEffect, useState } from "react";
// css
import "@/styles/counselor.css";

// modals
import { Navbar } from "@/components/ui/Navbar";
import StudentModalAppointmentInfo from "@/components/ui/modals/counselor/appointments/ModalAppointmentInfo";
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";

import Load from "@/components/Load";
import Loading from "@/components/Loading";
import ModalConfirmResponseAppointment from "@/components/ui/modals/student/appointments/ModalConfirmedResponseAppointment";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
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

	const [appointments, setAppointments] = useState([]);
	const [appointmentDate, setAppointmentDate] = useState(new Date().toISOString().split("T")[0]);

	const [confirmResponseModal, setConfirmResponseModal] = useState(false);

	const userSession = getUserSession();
	const [selectedTime, setSelectedTime] = useState(""); // State to store the selected time
	const [endTime, setEndTime] = useState(""); // State to store the end time
	const [appointmentType, setAppointmentType] = useState(""); // State to store the selected appointmenttype
	const [purpose, setPurpose] = useState(""); // State to store the purpose of the appointment
	const [appointmentOnThatDate, setAppointmentOnThatDate] = useState([]);
	const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
	const [showAddAppointmentModal, setShowAddAppointmentModal] = useState(false);

	/* Client side - protection */
	if (Cookies.get("token") === undefined || Cookies.get("token") === null) {
		return <Load route="login" />;
	}

	if (userSession.role !== "student") {
		return <Load role={userSession.role} />;
	}

	useEffect(() => {
		if (userSession) {
			try {
				fetchAppointments();
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
	};

	useEffect(() => {
		fetchAppointmentsOnThatDate();
	}, [appointmentDate]);

	const fetchAppointmentsOnThatDate = async () => {
		const response = await fetch(
			`${process.env.BASE_URL}${API_ENDPOINT.GET_APPOINTMENT_BY_DATE}${appointmentDate}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			}
		);
		const data = await response.json();
		console.log(data);
		setAppointmentOnThatDate(data);
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

	const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00"];

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

	const handleTimeSlotClick = (time) => {
		if (!isTimeSlotTaken(time)) {
			setSelectedTime(time); // Update the selected time
			setSelectedTimeSlot(time);
			const duration = "1:00"; // Duration to add
			setEndTime(addTime(selectedTime, duration));
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
						appointmentStartTime: selectedTime,
						appointmentEndTime: endTime,
						appointmentType: appointmentType,
						appointmentPurpose: purpose,
					}),
				}
			);

			if (response.ok) {
				toast.success("Appointment created successfully");
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

	return (
		<div className="min-h-screen w-full">
			{/* navigation bar */}
			<Navbar userType="student" />

			{/* header */}
			<div className="w-full h-[45vh] md:h-[55vh] relative">
				{/* Background image */}
				<div
					className="absolute inset-0 bg-cover bg-center opacity-40"
					style={{
						backgroundImage: `url(${hdrAppointment.src})`,
					}}
				></div>

				{/* Content */}
				<div className="relative z-10 flex items-center justify-center h-full">
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
			</div>

			{userSession ? (
				<div>
					<div className="w-full mt-8 flex items-center gap-3 justify-center">
						<button
							className={`font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
								isAddAppointment
									? "bg-primary-green text-white"
									: "border border-primary-green text-primary-green"
							}`}
							onClick={handleAddAppointmentClick}
						>
							Set Appointment
						</button>
						<button
							className={`font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
								isViewAppointment
									? "bg-primary-green text-white"
									: "border border-primary-green text-primary-green"
							}`}
							onClick={handleViewAppointmentClick}
						>
							View Appointments
						</button>
					</div>

					{isViewAppointment ? (
						<div className="w-full flex flex-col text-center">
							{/* table*/}
							<div className="overflow-x-auto max-w-full lg:px-10 xs:px-1 flex flex-col items-center mt-10">
								<table className="table bg-gray-100">
									{/* head */}
									<thead className="bg-gray-200">
										<tr className="font-bold text-center">
											<th className="py-2">ID</th>
											<th className="py-2">Date</th>
											<th className="py-2">Time</th>
											<th className="py-2">Appointment Type</th>
											<th className="py-2">Reason</th>
											<th className="py-2">Status</th>
											{/* Delete and Edit*/}
											<th className="no-hover-highlight"></th>
										</tr>
									</thead>
									<tbody>
										{currentAppointments?.map((appointment) => (
											<tr
												key={appointment.appointmentId}
												onClick={() =>
													handleRowClick(appointment.appointmentId)
												}
												className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
											>
												<td className="text-center py-2">
													{appointment.appointmentId}
												</td>
												<td>
													<div className="text-center py-2">
														{formatDate(appointment.appointmentDate)}
													</div>
												</td>
												<td className="text-center py-2">
													{appointment.appointmentStartTime}
												</td>
												<td className="text-center py-2">
													{appointment.appointmentType}
												</td>
												<td className="text-center py-2">
													<p className="truncate">
														{appointment.appointmentPurpose.length > 50
															? `${appointment.appointmentPurpose.substring(
																	0,
																	40
															  )}...`
															: appointment.appointmentPurpose}
													</p>
												</td>
												<td className="text-center flex justify-center">
													<div
														className={`w-28 h-6 rounded-lg border border-black flex items-center justify-center`}
													>
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
														<span className="ml-2 text-bold text-sm">
															{appointment
																? appointment.appointmentStatus
																: ""}
														</span>
													</div>
												</td>
												{/* Delete and Edit */}
												<td>
													<div className="text-center py-2">
														<button
															className="btn btn-xs"
															onClick={(e) => {
																e.stopPropagation();
																showDeleteModal(
																	appointment.appointmentId
																);
															}}
														>
															Delete
														</button>
														{/* <button className="btn btn-xs text-green-700">Edit</button> */}
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
						</div>
					) : (
						<div className="flex w-full py-10 px-8 gap-10 justify-center md:flex-row flex-col">
							<div className="flex-1">
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
														? "bg-white border-[1px] border-[#CCE3DE] text-primary-green cursor-not-allowed"
														: time === selectedTimeSlot
														? "bg-primary-green-dark text-white" // Apply a different style to the selected time slot
														: "bg-primary-green text-white hover:bg-primary-green-dark duration-300"
												}  py-2 px-4 rounded-md`}
											>
												{timeFormatter(time)}
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
														setAppointmentType(e.target.value)
													}
												>
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
													<MenuItem value="Others">Others</MenuItem>
												</Select>
											</FormControl>

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
													DATE: {finalDateFormatter(appointmentDate)}
												</div>
												<div className="font-bold w-full md:w-auto">
													TIME: {timeFormatter(selectedTime)}
												</div>
											</div>
											<div className="w-full md:w-2/12">
												<FullButton
													disabled={!selectedTime || isLoading}
													onClick={handleAppointmentSubmit}
													className="w-full"
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

			{/* modals */}
			{deleteModal && (
				<ModalDelete
					setDeleteModal={setDeleteModal}
					handleDelete={handleDelete}
				></ModalDelete>
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
				<StudentAddAppointment setShowAddAppointmentModal={setShowAddAppointmentModal} />
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
				{ time: "10:30 am", title: "Meeting" },
				{ time: "12:00 pm", title: "Lunch" },
				{ time: "10:00 pm", title: "Going home to walk the dog" },
				{ time: "11:00 pm", title: "Going home to walk the dog" },
				{ time: "12:00 pm", title: "Going home to walk the dog" },
				{ time: "12:00 pm", title: "Going home to walk the dog" },
			];
		case 15:
			return [
				{ time: "09:30 pm", title: "Products Introduction Meeting" },
				{ time: "12:30 pm", title: "Client entertaining" },
				{ time: "02:00 pm", title: "Product design discussion" },
				{ time: "05:00 pm", title: "Product test and acceptance" },
				{ time: "06:30 pm", title: "Reporting" },
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
