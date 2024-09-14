import { useEffect, useState } from "react";

import FullButton from "@/components/ui/buttons/FullButton";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import "@/styles/counselor.css";
import Cookies from "js-cookie";

const ModalAppointmentInfo = ({
	setAppointmentModal,
	selectedID,
	appointments,
	setAppointments,
	fetchAppointments,
	role,
}) => {
	const [isChecked, setIsChecked] = useState(true);
	const [appointment, setAppointment] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [notes, setNotes] = useState("");
	const [additionalNotes, setAdditionalNotes] = useState("");
	const userSession = getUserSession();

	const [studentHistoryModal, setStudentHistoryModal] = useState(false);

	const [sampleHistory, setSampleHistory] = useState([
		{
			date: "May 18, 2024 11:00 AM",
			reason: "Consultation for Grades",
			status: "Approved",
		},
		{
			date: "May 18, 2024 11:00 AM",
			reason: "Consultation for Grades",
			status: "Approved",
		},
		{
			date: "May 18, 2024 11:00 AM",
			reason: "Consultation for Grades",
			status: "Approved",
		},
	]);

	// for dialog
	const toggleChecked = () => {
		setIsChecked(!isChecked);
	};

	console.log(appointments);
	// find appointments
	useEffect(() => {
		const handleFindAppointment = () => {
			const foundAppointment = appointments.find(
				(appointment) => appointment.appointmentId === selectedID
			);
			setAppointment(foundAppointment);
		};

		handleFindAppointment();
	}, [selectedID, appointments]);

	const formatDate = (date) => {
		const dateObject = new Date(date);
		const options = { year: "numeric", month: "long", day: "numeric" };
		return dateObject.toLocaleDateString("en-US", options);
	};

	// handle response
	const handleResponse = () => {
		console.log(response);

		// logic to update appointment response, mollaeyo

		// set appointment.status to "Responded", "Pending", "Appointed"
	};

	const handleAcceptAppointment = async () => {
		try {
			const response = await fetch("/api/appointment/mark-appointment-as-approved", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					appointmentId: selectedID,
					counselorId: session.user.id,
				}),
			});
		} catch (error) {
			console.error(error);
		}
		alert("Appointment accepted!");
		setAppointmentModal(false);
	};

	const handleDone = async () => {
		if (notes.trim() === "" || additionalNotes.trim() === "") {
			alert("Please fill out all fields");
			return;
		}

		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.SET_APPOINTMENT_DONE}${selectedID}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
					body: JSON.stringify({
						appointmentNotes: notes,
						appointmentAdditionalNotes: additionalNotes,
					}),
				}
			);

			if (response.ok) {
				alert("Appointment status updated!");
				await fetchAppointments();
			}
		} catch (error) {
			console.error(error);
		}
		setOpenModal(false);
	};

	const handleModalClose = () => {
		setIsChecked(false); // Close the modal
		setAppointmentModal(false); // Close the parent modal
	};
	return (
		<>
			<input
				type="checkbox"
				id="my_modal_7"
				className="modal-toggle"
				checked={isChecked}
				onChange={toggleChecked}
			/>
			<div className="modal" role="dialog">
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
					<label
						className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0 flex items-center justify-center"
						htmlFor="my_modal_7"
						onClick={handleModalClose}
					>
						Close
					</label>
					<div className="bg-white dark:bg-slate-800 shadow-xl border border-slate-200 border-2 rounded-xl hover:-translate-y-1 duration-500 w-full lg:w-3/12 p-2 lg:p-4 relative">
						<section className="items-center md:gap-4 mb-8 justify-center w-full">
							<div className="w-full flex justify-center avatar absolute -top-16 md:-top-24">
								<div className="w-32 md:w-40 rounded-full ring ring-[#6B9080] ring-offset-base-100 ring-offset-1">
									<img src={appointment?.student?.image} alt="appointee avatar" />
								</div>
							</div>

							<div className="flex justify-center flex-col px-12">
								<table className="mb-4 mt-20">
									<tbody>
										{/* <tr>
											<th>ID Number:</th>
											<td>
												{appointment
													? appointment.student?.id
													: ""}
											</td>
										</tr> */}
										<tr>
											<th>Name:</th>
											<td>
												{appointment
													? `${appointment.student?.firstName} ${appointment.student?.lastName}`
													: ""}
											</td>
										</tr>
										<tr>
											<th>Purpose:</th>
											<td>
												{appointment ? appointment.appointmentPurpose : ""}
											</td>
										</tr>
										<tr>
											<th>Additional Notes:</th>
											<td>
												{appointment ? appointment.appointmentNotes : ""}
											</td>
										</tr>
										<tr>
											<th>Date:</th>
											<td>
												{appointment
													? formatDate(appointment.appointmentDate)
													: ""}
											</td>
										</tr>
										<tr>
											<th>Time:</th>
											<td>
												{appointment
													? `${appointment.appointmentStartTime}`
													: ""}
											</td>
										</tr>
										<tr>
											<th>Status:</th>
											<td>
												<div
													className={`w-28 h-6 rounded-lg border border-black flex items-center justify-center`}
												>
													{appointment &&
														appointment.appointmentStatus ===
															"Pending" &&
														"🟡"}
													{appointment &&
														appointment.appointmentStatus === "Done" &&
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
										</tr>
									</tbody>
								</table>
							</div>

							{role === "counselor" && (
								<div className="flex gap-x-4 gap-y-4 mt-3 px-10">
									<FullButton onClick={() => setOpenModal(true)}>
										Update Status
									</FullButton>
								</div>
							)}
						</section>
					</div>
				</div>

				{openModal && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
						<div className="bg-white dark:bg-slate-950 rounded-2xl flex flex-col p-16 justify-between w-2/5 h-2/3 relative">
							<span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-5xl">
								⭐️ ⭐️ ⭐️ ⭐️ ⭐️
							</span>

							<div>
								<h1 className="font-bold text-slate-700 text-2xl mb-1">
									Give feedback
								</h1>
								<p className="text-slate-500">
									Share your invaluable feedback and provide any additional notes
									you deem necessary. Your insights are crucial in our continuous
									effort to enhance our services and better support those in need.
								</p>
							</div>

							<div className="flex flex-col gap-6">
								<textarea
									className="textarea textarea-lg textarea-accent"
									placeholder="Share your feedback here..."
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
								></textarea>
								<textarea
									className="textarea textarea-lg textarea-accent"
									placeholder="Additional notes..."
									value={additionalNotes}
									onChange={(e) => setAdditionalNotes(e.target.value)}
								></textarea>
							</div>
							<button
								className="w-1/3 p-2 bg-green-500 text-black dark:text-white rounded-lg self-end"
								onClick={handleDone}
							>
								Submit
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

{
	/* {studentHistoryModal && (
        <div>
          <StudentHistory
            onOpen={setStudentHistoryModal}
            details={sampleHistory}
          ></StudentHistory>
        </div>
      )} */
}

export default ModalAppointmentInfo;
