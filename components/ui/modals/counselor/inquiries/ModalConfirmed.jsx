import { useState } from "react";

import sent from "@/public/images/icons/sent.png";

const ModalConfirmed = ({}) => {
	const [isChecked, setIsChecked] = useState(true);

	// for dialog
	const toggleChecked = () => {
		setIsChecked(!isChecked);
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
						src={sent.src}
						alt="terms&condition"
						className="w-32 h-32 flex justify-center mx-auto"
					/>
					<h3 className="text-xl font-bold font-Merriweather">
						Response Sent!
					</h3>
					<p className="text-lg py-4 font-Jaldi">
						Your response has been sent to the inquirer.
					</p>
				</div>
				<label className="modal-backdrop" htmlFor="my_modal_7">
					Close
				</label>
			</div>
		</>
	);
};

export default ModalConfirmed;
