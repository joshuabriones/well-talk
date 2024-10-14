import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import "@/styles/counselor.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ModalAppointmentInfo = ({
	setShowModal,
	// selectedID,
	appointment,
	// handleReschedule,
	// handleDelete,
}) => {
	const [isVisible, setIsVisible] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [notes, setNotes] = useState("");
	const [additionalNotes, setAdditionalNotes] = useState("");
	const userSession = getUserSession();
	const [isLoading, setIsLoading] = useState(false);
	const [selectedEmoji, setSelectedEmoji] = useState(null);
	const [selectedID, setSelectedID] = useState(null);

	useEffect(() => {
		setSelectedID(appointment.appointmentId);
	}, [appointment]);

	const handleOverlayClick = () => {
		handleModalClose();
	};

	const handleEmojiClick = (emoji) => {
		setSelectedEmoji(emoji);
		console.log("Emoji clicked:", emoji);
	};

	const formatDate = (date) => {
		const dateObject = new Date(date);
		const options = { year: "numeric", month: "long", day: "numeric" };
		return dateObject.toLocaleDateString("en-US", options);
	};

	const handleDone = async () => {
		if (notes.trim() === "" || additionalNotes.trim() === "") {
			toast.error("Please fill out all fields");
			return;
		}

		try {
			setIsLoading(true);
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.SET_APPOINTMENT_DONE}${selectedID}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
					body: JSON.stringify({
						appointmentNotes: notes,
						appointmentAdditionalNotes: additionalNotes,
					}),
				}
			);

			if (response.ok) {
				toast.success("Appointment status updated!");
			} else {
				toast.error("Failed to update appointment status");
			}
		} catch (error) {
			console.error(error);
		} finally {
			setOpenModal(false);
			setIsLoading(false);
		}
	};

	const handleModalClose = () => {
		setIsVisible(false);
		setShowModal(false);
	};

	return (
		<div>
			{isVisible && (
				<div
					className="fixed inset-0 flex items-center justify-center w-full bg-white bg-opacity-25 z-50 backdrop-blur"
					role="dialog"
					onClick={handleOverlayClick}
				>
					<div className="bg-white dark:bg-slate-800 shadow-xl border w-4/5 md:max-w-lg lg:max-w-lg border-gray border-2 rounded-xl relative">
						<section className="text-center items-center md:gap-4 mb-8 justify-center w-full">
							<div className="w-full flex justify-center avatar absolute -top-16 md:-top-24">
								<div className="w-32 md:w-40 rounded-full ring ring-maroon ring-offset-base-100 ring-offset-1">
									<img src={appointment?.student?.image} alt="appointee avatar" />
								</div>
							</div>

							<div className="flex justify-center text-center items-center flex-col gap-y-2 px-12 lg:ml-16">
								<table className="mb-4 mt-20 w-full ml-2">
									<tbody>
										<tr className="py-4">
											<th className="text-left py-2 pr-4">Name:</th>
											<td className="py-2">
												{appointment
													? `${appointment.student?.firstName} ${appointment.student?.lastName}`
													: ""}
											</td>
										</tr>
										<tr className="py-4">
											<th className="text-left py-2 pr-4">Purpose:</th>
											<td className="py-2">
												{appointment ? appointment.appointmentPurpose : ""}
											</td>
										</tr>
										<tr className="py-4">
											<th className="text-left py-2 pr-4">Feedback:</th>
											<td className="py-2">
												{appointment ? appointment.appointmentNotes : ""}
											</td>
										</tr>
										<tr className="py-4">
											<th className="text-left py-2 pr-4">Date:</th>
											<td className="py-2">
												{appointment
													? formatDate(appointment.appointmentDate)
													: ""}
											</td>
										</tr>
										<tr className="py-4">
											<th className="text-left py-2 pr-4">Time:</th>
											<td className="py-2">
												{appointment
													? `${appointment.appointmentStartTime}`
													: ""}
											</td>
										</tr>
										<tr className="py-4">
											<th className="text-left py-2 pr-4">Status:</th>
											<td className="py-2">
												<div className="w-28 h-6 rounded-lg border border-black flex items-center justify-center">
													{appointment &&
														appointment.appointmentStatus ===
															"Pending" &&
														"🟡"}
													{appointment &&
														appointment.appointmentStatus === "Done" &&
														"🟢"}
													{appointment &&
														appointment.appointmentStatus ===
															"Assigned" &&
														"🔵"}
													<span className="ml-2 font-bold text-sm">
														{appointment
															? appointment.appointmentStatus
															: ""}
													</span>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							{userSession.role === "student" ? (
								<div className="flex  justify-center gap-x-4 gap-y-4 mt-3 px-10">
									<div className="flex gap-2 w-full">
										<button
											className="w-full bg-white border-2 border-gray font-Merriweather border-gray text-sm text-gray font-semibold rounded-3xl px-3 py-2 hover:scale-95 transition-transform duration-300"
											onClick={(e) => {
												e.stopPropagation();
												handleDelete(appointment.appointmentId);
												handleModalClose();
											}}
										>
											Delete
										</button>

										<button
											className="w-full bg-gray border-2 border-gray text-sm font-Merriweather text-white font-semibold rounded-3xl px-3 py-2 hover:scale-95 transition-transform duration-300"
											onClick={(e) => {
												e.stopPropagation();
												handleReschedule();
												handleModalClose();
											}}
										>
											Reschedule
										</button>
									</div>
								</div>
							) : userSession.role === "counselor" ? (
								<div className="flex gap-x-4 px-8 mx-auto">
									<button
										className="w-full bg-gray border-2 border-gray text-sm font-Merriweather text-white font-semibold rounded-3xl px-3 py-2 hover:scale-95 transition-transform duration-300"
										onClick={(e) => {
											e.stopPropagation();
											setOpenModal(true);
										}}
									>
										Provide Feedback
									</button>
								</div>
							) : null}
						</section>
					</div>
				</div>
			)}

			{openModal && (
				<div
					className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-25 z-50"
					role="dialog"
					onClick={handleOverlayClick}
				>
					<div
						className="relative w-11/12 max-w-2xl mx-auto bg-white rounded-lg shadow-lg border-2 border-gray-200"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex justify-between items-center bg-maroon p-4 border-b-2">
							<div className="flex items-center space-x-2 ml-4">
								<div className="w-4 h-4 border-2 bg-yellow-400 rounded-full cursor-pointer"></div>
								<div className="w-4 h-4 border-2 bg-green-400 rounded-full cursor-pointer"></div>
								<div className="w-4 h-4 border-2 bg-red-400 rounded-full cursor-pointer"></div>
							</div>
						</div>

						<div className="px-4 py-4 md:px-8 md:py-6">
							<div className="flex flex-col gap-y-2 py-3">
								<h1 className="font-bold text-slate-700 text-xl md:text-2xl mb-1">
									Give feedback
								</h1>
								<p className="text-slate-500 text-sm md:text-base font-Jaldi">
									Share your invaluable feedback and provide any additional notes
									you deem necessary.
								</p>

								<div className="flex justify-center mt-3 flex-wrap">
									{["😊", "😐", "😢", "😄", "😠"].map((emoji, index) => (
										<button
											key={emoji}
											className={`py-2 rounded-xl text-4xl focus:outline-none 
											${selectedEmoji === emoji ? "bg-yellow-200" : ""}
											hover:bg-yellow-300 transition-colors duration-200 animate-bounce mx-1`}
											onClick={() => handleEmojiClick(emoji)}
										>
											{emoji}
										</button>
									))}
								</div>

								<p className="text-center text-slate-500 text-sm md:text-base font-Jaldi">
									How did you feel about this appointment session?
								</p>

								<div className="flex flex-col gap-4 overflow-y-scroll">
									<textarea
										className="border-2 rounded-xl lg:text-md md:text-base xs:text-xs focus:border-maroon w-full"
										placeholder="Share your feedback here..."
										value={notes}
										onChange={(e) => setNotes(e.target.value)}
									></textarea>
									<textarea
										className="border-2 rounded-xl lg:text-md md:text-base xs:text-xs focus:border-maroon w-full"
										placeholder="Additional notes..."
										value={additionalNotes}
										onChange={(e) => setAdditionalNotes(e.target.value)}
										rows="8"
									></textarea>
								</div>

								<div className="flex justify-center mt-4">
									<div className="w-full">
										<button
											className="w-full bg-gray border-2 border-gray text-sm font-Merriweather text-white font-semibold rounded-3xl px-3 py-2 hover:scale-95 transition-transform duration-300"
											onClick={handleDone}
										>
											{isLoading ? (
												<span className="flex gap-2 items-center justify-center">
													Submitting{" "}
													<img src="/images/loading.svg" alt="loading" />
												</span>
											) : (
												"Submit"
											)}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ModalAppointmentInfo;
