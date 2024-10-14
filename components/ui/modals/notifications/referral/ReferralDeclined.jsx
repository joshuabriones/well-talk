import "@/styles/counselor.css";
import { useState } from "react";

const ReferralDeclined = ({
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
					<div className="modal-box relative p-4 sm:p-6 lg:p-9 border-2 text-center max-w-xs sm:max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-lg transform transition-transform duration-300 scale-95">
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
								d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
							/>
						</svg>

						<h1 className="text-lg sm:text-xl font-bold font-Merriweather py-2 sm:py-2">
							Referral Declined!
						</h1>

						<p className="text-sm sm:text-base text-gray-600">
							{role === "student"
								? "You have declined the referral for an appointment. See you around!"
								: role === "teacher"
								? "Student has declined your referral for an appointment. Thank you!"
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

export default ReferralDeclined;
