import { useEffect, useState } from "react";

import iconDelete from "@/public/images/icons/iconDelete.png";
import HollowButton from "@/components/ui/buttons/HollowButton";

import "@/styles/counselor.css";
import ModalConfirmResponse from "./ModalConfirmResponse";

const ModalInquiryInfo = ({ setInquiryModal, selectedID, inquiries }) => {
	const [isChecked, setIsChecked] = useState(true);
	const [inquiry, setInquiry] = useState(null);

	const [respondable, setRespondable] = useState("");
	const [response, setResponse] = useState("");

	const [confirmResponse, setConfirmResponse] = useState(false);

	// for dialog
	const toggleChecked = () => {
		setIsChecked(!isChecked);
	};

	// find inquiries
	useEffect(() => {
		const handleFindInquiry = () => {
			const foundInquiry = inquiries.find(
				(inquiry) => inquiry.id === selectedID
			);
			setInquiry(foundInquiry);
		};

		handleFindInquiry();
	}, [selectedID, inquiries]);

	// set inquiry details
	useEffect(() => {
		if (inquiry && inquiry.status) {
			setRespondable(inquiry.status);
			setResponse(inquiry.response);
		}
	}, [inquiry]);

	// handle response
	const handleResponse = () => {
		console.log(response);

		// logic to update inquiry response

		// set inquiry.status to "Responded"
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
				<div className="modal-box p-9 text-left max-w-2xl max-h-fit">
					<img
						src={iconDelete.src} // change to inquirer avatar
						alt="inquirer avatar"
						className="w-24 h-24 flex justify-center mx-auto"
					/>

					<table className="my-4">
						<tbody>
							<tr>
								<th>ID Number:</th>
								<td>
									{inquiry ? inquiry.inquirer.idNumber : ""}
								</td>
							</tr>
							<tr>
								<th>Name:</th>
								<td>{inquiry ? inquiry.inquirer.name : ""}</td>
							</tr>
							<tr>
								<th>Subject of Inquiry:</th>
								<td>{inquiry ? inquiry.subject : ""}</td>
							</tr>
							<tr>
								<th>Inquiry:</th>
								<td>{inquiry ? inquiry.details : ""}</td>
							</tr>
							<tr>
								<th>Date and Time:</th>
								<td>{inquiry ? inquiry.dateTime : ""}</td>
							</tr>

							<tr>
								<th>Status:</th>
								<td
									className={`h-fit badge badge-md ${
										inquiry?.status === "Pending"
											? "badge-warning"
											: "badge-success"
									}`}
									style={{ width: "30%" }}
								>
									{inquiry ? inquiry.status : ""}
								</td>
							</tr>
						</tbody>
					</table>

					<div>
						<div className="font-Merriweather font-bold">
							Response:
						</div>
						<textarea
							placeholder="Type your response here..."
							value={response}
							onChange={(e) => setResponse(e.target.value)}
							className={`textarea textarea-bordered textarea-md w-full max-w-full font-Jaldi mt-2 text-lg overflow-auto resize-none ${
								respondable === "Responded"
									? "pointer-events-none opacity-50"
									: ""
							}`}
							readOnly={respondable !== "Pending"}
						></textarea>
					</div>

					<div className="gap-x-4 mt-3 px-44">
						<HollowButton onClick={() => setConfirmResponse(true)}>
							Respond
						</HollowButton>
					</div>
				</div>
				<label
					className="modal-backdrop"
					htmlFor="my_modal_7"
					onClick={() => setInquiryModal(false)}
				>
					Close
				</label>
			</div>

			{confirmResponse && (
				<ModalConfirmResponse
					response={response}
					setConfirmResponse={setConfirmResponse}
					setInquiryModal={setInquiryModal}
					handleResponse={handleResponse}
				/>
			)}
		</>
	);
};

export default ModalInquiryInfo;
