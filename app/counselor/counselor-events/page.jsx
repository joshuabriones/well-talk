"use client";

import { Navbar } from "@/components/ui/Navbar";
import hdrEvents from "@/public/images/headers/hdrEvents.png";
import { useState } from "react";

// css
import "@/styles/counselor.css";

// modals
import ModalEventsInfo from "@/components/ui/modals/counselor/events/ModalEventsInfo";
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";

export default function Home() {
	const eventsPerPage = 10;

	const [selectedID, setSelectedID] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	//modals
	const [deleteModal, setDeleteModal] = useState(false);
	const [eventModal, setEventModal] = useState(null);

	// events sample
	const [events, setEvents] = useState([
		{
			id: 1,
			date: "2024-05-04",
			time: "10:00 AM",
			user: {
				idNumber: "2024-0001",
				firstName: "John",
				lastName: "Doe",
				institutionalEmail: "john.doe@example.com",
				image: "/path/to/image.jpg",
			},
			name: "Event 1 Name",
			type: "Event 1 Type",
			location: "Location 1",
			additional_notes: "Event 1 Additional Notes here ...",
			status: "Upcoming",
		},
	]);

	const handleRowClick = (id) => {
		setSelectedID(id);
		setEventModal(true);
	};

	const showDeleteModal = (id) => {
		setSelectedID(id);
		setDeleteModal(true);
	};

	const handleDelete = () => {
		// Find
		const selected = events.find((event) => event.id === selectedID);

		// Delete
		const newEvents = events.filter((event) => event.id !== selectedID);
		setEvents(newEvents);

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

	// Calculate the index range of events to display for the current page
	const indexOfLastInquiry = currentPage * eventsPerPage;
	const indexOfFirstInquiry = indexOfLastInquiry - eventsPerPage;
	const currentevents = events?.slice(indexOfFirstInquiry, indexOfLastInquiry);

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
						backgroundImage: `url(${hdrEvents.src})`,
					}}
				></div>

				{/* Content */}
				<div className="relative z-10 flex items-center justify-center h-full">
					<div className="flex flex-col text-left px-44 py-10 gap-y-4">
						<h1 className="font-Merriweather text-8xl">Events</h1>
						<p className="w-1/2 font-Jaldi text-xl">
							Facilitate student events and foster meaningful connections with
							counselors. Students can ask questions, seek guidance, and receive
							personalized support to navigate their academic and personal journey
							effectively.
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
								<th>Event Setter</th>
								<th className="">Event Name</th>
								<th className="">Location</th>
								<th className="text-center">Status</th>
								{/* Delete and Edit*/}
								<th className="no-hover-highlight"></th>
							</tr>
						</thead>
						<tbody>
							{currentevents?.map((event) => (
								<tr
									key={event.id}
									onClick={() => handleRowClick(event.id)}
									className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
								>
									<td className="text-center">{event.id}</td>
									<td>
										<div className="flex flex-row gap-x-3">
											<div className="text-sm">{event.date}</div>
										</div>
									</td>
									<td>
										<div className="flex items-center gap-3">
											<div className="avatar">
												<div className="mask mask-squircle w-12 h-12">
													<img
														src={event.user.image}
														alt="Avatar Tailwind CSS Component"
													/>
												</div>
											</div>
											<div>
												<div className="font-bold">
													{event.user.firstName} {event.user.lastName}
												</div>
												<div className="text-sm opacity-50">
													{event.user.institutionalEmail}
												</div>
											</div>
										</div>
									</td>
									<td>
										<p>
											{event.name.length > 50
												? `${event.name.substring(0, 40)}...`
												: event.name}
										</p>
									</td>
									<td>
										<p>{event.location}</p>
									</td>
									<td className="text-center">
										<div
											className={`w-24 h-5 badge badge-xs ${
												event.status === "Upcoming"
													? "badge-warning"
													: event.status === "Cancelled"
													? "badge-error"
													: event.status === "Completed"
													? "badge-success"
													: ""
											}`}
										>
											{event.status}
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
													showDeleteModal(event.id);
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

						{events &&
							[...Array(Math.ceil((events?.length || 1) / eventsPerPage))].map(
								(_, index) => (
									<button
										key={index}
										className={`join-item btn ${
											currentPage === index + 1 ? "btn-active" : ""
										}`}
										onClick={() => setCurrentPage(index + 1)}
									>
										{index + 1}
									</button>
								)
							)}

						<button
							onClick={() => setCurrentPage(currentPage + 1)}
							disabled={eventsPerPage > events?.length}
							className="join-item btn w-28"
						>
							Next
						</button>
					</div>
				</div>
			</div>

			{/* modals */}
			{deleteModal && (
				<ModalDelete
					setDeleteModal={setDeleteModal}
					handleDelete={handleDelete}
				></ModalDelete>
			)}

			{eventModal && (
				<ModalEventsInfo
					setEventModal={setEventModal}
					selectedID={selectedID}
					events={events}
				></ModalEventsInfo>
			)}
		</div>
	);
}
