"use client";

import hdrAppointment from "@/public/images/headers/hdrAppointment.png";
import { useState } from "react";

// css
import "@/styles/counselor.css";

// modals
import { Navbar } from "@/components/ui/landing/LandingNav";
import ModalAppointmentInfo from "@/components/ui/modals/counselor/appointments/ModalAppointmentInfo";
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";

export default function Appointment() {
	const AppointmentPerPage = 10;

	const [selectedID, setSelectedID] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	//modals
	const [deleteModal, setDeleteModal] = useState(false);
	const [appointmentModal, setAppointmentModal] = useState(null);

	// appointment sample
	const [appointments, setAppointments] = useState([
		{
			id: 20,
			dateTime: "Sep 8, 2024 3:30 PM",
			date: "Sep 8, 2024",
			time: "9:00 AM to 10:00 AM",
			setter: {
				name: "Charlotte Johnson",
				email: "charlotte.johnson@example.com",
				avatar: "/avatar-charlotte.png",
				idNumber: "21-2345-678",
			},
			subject: "Request for extended warranty",
			details:
				"Nam fringilla sapien sed libero finibus ultrices. Proin sed libero vestibulum, maximus nulla nec, fermentum odio.",
			status: "Responded", // Pending, Responded, Appointed
		},
		{
			id: 21,
			dateTime: "Sep 8, 2024 3:30 PM",
			setter: {
				name: "Charlotte Johnson",
				email: "charlotte.johnson@example.com",
				avatar: "/avatar-charlotte.png",
				idNumber: "21-2345-678",
			},
			subject: "Request for extended warranty",
			details:
				"Nam fringilla sapien sed libero finibus ultrices. Proin sed libero vestibulum, maximus nulla nec, fermentum odio.",
			status: "Pending", // Pending, Responded, Appointed
		},
		{
			id: 22,
			dateTime: "Sep 8, 2024 3:30 PM",
			setter: {
				name: "Charlotte Johnson",
				email: "charlotte.johnson@example.com",
				avatar: "/avatar-charlotte.png",
				idNumber: "21-2345-678",
			},
			subject: "Request for extended warranty",
			details:
				"Nam fringilla sapien sed libero finibus ultrices. Proin sed libero vestibulum, maximus nulla nec, fermentum odio.",
			status: "Appointed", // Pending, Responded, Appointed
		},
	]);

	const handleRowClick = (id) => {
		setSelectedID(id);
		setAppointmentModal(true);
	};

	const showDeleteModal = (id) => {
		setSelectedID(id);
		setDeleteModal(true);
	};

	const handleDelete = () => {
		// Find
		const selected = appointments.find(
			(appointment) => appointment.id === selectedID
		);

		// Delete
		const newAppointments = appointments.filter(
			(appointment) => appointment.id !== selectedID
		);
		setAppointments(newAppointments);

		// Reset
		setDeleteModal(false);
		setSelectedID(null);
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

	return (
		<div className="min-h-screen w-full">
			{/* navigation bar */}
			<Navbar userType="counselor" />

			{/* header */}
			<div className="w-full h-[55vh] relative">
				{/* Background image */}
				<div
					className="absolute inset-0 bg-cover bg-center opacity-40"
					style={{
						backgroundImage: `url(${hdrAppointment.src})`,
					}}></div>

				{/* Content */}
				<div className="relative z-10 flex items-center justify-center h-full">
					<div className="flex flex-col text-left px-44 py-10 gap-y-4">
						<h1 className="font-Merriweather text-8xl">
							Appointments
						</h1>
						<p className="w-1/2 font-Jaldi text-xl">
							Manage sessions effortlessly and provide tailored
							guidance and support to students through efficient
							booking and coordination. Streamline your scheduling
							process and ensure students receive personalized
							attention.
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col text-center">
				{/* table*/}
				<div className="overflow-x-auto px-56 py-10 ">
					<table className="table bg-gray-100">
						{/* head */}
						<thead>
							<tr className="bg-gray-200 font-bold">
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
									key={appointments.id}
									onClick={() =>
										handleRowClick(appointments.id)
									}
									className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out">
									<td className="text-center">
										{appointments.id}
									</td>
									<td>
										<div className="flex flex-row gap-x-3">
											<div className="text-sm">
												{appointments.dateTime}
											</div>
										</div>
									</td>
									<td>
										<div className="flex flex-row gap-x-3">
											<div>
												{appointments.setter.idNumber}
											</div>
										</div>
									</td>
									<td>
										<div className="flex items-center gap-3">
											<div className="avatar">
												<div className="mask mask-squircle w-12 h-12">
													<img
														src={
															appointments.setter
																.avatar
														}
														alt="Avatar Tailwind CSS Component"
													/>
												</div>
											</div>
											<div>
												<div className="font-bold">
													{appointments.setter.name}
												</div>
												<div className="text-sm opacity-50">
													{appointments.setter.email}
												</div>
											</div>
										</div>
									</td>
									<td>
										<p>
											{appointments.subject.length > 50
												? `${appointments.subject.substring(
														0,
														40
												  )}...`
												: appointments.subject}
										</p>
									</td>
									<td className="text-center">
										<div
											className={`w-24 h-5 badge badge-xs ${
												appointments &&
												appointments.status ===
													"Pending"
													? "badge-warning"
													: appointments &&
													  appointments.status ===
															"Responded"
													? "badge-success"
													: appointments &&
													  appointments.status ===
															"Appointed"
													? "badge-info"
													: ""
											}`}>
											{appointments.status}
										</div>
									</td>

									{/* Delete and Edit */}
									<td>
										<div className="flex flex-row justify-center items-center gap-x-5">
											<button
												className="btn btn-xs"
												onClick={(e) => {
													// Stop event propagation to prevent row hover effect
													e.stopPropagation();
													showDeleteModal(
														appointments.id
													);
												}}>
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
							className="join-item btn w-28">
							Previous
						</button>

						{appointments &&
							[
								...Array(
									Math.ceil(
										appointments.length / AppointmentPerPage
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
									onClick={() => setCurrentPage(index + 1)}>
									{index + 1}
								</button>
							))}

						<button
							onClick={() => setCurrentPage(currentPage + 1)}
							disabled={AppointmentPerPage > appointments.length}
							className="join-item btn w-28">
							Next
						</button>
					</div>
				</div>
			</div>

			{/* modals */}
			{deleteModal && (
				<ModalDelete
					setDeleteModal={setDeleteModal}
					handleDelete={handleDelete}></ModalDelete>
			)}

			{appointmentModal && (
				<ModalAppointmentInfo
					setAppointmentModal={setAppointmentModal}
					selectedID={selectedID}
					appointments={appointments}

					// TO BE ADDED
					// handleRescedule={handleReschedule}
					// handleUpdateStatus={handleUpdateStatus}
				></ModalAppointmentInfo>
			)}
		</div>
	);
}
