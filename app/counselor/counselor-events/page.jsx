"use client";

import hdrEvents from "@/public/images/headers/hdrEvents.png";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/ui/Navbar";

// css
import "@/styles/counselor.css";

// modals
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import ModalInquiryInfo from "@/components/ui/modals/counselor/inquiries/ModalInquiryInfo";

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
			eventId: 1,
			date: "2024-05-04",
			user: {
				firstName: "John",
				lastName: "Doe",
				institutionalEmail: "john.doe@example.com",
				image: "/path/to/image.jpg",
			},
			subject: "Event 1 Subject",
			location: "Location 1",
			status: "Upcoming",
		},
		{
			eventId: 2,
			date: "2024-05-05",
			user: {
				firstName: "Jane",
				lastName: "Smith",
				institutionalEmail: "jane.smith@example.com",
				image: "/path/to/image.jpg",
			},
			subject: "Event 2 Subject",
			location: "Location 2",
			status: "Completed",
		},
		{
			eventId: 3,
			date: "2024-05-06",
			user: {
				firstName: "Alice",
				lastName: "Johnson",
				institutionalEmail: "alice.johnson@example.com",
				image: "/path/to/image.jpg",
			},
			subject: "Event 3 Subject",
			location: "Location 3",
			status: "Upcoming",
		},
		{
			eventId: 4,
			date: "2024-05-07",
			user: {
				firstName: "Bob",
				lastName: "Brown",
				institutionalEmail: "bob.brown@example.com",
				image: "/path/to/image.jpg",
			},
			subject: "Event 4 Subject",
			location: "Location 4",
			status: "Cancelled",
		},
		{
			eventId: 5,
			date: "2024-05-08",
			user: {
				firstName: "Eve",
				lastName: "Taylor",
				institutionalEmail: "eve.taylor@example.com",
				image: "/path/to/image.jpg",
			},
			subject: "Event 5 Subject",
			location: "Location 5",
			status: "Upcoming",
		},
	]);

	// useEffect(() => {
	// 	const fetchevents = async () => {
	// 		try {
	// 			const response = await fetch("/api/inquiry/view-events");
	// 			if (!response.ok) {
	// 				throw new Error("Failed to fetch events");
	// 			}
	// 			const data = await response.json();
	// 			setEvents(data.events);
	// 		} catch (error) {
	// 			console.error("Error fetching events:", error);
	// 		}
	// 	};

	// 	fetchevents();
	// }, [events, currentPage]);

	const handleRowClick = (id) => {
		setSelectedID(id);
		setEventModal(true);
	};

	const showDeleteModal = (id) => {
		setSelectedID(id);
		setDeleteModal(true);
	};

	const handleDelete = async () => {
		// // Find
		// const selected = events.find((inquiry) => inquiry.id === selectedID);
		// // Delete
		// const newevents = events.filter(
		//   (inquiry) => inquiry.id !== selectedID
		// );
		// setEvents(newevents);
		// try {
		// 	const response = await fetch(`/api/inquiry/delete-inquiry`, {
		// 		method: "PUT",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify({ inquiryId: selectedID }),
		// 	});
		// 	console.log(response);
		// } catch {
		// 	throw new Error("Failed to delete inquiry");
		// }
		// // Reset
		// setDeleteModal(false);
		// setSelectedID(null);
	};

	// Calculate the index range of events to display for the current page
	const indexOfLastInquiry = currentPage * eventsPerPage;
	const indexOfFirstInquiry = indexOfLastInquiry - eventsPerPage;
	const currentevents = events?.slice(
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
						backgroundImage: `url(${hdrEvents.src})`,
					}}
				></div>

				{/* Content */}
				<div className="relative z-10 flex items-center justify-center h-full">
					<div className="flex flex-col text-left px-44 py-10 gap-y-4">
						<h1 className="font-Merriweather text-8xl">Events</h1>
						<p className="w-1/2 font-Jaldi text-xl">
							Facilitate student events and foster meaningful
							connections with counselors. Students can ask
							questions, seek guidance, and receive personalized
							support to navigate their academic and personal
							journey effectively.
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
								<th className=""></th>
								<th className="text-center">Status</th>
								{/* Delete and Edit*/}
								<th className="no-hover-highlight"></th>
							</tr>
						</thead>
						<tbody>
							{currentevents?.map((event) => (
								<tr
									key={event.eventId}
									onClick={() =>
										handleRowClick(event.eventId)
									}
									className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
								>
									<td className="text-center">
										{event.eventId}
									</td>
									<td>
										<div className="flex flex-row gap-x-3">
											<div className="text-sm">
												{event.date}
											</div>
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
													{event.user.firstName}{" "}
													{event.user.lastName}
												</div>
												<div className="text-sm opacity-50">
													{
														event.user
															.institutionalEmail
													}
												</div>
											</div>
										</div>
									</td>
									<td>
										<p>
											{event.subject.length > 50
												? `${event.subject.substring(
														0,
														40
												  )}...`
												: event.subject}
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
													: event.status ===
													  "Cancelled"
													? "badge-error"
													: event.status ===
													  "Completed"
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
													showDeleteModal(
														event.eventId
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

						{events &&
							[
								...Array(
									Math.ceil(
										(events?.length || 1) / eventsPerPage
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
									onClick={() => setCurrentPage(index + 1)}
								>
									{index + 1}
								</button>
							))}

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
				<ModalInquiryInfo
					setEventModal={setEventModal}
					selectedID={selectedID}
					events={events}
				></ModalInquiryInfo>
			)}
		</div>
	);
}
