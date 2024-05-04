"use client";

import hdrEvents from "@/public/images/headers/hdrEvents.png";
import { useState, useEffect } from "react";

// css
import "@/styles/counselor.css";

// modals
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import ModalReferralInfo from "@/components/ui/modals/counselor/referrals/ModalReferralInfo";

export default function Events() {
	const ReferralsPerPage = 10;

	const [selectedID, setSelectedID] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	//modals
	const [deleteModal, setDeleteModal] = useState(false);
	const [referralModal, setReferralModal] = useState(null);

	// appointment sample
	const [referrals, setReferrals] = useState([
		{
			id: 1,
			date: "Sep 8, 2024",
			time: "10:00 AM",
			referred: {
				name: "France Gieb S. Mier",
				email: "francegieb.mier@example.com",
				avatar: "/avatar-charlotte.png",
				idNumber: "21-2345-678",
			},
			referree: {
				name: "Charlotte Dela Cruz",
				email: "",
				avatar: "/avatar-charlotte.png",
				idNumber: "2345",
			},
			reason: "Request for extended warranty",
			additional_notes:
				"Nam fringilla sapien sed libero finibus ultrices. Proin sed libero vestibulum, maximus nulla nec, fermentum odio.",
			status: "Pending", // Pending, Appointed
		},
		{
			id: 2,
			date: "Sep 10, 2024",
			time: "11:30 AM",
			referred: {
				name: "John Doe",
				email: "john.doe@example.com",
				avatar: "/avatar-john.png",
				idNumber: "32-4567-890",
			},
			referree: {
				name: "Jane Smith",
				email: "",
				avatar: "/avatar-jane.png",
				idNumber: "4567",
			},
			reason: "Product inquiry",
			additional_notes:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor nulla non nisl maximus, nec aliquam turpis laoreet.",
			status: "Pending",
		},
		{
			id: 3,
			date: "Sep 12, 2024",
			time: "3:00 PM",
			referred: {
				name: "Alice Johnson",
				email: "alice.johnson@example.com",
				avatar: "/avatar-alice.png",
				idNumber: "43-6789-012",
			},
			referree: {
				name: "Bob Brown",
				email: "",
				avatar: "/avatar-bob.png",
				idNumber: "6789",
			},
			reason: "Technical support",
			additional_notes:
				"Vivamus nec magna rutrum, molestie lacus nec, eleifend libero. Nulla facilisi. Sed sed risus eu arcu tincidunt bibendum.",
			status: "Appointed",
		},
	]);

	const handleRowClick = (id) => {
		setSelectedID(id);
		setReferralModal(true);
	};

	const showDeleteModal = (id) => {
		setSelectedID(id);
		setDeleteModal(true);
	};

	const handleDelete = () => {
		// Find
		const selected = referrals.find(
			(referral) => referral.id === selectedID
		);

		// Delete
		const newReffera = referrals.filter(
			//
			(referral) => referral.id !== selectedID
		);
		setReferrals(newReffera);

		// Reset
		setDeleteModal(false);
		setSelectedID(null);
	};

	// handle reschedule // TO BE ADDED AFTER CALENDAR IMPLEMENTATION
	// const handleReschedule = () => {
	// 	// Find
	// 	const selected = referrals.find(
	// 		(refferal) => refferal.id === selectedID
	// 	);

	// Calculate the index range of refferal to display for the current page
	const indexOfLastInquiry = currentPage * ReferralsPerPage;
	const indexOfFirstInquiry = indexOfLastInquiry - ReferralsPerPage;
	const currentA = referrals.slice(indexOfFirstInquiry, indexOfLastInquiry);

	return (
		<div className="min-h-screen w-full">
			{/* navigation bar */}
			<div className="h-20 w-full bg-white flex flex-row justify-between items-center px-44">
				<div className="text-2xl text-[#6B9080] font-Merriweather font-bold">
					WellTalk
				</div>
				<div className="flex flex-row gap-x-16">
					<div className="text-lg font-Jaldi">Appointment</div>
					<div className="text-lg font-Jaldi">About</div>
					<div className="text-lg font-Jaldi">Contact</div>
				</div>
			</div>

			{/* header */}
			<div className="w-full h-96 relative">
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
							Facilitate student inquiries and foster meaningful
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
								<th className="">Location</th>
								<th className="text-center">Status</th>
								{/* Delete and Edit*/}
								<th className="no-hover-highlight"></th>
							</tr>
						</thead>
						<tbody>
							{currentA.map((referrals) => (
								<tr
									key={referrals.id}
									onClick={() => handleRowClick(referrals.id)}
									className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
								>
									<td className="text-center">
										{referrals.id}
									</td>
									<td>
										<div className="flex flex-row gap-x-3">
											<div className="text-sm">
												{referrals.date}
											</div>
										</div>
									</td>

									<td>
										<div className="flex items-	center gap-3">
											<div className="avatar">
												<div className="mask mask-squircle w-12 h-12">
													<img
														src={
															referrals.referred
																.avatar
														}
														alt="Avatar Tailwind CSS Component"
													/>
												</div>
											</div>
											<div>
												<div className="font-bold">
													{referrals.referred.name}
												</div>
												<div className="text-sm opacity-50">
													{referrals.referred.email}
												</div>
											</div>
										</div>
									</td>
									<td>
										<p>
											{referrals.reason.length > 50
												? `${referrals.reason.substring(
														0,
														40
												  )}...`
												: referrals.reason}
										</p>
									</td>
									<td className="text-center">
										<div
											className={`w-24 h-5 badge badge-xs ${
												referrals &&
												referrals.status === "Pending"
													? "badge-warning"
													: referrals &&
													  referrals.status ===
															"Responded"
													? "badge-success"
													: referrals &&
													  referrals.status ===
															"Appointed"
													? "badge-info"
													: ""
											}`}
										>
											{referrals.status}
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
														referrals.id
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
						{[
							...Array(
								Math.ceil(referrals.length / ReferralsPerPage)
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
							disabled={ReferralsPerPage > referrals.length}
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

			{referralModal && (
				<ModalReferralInfo
					setReferralModal={setReferralModal}
					selectedID={selectedID}
					referrals={referrals}

					// TO BE ADDED
					// handleRescedule={handleReschedule}
					// handleUpdateStatus={handleUpdateStatus}
				></ModalReferralInfo>
			)}
		</div>
	);
}
