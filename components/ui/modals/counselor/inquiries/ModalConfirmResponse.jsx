import { useState } from "react";

import sendResponse from "@/public/images/icons/sendResponse.png";
import HollowButton from "@/components/ui/buttons/HollowButton";
import FullButton from "@/components/ui/buttons/FullButton";
import ModalConfirmed from "./ModalConfirmed";

const ModalConfirmResponse = ({
	response,
	setConfirmResponse,
	setInquiryModal,
	handleResponse,
}) => {
	const [isChecked, setIsChecked] = useState(true);
	const [showConfirmed, setShowConfirmed] = useState(false);

	// for dialog
	const toggleChecked = () => {
		setIsChecked(!isChecked);
	};

	const handleSubmit = () => {
		handleResponse();

		// time out after 3 seconds
		setShowConfirmed(true);
		setTimeout(() => {
			setShowConfirmed(false);
			handleReset();
		}, 3000);
	};

	const handleReset = () => {
		setConfirmResponse(false);
		setInquiryModal(false);
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
				<div className="modal-box p-9 text-center">
					<img
						src={sendResponse.src}
						alt="terms&condition"
						className="w-28 h-28 flex justify-center mx-auto"
					/>
					<h3 className="text-xl font-bold font-Merriweather py-6">
						Do you confirm to send the response?
					</h3>

					<div className="flex flex-row gap-x-4 py-2 px-12">
						<HollowButton onClick={() => setConfirmResponse(false)}>
							Cancel
						</HollowButton>
						<FullButton onClick={handleSubmit}>Confirm</FullButton>
					</div>
				</div>
				<label
					className="modal-backdrop"
					htmlFor="my_modal_7"
					onClick={() => setConfirmResponse(false)}
				>
					Close
				</label>
			</div>

			{showConfirmed && <ModalConfirmed></ModalConfirmed>}
		</>
	);
};

export default ModalConfirmResponse;
