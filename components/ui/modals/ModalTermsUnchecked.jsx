import { useState } from "react";

import termsIcon from "@/public/images/termsIcon.png";

const ModalTermsUnchecked = ({ setShowTermsNotAccepted }) => {
	return (
		<>
			<input
				type="checkbox"
				id="my_modal_7"
				className="modal-toggle"
				checked={true}
			/>
			<div className="modal" role="dialog">
				<div className="modal-box p-9 text-center">
					<img
						src={termsIcon.src}
						alt="terms&condition"
						className="w-32 h-32 flex justify-center mx-auto"
					/>
					<h3 className="text-xl font-bold">Terms and Conditions</h3>
					<p className="text-sm py-4">
						Please accept the terms and conditions to proceed.
					</p>
				</div>
				<label
					className="modal-backdrop"
					htmlFor="my_modal_7"
					onClick={() => setShowTermsNotAccepted(false)}
				>
					Close
				</label>
			</div>
		</>
	);
};

export default ModalTermsUnchecked;
