import "@/styles/counselor.css";
import { useState } from "react";

const ReferralWait = ({
	setShowModal,
	// selectedID,
	referral,
	// handleReschedule,
	// handleDelete,
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
								d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
							/>
						</svg>

						<h1 className="text-lg sm:text-xl font-bold font-Merriweather py-2 sm:py-2">
							Referral Submitted!
						</h1>
						<p className="text-sm sm:text-base text-gray-600">
							Your referral for {referral?.student?.firstName}{" "}
							{referral?.student?.lastName} has been submitted. Please wait for the
							student to respond for the referral.
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReferralWait;
