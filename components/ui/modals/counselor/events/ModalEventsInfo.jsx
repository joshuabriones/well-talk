import FullButton from "@/components/ui/buttons/FullButton";
import HollowButton from "@/components/ui/buttons/HollowButton";
import iconDelete from "@/public/images/icons/iconDelete.png";
import { useEffect, useState } from "react";
import ModalConfirmResponse from "../inquiries/ModalConfirmResponse";

const ModaleventInfo = ({ setEventModal, selectedID, events }) => {
	const [isChecked, setIsChecked] = useState(true);
	const [event, setEvent] = useState(null);

	const [respondable, setRespondable] = useState("");
	const [response, setResponse] = useState("");

	const [confirmResponse, setConfirmResponse] = useState(false);

	// for dialog
	const toggleChecked = () => {
		setIsChecked(!isChecked);
	};

	// Fetch event details based on selectedID
	useEffect(() => {
		const handleFindEvent = () => {
			const eventFound = events.find((event) => event.id === selectedID);
			setEvent(eventFound);
		};

		handleFindEvent();
	}, [selectedID, events]);

	// handle response
	const handleResponse = () => {
		console.log(response);

		// update

		// set appointment.status to "Responded", "Pending", "Appointed"
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
						src={iconDelete.src} // Change to event setter avatar
						alt="event setter avatar"
						className="w-24 h-24 flex justify-center mx-auto"
					/>

					<table className="my-4">
						<tbody>
							<tr>
								<th>ID Number:</th>
								<td>{event ? event.user.idNumber : ""}</td>
							</tr>
							<tr>
								<th>Event Name:</th>
								<td>{event ? event.name : ""}</td>
							</tr>
							<tr>
								<th>Setter:</th>
								<td>{event ? `${event.firstName} ${event.user.lastName}` : ""}</td>
							</tr>
							<tr>
								<th>Type:</th>
								<td>{event ? event.type : ""}</td>
							</tr>
							<tr>
								<th>Location:</th>
								<td>{event ? event.location : ""}</td>
							</tr>
							<tr>
								<th>Additional Notes:</th>
								<td>{event ? event.additional_notes : ""}</td>
							</tr>
							<tr>
								<th>Date:</th>
								<td>{event ? event.date : ""}</td>
							</tr>
							<tr>
								<th>Time:</th>
								<td>{event ? event.time : ""}</td>
							</tr>
							<tr>
								<th>Status:</th>
								<td>
									<div
										className={`h-fit badge badge-md ${
											event?.status === "Upcoming"
												? "badge-warning"
												: event?.status === "Cancelled"
												? "badge-error"
												: event?.status === "Completed"
												? "badge-success"
												: ""
										}`}
										style={{ width: "30%" }}
									>
										{event?.status}
									</div>
								</td>
							</tr>
						</tbody>
					</table>

					<div className="flex flex-row gap-x-4 mt-6 px-14">
						<HollowButton onClick={() => setConfirmResponse(true)}>
							Reschedule
						</HollowButton>
						<FullButton onClick={() => setConfirmResponse(true)}>
							Update Status
						</FullButton>
					</div>
				</div>
				<label
					className="modal-backdrop"
					htmlFor="my_modal_7"
					onClick={() => setEventModal(false)}
				>
					Close
				</label>
			</div>

			{confirmResponse && (
				<ModalConfirmResponse
					response={response}
					setConfirmResponse={setConfirmResponse}
					setEventModal={setEventModal}
					handleResponse={handleResponse}
				/>
			)}
		</>
	);
};

export default ModaleventInfo;
