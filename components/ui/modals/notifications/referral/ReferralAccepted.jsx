import "@/styles/counselor.css";
import { useState } from "react";

const ReferralAccepted = ({
	setShowModal,
	// selectedID,
	referral,
	// handleReschedule,
	// handleDelete,
	role,
}) => {
	const [isVisible, setIsVisible] = useState(true);

	const handleOverlayClick = () => {
		handleModalClose();
	};

	const handleModalClose = () => {
		setIsVisible(false);
		setShowModal(false);
	};

	return (
		<div>
			{isVisible && (
				<div
					className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50 backdrop-blur"
					role="dialog"
					onClick={handleOverlayClick}
				>
					<div className="modal-box relative p-4 sm:p-6 lg:p-9 border-2 text-center max-w-xs sm:max-w-lg bg-white rounded-2xl shadow-lg transform transition-transform duration-300 scale-95">
						{/* <img
							src={appointment?.sender?.image}
							alt="Registration Successful"
							className="w-20 h-20 sm:w-28 sm:h-28 mx-auto"
						/> */}

						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="#89252c"
							className="w-20 h-20 sm:w-28 sm:h-28 mx-auto"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
							/>
						</svg>

						<h1 className="text-lg sm:text-xl font-bold font-Merriweather py-2 sm:py-2">
							Referral Accepted!
						</h1>

						<p className="text-sm sm:text-base text-gray-600">
							{role === "student"
								? ""
								: role === "teacher"
								? "Student has accepted your referral for an appointment. Thank you!"
								: role === "counselor"
								? ""
								: null}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReferralAccepted;
