import FullButton from "@/components/ui/buttons/FullButton";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ModalConfirmResponse from "./ModalConfirmResponse";

const ModalInquiryInfo = ({
	setInquiryModal,
	selectedID,
	inquiries,
	fetchInquiries,
}) => {
	const [isChecked, setIsChecked] = useState(true);
	const [inquiry, setInquiry] = useState(null);

	const [respondable, setRespondable] = useState("");
	const [response, setResponse] = useState("");

	const [confirmResponse, setConfirmResponse] = useState(false);

	const userSession = getUserSession();

	console.log("dfd", inquiry?.status);

	console.log("Inquiry", inquiries);
	// for dialog
	const toggleChecked = () => {
		setIsChecked(!isChecked);
	};

	// Fetch inquiry details based on selectedID
  useEffect(() => {
		const handleFindInquiry = async () => {
			if (selectedID) {
				const selected = inquiries.find(
					(inquiry) => inquiry.inquiryId === selectedID
				);
				setInquiry(selected);
			}
		};

		handleFindInquiry();
	}, [selectedID, inquiries]);

	// Update respondable based on inquiry status
	useEffect(() => {
		if (inquiry && inquiry.status) {
			setRespondable(inquiry.status === 0 ? "Pending" : "Responded");
		}
	}, [inquiry]);

	const handleResponse = async () => {
		const currentResponse = response;

		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.REPLY_INQUIRY}${inquiry.inquiryId}?counselorId=${userSession.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
					body: JSON.stringify({
						counselorReply: currentResponse,
					}),
				}
			);
			if (!response.ok) {
				throw new Error("Failed to respond to inquiry");
			}
			const data = await response.json();
			console.log(data);
			// Update inquiry status to "Responded" here if needed
		} catch (error) {
			console.error("Error responding to inquiry:", error.message);
		}
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
			<div
				className="modal"
				role="dialog">
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white dark:bg-slate-800 shadow-xl border border-slate-200 border-2 rounded-xl hover:-translate-y-1 duration-500 w-full lg:w-4/12 p-2 lg:p-4 relative">
						<section className=" items-center md:gap-4 mb-8 justify-center w-full">
							<div className="w-full flex justify-center avatar absolute -top-16 md:-top-24">
								<div className="w-32 md:w-40 rounded-full ring ring-[#6B9080] ring-offset-base-100 ring-offset-1">
									<img
										src={inquiry?.sender?.image}
										alt="inquirer avatar"
									/>
								</div>
							</div>

							<div className="flex justify-center flex-col px-12">
								<table className="mb-4 mt-20">
									<tbody>
										<tr>
											<th>ID Number:</th>
											<td>
												{inquiry
													? inquiry.sender.idNumber
													: ""}
											</td>
										</tr>
										<tr>
											<th>Name:</th>
											<td>
												{inquiry
													? `${inquiry.sender.firstName} ${inquiry.sender.lastName}`
													: ""}
											</td>
										</tr>
										<tr>
											<th>Subject of Inquiry:</th>
											<td>
												{inquiry ? inquiry.subject : ""}
											</td>
										</tr>
										<tr>
											<th>Inquiry:</th>
											<td>
												{inquiry
													? inquiry.messageInquiry
													: ""}
											</td>
										</tr>
										<tr>
											<th>Date and Time:</th>
											<td>
												{inquiry ? inquiry.date : ""}
											</td>
										</tr>
										<tr>
											<th>Status:</th>
											<td
												className={`h-fit badge badge-md font-bold ${
													inquiry?.status === false
														? "badge-warning"
														: "badge-success"
												}`}
												style={{ width: "50%" }}>
												{inquiry?.status
													? "Replied"
													: "Pending"}
											</td>
										</tr>
										{inquiry?.status && (
											<tr>
												<th>Counselor:</th>
												<td>
													{
														inquiry?.counselor
															?.firstName
													}{" "}
													{
														inquiry?.counselor
															?.lastName
													}{" "}
													(
													{
														inquiry?.counselor
															?.institutionalEmail
													}
													)
												</td>
											</tr>
										)}
										{inquiry?.status && (
											<tr>
												<th>Response Date:</th>
												<td>{inquiry?.replyDate}</td>
											</tr>
										)}
									</tbody>
								</table>

								<div>
									<div className="font-Merriweather font-bold">
										Response:
									</div>
									<textarea
										placeholder="Type your response here..."
										value={
											inquiry?.counselorReply
												? inquiry.counselorReply
												: response
										}
										onChange={(e) =>
											setResponse(e.target.value)
										}
										className={`textarea textarea-bordered textarea-md w-full max-w-full font-Jaldi mt-2 text-lg overflow-auto resize-none ${
											respondable === 1
												? "pointer-events-none opacity-50"
												: ""
										}`}
										readOnly={
											inquiry?.status ? true : false
										}></textarea>
								</div>
							</div>

							<div className="gap-x-4 mt-3 px-10">
								<FullButton
									disabled={inquiry?.status}
									onClick={() => setConfirmResponse(true)}>
									{inquiry?.status ? "Responded" : "Respond"}
								</FullButton>
							</div>
						</section>
					</div>
					<label
						className="modal-backdrop"
						htmlFor="my_modal_7"
						onClick={() => setInquiryModal(false)}>
						Close
					</label>
				</div>

				{confirmResponse && (
					<ModalConfirmResponse
						response={response}
						setConfirmResponse={setConfirmResponse}
						setInquiryModal={setInquiryModal}
						handleResponse={handleResponse}
						fetchInquiries={fetchInquiries}
					/>
				)}
			</div>
		</>
	);
};

export default ModalInquiryInfo;

// import HollowButton from "@/components/ui/buttons/HollowButton";
// import { API_ENDPOINT } from "@/lib/api";
// import { getUserSession } from "@/lib/helperFunctions";
// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";
// import ModalConfirmResponse from "./ModalConfirmResponse";

// const ModalInquiryInfo = ({
// 	setInquiryModal,
// 	selectedID,
// 	inquiries,
// 	fetchInquiries,
// }) => {
// 	const [isChecked, setIsChecked] = useState(true);
// 	const [inquiry, setInquiry] = useState(null);

// 	const [respondable, setRespondable] = useState("");
// 	const [response, setResponse] = useState("");

// 	const [confirmResponse, setConfirmResponse] = useState(false);

// 	const userSession = getUserSession();

// 	console.log("dfd", inquiry?.status);

// 	console.log("Inquiry", inquiries);
// 	// for dialog
// 	const toggleChecked = () => {
// 		setIsChecked(!isChecked);
// 	};

// 	// Fetch inquiry details based on selectedID
// 	useEffect(() => {
// 		const handleFindInquiry = async () => {
// 			if (selectedID) {
// 				const selected = inquiries.find(
// 					(inquiry) => inquiry.inquiryId === selectedID
// 				);
// 				setInquiry(selected);
// 			}
// 		};

// 		handleFindInquiry();
// 	}, [selectedID, inquiries]);

// 	// Update respondable based on inquiry status
// 	useEffect(() => {
// 		if (inquiry && inquiry.status) {
// 			setRespondable(inquiry.status === 0 ? "Pending" : "Responded");
// 		}
// 	}, [inquiry]);

// 	const handleResponse = async () => {
// 		const currentResponse = response;

// 		try {
// 			const response = await fetch(
// 				`${process.env.BASE_URL}${API_ENDPOINT.REPLY_INQUIRY}${inquiry.inquiryId}?counselorId=${userSession.id}`,
// 				{
// 					method: "PUT",
// 					headers: {
// 						"Content-Type": "application/json",
// 						Authorization: `Bearer ${Cookies.get("token")}`,
// 					},
// 					body: JSON.stringify({
// 						counselorReply: currentResponse,
// 					}),
// 				}
// 			);
// 			if (!response.ok) {
// 				throw new Error("Failed to respond to inquiry");
// 			}
// 			const data = await response.json();
// 			console.log(data);
// 			// Update inquiry status to "Responded" here if needed
// 		} catch (error) {
// 			console.error("Error responding to inquiry:", error.message);
// 		}
// 	};

// 	return (
// 		<>
// 			<input
// 				type="checkbox"
// 				id="my_modal_7"
// 				className="modal-toggle"
// 				checked={isChecked}
// 				onChange={() => setIsChecked(!isChecked)}
// 			/>
// 			<div
// 				className="modal"
// 				role="dialog">
// 				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
// 					<div className="bg-white dark:bg-slate-800 shadow-xl border border-slate-200 border-2 rounded-xl hover:-translate-y-1 duration-500 w-full lg:w-4/12 p-2 lg:p-4 relative">
// 						<section className="flex flex-col md:flex-col items-center md:gap-4 mb-8 justify-center w-full">
// 						<div className="w-full flex justify-center avatar absolute -top-16 md:-top-24">
// 							<div className="w-32 md:w-48 rounded-full ring ring-[#6B9080] ring-offset-base-100 ring-offset-1">
// 									<img
// 										src={inquiry?.sender?.image} // Change to inquirer avatar
// 										alt="inquirer avatar"
// 									/>
// 								</div>
// 							</div>

// 							<table className="mb-4 mt-28">
// 								<tbody>
// 									<tr>
// 										<th>ID Number:</th>
// 										<td>
// 											{inquiry
// 												? inquiry.sender.idNumber
// 												: ""}
// 										</td>
// 									</tr>
// 									<tr>
// 										<th>Name:</th>
// 										<td>
// 											{inquiry
// 												? `${inquiry.sender.firstName} ${inquiry.sender.lastName}`
// 												: ""}
// 										</td>
// 									</tr>
// 									<tr>
// 										<th>Subject of Inquiry:</th>
// 										<td>
// 											{inquiry ? inquiry.subject : ""}
// 										</td>
// 									</tr>
// 									<tr>
// 										<th>Inquiry:</th>
// 										<td>
// 											{inquiry
// 												? inquiry.messageInquiry
// 												: ""}
// 										</td>
// 									</tr>
// 									<tr>
// 										<th>Date and Time:</th>
// 										<td>{inquiry ? inquiry.date : ""}</td>
// 									</tr>
// 									<tr>
// 										<th>Status:</th>
// 										<td
// 											className={`h-fit badge badge-md ${
// 												inquiry?.status === false
// 													? "badge-warning"
// 													: "badge-success"
// 											}`}
// 											style={{ width: "30%" }}>
// 											{inquiry?.status
// 												? "Replied"
// 												: "Pending"}
// 										</td>
// 									</tr>
// 									{inquiry?.status && (
// 										<tr>
// 											<th>Counselor:</th>
// 											<td>
// 												{inquiry?.counselor?.firstName}{" "}
// 												{inquiry?.counselor?.lastName} (
// 												{
// 													inquiry?.counselor
// 														?.institutionalEmail
// 												}
// 												)
// 											</td>
// 										</tr>
// 									)}
// 									{inquiry?.status && (
// 										<tr>
// 											<th>Response Date:</th>
// 											<td>{inquiry?.replyDate}</td>
// 										</tr>
// 									)}
// 								</tbody>
// 							</table>

// 							<div>
// 								<div className="font-Merriweather font-bold">
// 									Response:
// 								</div>
// 								<textarea
// 									placeholder="Type your response here..."
// 									value={
// 										inquiry?.counselorReply
// 											? inquiry.counselorReply
// 											: response
// 									}
// 									onChange={(e) =>
// 										setResponse(e.target.value)
// 									}
// 									className={`textarea textarea-bordered textarea-md w-full  font-Jaldi mt-2 text-lg overflow-auto resize-none ${
// 										respondable === 1
// 											? "pointer-events-none opacity-50"
// 											: ""
// 									}`}
// 									readOnly={
// 										inquiry?.status ? true : false
// 									}></textarea>
// 							</div>

// 							<div className="gap-x-4 mt-3 px-44">
// 								<HollowButton
// 									disabled={inquiry?.status}
// 									onClick={() => setConfirmResponse(true)}>
// 									{inquiry?.status ? "Responded" : "Respond"}
// 								</HollowButton>
// 							</div>
// 						</section>
// 					</div>
// 					<label
// 						className="modal-backdrop"
// 						htmlFor="my_modal_7"
// 						onClick={() => setInquiryModal(false)}>
// 						Close
// 					</label>
// 				</div>

// 				{confirmResponse && (
// 					<ModalConfirmResponse
// 						response={response}
// 						setConfirmResponse={setConfirmResponse}
// 						setInquiryModal={setInquiryModal}
// 						handleResponse={handleResponse}
// 						fetchInquiries={fetchInquiries}
// 					/>
// 				)}
// 			</div>
// 		</>
// 	);
// };

// export default ModalInquiryInfo;
