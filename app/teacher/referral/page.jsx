"use client";

import hdrReferrals from "@/public/images/headers/hdrReferrals.png";
import { useState } from "react";

// css
import "@/styles/counselor.css";

// modals
import Header from "@/components/Header";
import { Navbar } from "@/components/ui/landing/LandingNav";
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import AddReferral from "@/components/ui/modals/teacher/AddReferral";
import ReferralInfo from "@/components/ui/modals/teacher/ReferralInfo";

export default function Referral() {
	const ReferralsPerPage = 10;

	const [selectedID, setSelectedID] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	//modals
	const [deleteModal, setDeleteModal] = useState(false);
	const [referralModal, setReferralModal] = useState(null);
	const [addReferral, setAddReferral] = useState(false);

	// referrals sample
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

	// sorting
	const [sortOrder, setSortOrder] = useState("asc");

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
		const selected = referrals.find((referral) => referral.id === selectedID);

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

	// Calculate the index range of refferal to display for the current page
	const indexOfLastInquiry = currentPage * ReferralsPerPage;
	const indexOfFirstInquiry = indexOfLastInquiry - ReferralsPerPage;
	const currentList = referrals.slice(indexOfFirstInquiry, indexOfLastInquiry);

	const handleSort = (column) => {
		const order = sortOrder === "asc" ? "desc" : "asc";
		setSortOrder(order);
		const sortedList = [...referrals].sort((a, b) => {
			if (column === "id") {
				return order === "asc" ? a.id - b.id : b.id - a.id;
				// }
				// else if (column === "dateTime") {
				// 	// Combine date and time strings into a single Date object for comparison
				// 	const dateTimeA = new Date(`${a.date} ${a.timeStart}`);
				// 	const dateTimeB = new Date(`${b.date} ${b.timeStart}`);
				// 	return order === "asc" ? dateTimeA - dateTimeB : dateTimeB - dateTimeA;
			} else if (column === "status") {
				// Define priority order for status
				const statusOrder = ["Pending", "Appointed"];
				return order === "asc"
					? statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
					: statusOrder.indexOf(b.status) - statusOrder.indexOf(a.status);
			}
			return 0;
		});
		setReferrals(sortedList);
	};

	return (
		<div className="min-h-screen w-full">
			<Navbar userType="counselor" />
			<Header
				image={hdrReferrals.src}
				desc="Unlock student potential! Teachers, utilize this referral portal to recommend students who could thrive with counseling support. Your insight fuels our commitment to student well-being and success."
			/>

			<div className="flex flex-col">
				<div className="overflow-x-auto px-56 py-10">
					<TableTitle addReferral={setAddReferral} />

					<table className="table bg-gray-100">
						<TableHeaders handleSort={handleSort} />
						<TableBody
							currentList={currentList}
							handleRowClick={handleRowClick}
							showDeleteModal={showDeleteModal}
						/>
					</table>

					<PaginationControls
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						list={referrals}
					/>
				</div>
			</div>

			{deleteModal && (
				<ModalDelete
					setDeleteModal={setDeleteModal}
					handleDelete={handleDelete}
				></ModalDelete>
			)}

			{referralModal && (
				<ReferralInfo
					setReferralModal={setReferralModal}
					selectedID={selectedID}
					referrals={referrals}
				></ReferralInfo>
			)}

			{addReferral && <AddReferral onOpen={setAddReferral}></AddReferral>}
		</div>
	);
}

const TableTitle = ({ addReferral }) => {
	return (
		<div className="flex flex-row justify-between items-center mb-3">
			<h1 className="font-Merriweather text-lg ">Referral Records</h1>
			<button
				className="w-36 font-Merriweather text-sm px-6 py-2 border border-black rounded-lg hover:bg-[#6B9080] hover:text-white hover:border-white transition duration-300 ease-in-out"
				onClick={addReferral}
			>
				Add Referral
			</button>
		</div>
	);
};

const TableHeaders = ({ handleSort }) => {
	return (
		<thead>
			<tr className="bg-gray-200 font-bold">
				<th
					className="hover:bg-gray-300 cursor-pointer p-5 text-center"
					onClick={() => handleSort("id")}
					style={{ width: "5%" }}
				>
					ID
				</th>
				<th>Date and Time</th>
				<th className="p-5">ID Number</th>
				<th>Referred Student</th>
				<th className="">Reason</th>
				<th
					className="hover:bg-gray-300 cursor-pointer p-5 text-center"
					onClick={() => handleSort("status")}
					style={{ width: "10%" }}
				>
					Status
				</th>
				{/* Delete and Edit*/}
				<th className="no-hover-highlight"></th>
			</tr>
		</thead>
	);
};

const TableBody = ({ currentList, handleRowClick, showDeleteModal }) => {
	return (
		<tbody>
			{currentList.map((referrals) => (
				<tr
					key={referrals.id}
					onClick={() => handleRowClick(referrals.id)}
					className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
				>
					<td className="text-center">{referrals.id}</td>
					<td>
						<div className="flex flex-row gap-x-3">
							<div className="text-sm">{referrals.date}</div>
						</div>
					</td>
					<td>
						<div className="flex flex-row gap-x-3">
							<div>{referrals.referred.idNumber}</div>
						</div>
					</td>
					<td>
						<div className="flex items-center gap-3">
							<div className="avatar">
								<div className="mask mask-squircle w-12 h-12">
									<img
										src={referrals.referred.avatar}
										alt="Avatar Tailwind CSS Component"
									/>
								</div>
							</div>
							<div>
								<div className="font-bold">{referrals.referred.name}</div>
								<div className="text-sm opacity-50">{referrals.referred.email}</div>
							</div>
						</div>
					</td>
					<td>
						<p>
							{referrals.reason.length > 50
								? `${referrals.reason.substring(0, 40)}...`
								: referrals.reason}
						</p>
					</td>
					<td className="text-center">
						<div
							className={`w-24 h-5 badge badge-xs ${
								referrals && referrals.status === "Pending"
									? "badge-warning"
									: referrals && referrals.status === "Responded"
									? "badge-success"
									: referrals && referrals.status === "Appointed"
									? "badge-info"
									: ""
							}`}
						>
							{referrals.status}
						</div>
					</td>

					<td>
						<div className="flex flex-row justify-center items-center gap-x-5">
							<button
								className="btn btn-xs"
								onClick={(e) => {
									e.stopPropagation();
									showDeleteModal(referrals.id);
								}}
							>
								Delete
							</button>
							<button className="btn btn-xs text-green-700">Edit</button>
						</div>
					</td>
				</tr>
			))}
		</tbody>
	);
};

const PaginationControls = ({ currentPage, setCurrentPage, list }) => {
	const ReferralsPerPage = 10;

	return (
		<div className="join pt-5 flex flex-row justify-center">
			<button
				onClick={() => setCurrentPage(currentPage - 1)}
				disabled={currentPage === 1}
				className="join-item btn w-28"
			>
				Previous
			</button>
			{[...Array(Math.ceil(list.length / ReferralsPerPage))].map((_, index) => (
				<button
					key={index}
					className={`join-item btn ${currentPage === index + 1 ? "btn-active" : ""}`}
					onClick={() => setCurrentPage(index + 1)}
				>
					{index + 1}
				</button>
			))}
			<button
				onClick={() => setCurrentPage(currentPage + 1)}
				disabled={ReferralsPerPage > list.length}
				className="join-item btn w-28"
			>
				Next
			</button>
		</div>
	);
};
