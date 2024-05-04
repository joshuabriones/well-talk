import { useEffect, useState } from "react";
import iconDelete from "@/public/images/icons/iconDelete.png";
import HollowButton from "@/components/ui/buttons/HollowButton";
import ModalConfirmResponse from "./ModalConfirmResponse";

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
		const handleFindEvent = async () => {
			if (selectedID) {
				try {
					const response = await fetch(
						`/api/event/view-event?eventId=${selectedID}`
					);
					if (!response.ok) {
						throw new Error(
							`Failed to fetch event (status ${response.status})`
						);
					}
					const data = await response.json();
					if (data.event && data.event.counselorReply) {
						setResponse(data.event.counselorReply);
					}
					setEvent(data.event);
				} catch (error) {
					console.error("Error fetching event:", error.message);
				}
			}
		};

		handleFindEvent();
	}, [selectedID, events]);

	const handleResponse = async () => {
		const currentResponse = response;

		try {
			const response = await fetch(`/api/event/reply-event`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					eventId: selectedID,
					counselorReply: currentResponse,
					replyDate: new Date().toISOString(),
					counselorId: 1,
				}),
			});
			if (!response.ok) {
				throw new Error("Failed to respond to event");
			}
			const data = await response.json();
			console.log(data);
			// Update event status to "Responded" here if needed
		} catch (error) {
			console.error("Error responding to event:", error.message);
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
								<td>{event ? event.subject : ""}</td>
							</tr>
							<tr>
								<th>Event Setter:</th>
								<td>
									{event
										? `${event.firstName} ${event.user.lastName}`
										: ""}
								</td>
							</tr>
							<tr>
								<th>Event Type:</th>
								<td>{event ? event.type : ""}</td>
							</tr>
							<tr>
								<th>Event Location:</th>
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
							readOnly={respondable === "Responded"}
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
