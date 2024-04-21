import { useState } from "react";

import iconDelete from "@/public/images/icons/iconDelete.png";
import HollowButton from "@/components/ui/buttons/HollowButton";
import FullButton from "@/components/ui/buttons/FullButton";

const ModalDelete = ({ setDeleteModal, handleDelete }) => {
	const [isChecked, setIsChecked] = useState(true);

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
						src={iconDelete.src}
						alt="terms&condition"
						className="w-28 h-28 flex justify-center mx-auto"
					/>
					<h3 className="text-xl font-bold font-Merriweather py-6">
						Do you confirm to delete the inquiry?
					</h3>

					<div className="flex flex-row gap-x-4 py-2 px-12">
						<HollowButton onClick={() => setDeleteModal(false)}>
							Cancel
						</HollowButton>
						<FullButton onClick={handleDelete}>Confirm</FullButton>
					</div>
				</div>
				<label
					className="modal-backdrop"
					htmlFor="my_modal_7"
					onClick={() => setDeleteModal(false)}
				>
					Close
				</label>
			</div>
		</>
	);
};

export default ModalDelete;
