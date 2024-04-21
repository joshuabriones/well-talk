"use client";

import hdrInquiry from "@/public/images/headers/hdrInquiry.png";
import { useState, useEffect } from "react";

// css
import "@/styles/counselor.css";

// modals
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import ModalInquiryInfo from "@/components/ui/modals/counselor/inquiries/ModalInquiryInfo";

export default function Home() {
	const inquiriesPerPage = 10;

	const [selectedID, setSelectedID] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	//modals
	const [deleteModal, setDeleteModal] = useState(false);
	const [inquiryModal, setInquiryModal] = useState(null);

	// inquiries sample
	const [inquiries, setInquiries] = useState([
		{
			id: 1,
			dateTime: "Feb 27, 2023 12:00 PM",
			inquirer: {
				name: "France Gieb S. Mier",
				email: "francegieb.mier@cit.edu",
				avatar: "/tailwind-css-component-profile-2@56w.png",
				idNumber: "21-2724-328",
			},
			subject: "Girl, I am about to kill myself!",
			details:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
			status: "Pending",
			response: "",
		},
		{
			id: 2,
			dateTime: "Mar 15, 2023 10:30 AM",
			inquirer: {
				name: "John Doe",
				email: "johndoe@example.com",
				avatar: "/default-avatar.png",
				idNumber: "21-1234-567",
			},
			subject: "Need assistance with account activation",
			details:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.",
			status: "Responded",
			response:
				"Thank you for reaching out. We have activated your account. Please let us know if you need further assistance.",
		},
		{
			id: 3,
			dateTime: "Apr 5, 2023 4:45 PM",
			inquirer: {
				name: "Alice Smith",
				email: "alice.smith@example.com",
				avatar: "/user-avatar.png",
				idNumber: "21-9876-543",
			},
			subject: "Query regarding product specifications",
			details:
				"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			status: "Responded",
		},
		// Add more inquiries as needed
		{
			id: 4,
			dateTime: "May 10, 2023 9:15 AM",
			inquirer: {
				name: "Emma Johnson",
				email: "emma.johnson@example.com",
				avatar: "/avatar-emma.png",
				idNumber: "21-6543-210",
			},
			subject: "Payment issue",
			details:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget leo vitae velit feugiat vestibulum. Integer commodo neque non ultricies.",
			status: "Pending",
		},
		{
			id: 5,
			dateTime: "Jun 20, 2023 2:00 PM",
			inquirer: {
				name: "Michael Brown",
				email: "michael.brown@example.com",
				avatar: "/avatar-michael.png",
				idNumber: "21-0123-456",
			},
			subject: "Delivery delay",
			details:
				"Suspendisse potenti. Ut tincidunt magna a libero faucibus, eget vestibulum urna consequat. In hac habitasse platea dictumst.",
			status: "Responded",
		},
		{
			id: 6,
			dateTime: "Jul 8, 2023 11:45 AM",
			inquirer: {
				name: "Sophia Martinez",
				email: "sophia.martinez@example.com",
				avatar: "/avatar-sophia.png",
				idNumber: "21-7890-123",
			},
			subject: "Request for refund",
			details:
				"Vestibulum tristique ex sed dolor tincidunt, at ultrices elit viverra. Nam vehicula orci vel lectus luctus, vel convallis mi ultricies.",
			status: "Responded",
		},
		{
			id: 7,
			dateTime: "Aug 18, 2023 3:30 PM",
			inquirer: {
				name: "Daniel Wilson",
				email: "daniel.wilson@example.com",
				avatar: "/avatar-daniel.png",
				idNumber: "21-3456-789",
			},
			subject: "Technical assistance required",
			details:
				"Pellentesque non justo vitae turpis ultrices ultricies sit amet non ex. Donec vel tincidunt nisi.",
			status: "Pending",
		},
		{
			id: 8,
			dateTime: "Sep 5, 2023 5:00 PM",
			inquirer: {
				name: "Olivia Taylor",
				email: "olivia.taylor@example.com",
				avatar: "/avatar-olivia.png",
				idNumber: "21-5678-901",
			},
			subject: "Complaint regarding product quality",
			details:
				"Duis euismod, mi sed feugiat vehicula, ipsum quam sagittis nisl, nec consectetur nibh lacus id velit.",
			status: "Responded",
		},
		{
			id: 9,
			dateTime: "Oct 12, 2023 1:20 PM",
			inquirer: {
				name: "Ethan White",
				email: "ethan.white@example.com",
				avatar: "/avatar-ethan.png",
				idNumber: "21-8901-234",
			},
			subject: "Feedback on recent purchase",
			details:
				"Morbi mattis ligula eu eros pretium ullamcorper. Donec tincidunt, libero eu laoreet dapibus, ipsum eros iaculis velit, at tempor neque velit vitae elit.",
			status: "Responded",
		},
		{
			id: 10,
			dateTime: "Nov 30, 2023 10:10 AM",
			inquirer: {
				name: "Ava Anderson",
				email: "ava.anderson@example.com",
				avatar: "/avatar-ava.png",
				idNumber: "21-2345-678",
			},
			subject: "Query about warranty",
			details:
				"Phasellus ullamcorper, libero sit amet commodo interdum, orci tortor tempus lacus, vel volutpat risus nibh id mi.",
			status: "Pending",
		},
		{
			id: 11,
			dateTime: "Dec 8, 2023 4:40 PM",
			inquirer: {
				name: "Noah Clark",
				email: "noah.clark@example.com",
				avatar: "/avatar-noah.png",
				idNumber: "21-6789-012",
			},
			subject: "Assistance needed with software installation",
			details:
				"Integer nec lectus sem. In ultricies tempus tortor, ut convallis leo mattis non. Mauris sed dui in tellus euismod rutrum ac quis quam.",
			status: "Responded",
		},
		{
			id: 12,
			dateTime: "Jan 20, 2024 11:55 AM",
			inquirer: {
				name: "Mia Lewis",
				email: "mia.lewis@example.com",
				avatar: "/avatar-mia.png",
				idNumber: "21-0123-456",
			},
			subject: "Update contact information",
			details:
				"Nulla facilisi. Sed vel ipsum nec purus tempor volutpat. Nullam suscipit ex non efficitur auctor.",
			status: "Responded",
		},
		{
			id: 13,
			dateTime: "Feb 15, 2024 9:00 AM",
			inquirer: {
				name: "Liam Harris",
				email: "liam.harris@example.com",
				avatar: "/avatar-liam.png",
				idNumber: "21-3456-789",
			},
			subject: "Account password reset",
			details:
				"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
			status: "Pending",
		},
		{
			id: 14,
			dateTime: "Mar 2, 2024 2:30 PM",
			inquirer: {
				name: "Emma Wilson",
				email: "emma.wilson@example.com",
				avatar: "/avatar-emma.png",
				idNumber: "21-6789-012",
			},
			subject: "Query about shipping options",
			details:
				"Fusce nec tellus id sapien dictum rutrum. Sed at libero non quam posuere vestibulum.",
			status: "Responded",
		},
		{
			id: 15,
			dateTime: "Apr 10, 2024 11:45 AM",
			inquirer: {
				name: "William Brown",
				email: "william.brown@example.com",
				avatar: "/avatar-william.png",
				idNumber: "21-1234-567",
			},
			subject: "Request for product demo",
			details:
				"Donec eu nulla velit. Quisque ullamcorper ipsum nec ipsum varius, at vestibulum mauris aliquet.",
			status: "Responded",
		},
		{
			id: 16,
			dateTime: "May 20, 2024 3:00 PM",
			inquirer: {
				name: "Isabella Clark",
				email: "isabella.clark@example.com",
				avatar: "/avatar-isabella.png",
				idNumber: "21-8901-234",
			},
			subject: "Issue with website login",
			details:
				"Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis in nisl sit amet dolor euismod congue.",
			status: "Pending",
		},
		{
			id: 17,
			dateTime: "Jun 5, 2024 4:15 PM",
			inquirer: {
				name: "James Taylor",
				email: "james.taylor@example.com",
				avatar: "/avatar-james.png",
				idNumber: "21-2345-678",
			},
			subject: "Feedback on customer service experience",
			details:
				"Integer sed lorem vitae libero placerat efficitur. Nullam nec mauris sit amet dui blandit vehicula.",
			status: "Responded",
		},
		{
			id: 18,
			dateTime: "Jul 12, 2024 10:20 AM",
			inquirer: {
				name: "Emily Martinez",
				email: "emily.martinez@example.com",
				avatar: "/avatar-emily.png",
				idNumber: "21-7890-123",
			},
			subject: "Question about pricing plans",
			details:
				"Phasellus auctor odio eu nisi venenatis, quis faucibus quam rhoncus. Nulla facilisi.",
			status: "Responded",
		},
		{
			id: 19,
			dateTime: "Aug 25, 2024 1:50 PM",
			inquirer: {
				name: "Alexander White",
				email: "alexander.white@example.com",
				avatar: "/avatar-alexander.png",
				idNumber: "21-0123-456",
			},
			subject: "Assistance with software upgrade",
			details:
				"Sed lobortis velit vitae magna aliquam vehicula. Sed a turpis at libero vehicula malesuada.",
			status: "Pending",
		},
		{
			id: 20,
			dateTime: "Sep 8, 2024 3:30 PM",
			inquirer: {
				name: "Charlotte Johnson",
				email: "charlotte.johnson@example.com",
				avatar: "/avatar-charlotte.png",
				idNumber: "21-2345-678",
			},
			subject: "Request for extended warranty",
			details:
				"Nam fringilla sapien sed libero finibus ultrices. Proin sed libero vestibulum, maximus nulla nec, fermentum odio.",
			status: "Responded",
		},
	]);

	const handleRowClick = (id) => {
		setSelectedID(id);
		setInquiryModal(true);
	};

	const showDeleteModal = (id) => {
		setSelectedID(id);
		setDeleteModal(true);
	};

	const handleDelete = () => {
		// Find
		const selected = inquiries.find((inquiry) => inquiry.id === selectedID);

		// Delete
		const newInquiries = inquiries.filter(
			(inquiry) => inquiry.id !== selectedID
		);
		setInquiries(newInquiries);

		// Reset
		setDeleteModal(false);
		setSelectedID(null);
	};

	// Calculate the index range of inquiries to display for the current page
	const indexOfLastInquiry = currentPage * inquiriesPerPage;
	const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
	const currentInquiries = inquiries.slice(
		indexOfFirstInquiry,
		indexOfLastInquiry
	);

	return (
		<div className="min-h-screen w-full">
			{/* navigation bar */}
			<div className="h-20 w-full bg-white flex flex-row justify-between items-center px-44">
				<div className="text-2xl text-[#6B9080] font-Merriweather font-bold">
					WellTalk
				</div>
				<div className="flex flex-row gap-x-16">
					<div className="text-lg font-Jaldi">Home</div>
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
						backgroundImage: `url(${hdrInquiry.src})`,
					}}
				></div>

				{/* Content */}
				<div className="relative z-10 flex items-center justify-center h-full">
					<div className="flex flex-col text-left px-44 py-10 gap-y-4">
						<h1 className="font-Merriweather text-8xl">
							Inquiries
						</h1>
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
								<th>Inquirer</th>
								<th className="">Subject of Inquiry</th>
								<th className="text-center">Status</th>
								{/* Delete and Edit*/}
								<th className="no-hover-highlight"></th>
							</tr>
						</thead>
						<tbody>
							{currentInquiries.map((inquiry) => (
								<tr
									key={inquiry.id}
									onClick={() => handleRowClick(inquiry.id)}
									className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
								>
									<td className="text-center">
										{inquiry.id}
									</td>
									<td>
										<div className="flex flex-row gap-x-3">
											<div className="text-sm">
												{inquiry.dateTime}
											</div>
										</div>
									</td>
									<td>
										<div className="flex items-center gap-3">
											<div className="avatar">
												<div className="mask mask-squircle w-12 h-12">
													<img
														src={
															inquiry.inquirer
																.avatar
														}
														alt="Avatar Tailwind CSS Component"
													/>
												</div>
											</div>
											<div>
												<div className="font-bold">
													{inquiry.inquirer.name}
												</div>
												<div className="text-sm opacity-50">
													{inquiry.inquirer.email}
												</div>
											</div>
										</div>
									</td>
									<td>
										<p>
											{inquiry.subject.length > 50
												? `${inquiry.subject.substring(
														0,
														40
												  )}...`
												: inquiry.subject}
										</p>
									</td>
									<td className="text-center">
										<div
											className={`w-24 h-5 badge badge-xs ${
												inquiry.status === "Pending"
													? "badge-warning"
													: "badge-success"
											}`}
										>
											{inquiry.status}
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
													showDeleteModal(inquiry.id);
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
								Math.ceil(inquiries.length / inquiriesPerPage)
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
							disabled={inquiriesPerPage > inquiries.length}
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

			{inquiryModal && (
				<ModalInquiryInfo
					setInquiryModal={setInquiryModal}
					selectedID={selectedID}
					inquiries={inquiries}
				></ModalInquiryInfo>
			)}
		</div>
	);
}
