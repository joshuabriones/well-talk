import FullButton from "@/components/ui/buttons/FullButton";
import HollowButton from "@/components/ui/buttons/HollowButton";
import sendResponse from "@/public/images/icons/delivered.png";
import { useState } from "react";

const ModalConfirmResponseAppointment = ({
	response,
	setConfirmResponse,
	setAppointmentModal,
	handleResponse,
	fetchAppointments,
}) => {
	const [showConfirmed, setShowConfirmed] = useState(false);

	const handleSubmit = () => {
		handleResponse();
		setShowConfirmed(true);
		setTimeout(() => {
			setShowConfirmed(false);
			handleReset();
		}, 3000);
	};

	const handleReset = () => {
		setConfirmResponse(false);
		setAppointmentModal(false);
		fetchAppointments();
	};

	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-25 z-50 backdrop-blur"
			role="dialog">
			<div className="modal-box relative p-6 sm:p-9 border-2 text-center max-w-xs sm:max-w-lg bg-white rounded-2xl shadow-lg transform transition-transform duration-300 scale-95">
				<img
					src={sendResponse.src}
					alt="terms & conditions"
					className="w-28 h-28 flex justify-center mx-auto"
				/>
				<h3 className="flex justify-center  text-xl font-bold font-Merriweather py-6">
					Are you sure you want to schedule your appointment?
				</h3>
				<p className="flex justify-center  text-sm sm:text-base text-gray-600">
					You may check your scheduled appointment for more
					information at the View Appointments tab.
				</p>

				<div className="flex flex-col sm:flex-row justify-center gap-y-4 sm:gap-x-4 py-4 sm:py-6 px-6 sm:px-12">
					<HollowButton onClick={() => setConfirmResponse(false)}>
						Cancel
					</HollowButton>
					<FullButton onClick={handleSubmit}>Confirm</FullButton>
				</div>
			</div>
			<div
				onClick={() => setConfirmResponse(false)}
				aria-hidden="true"></div>
		</div>
	);
};

export default ModalConfirmResponseAppointment;
