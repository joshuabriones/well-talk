import FullButton from "@/components/ui/buttons/FullButton";
import HollowButton from "@/components/ui/buttons/HollowButton";
import iconDelete from "@/public/images/icons/deleteconfirm.png";
import { useState } from "react";

const ModalDelete = ({ setDeleteModal, handleDelete, prompt, description }) => {
	const [isChecked, setIsChecked] = useState(true);

	const toggleChecked = () => {
		setIsChecked(!isChecked);
	};

	return (
		<>
			{isChecked && (
				<div
					className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25 backdrop-blur-sm"
					role="dialog">
					<div className="modal-box relative p-6 sm:p-9 border-2 text-center max-w-xs sm:max-w-lg bg-white rounded-2xl shadow-lg">
						<img
							src={iconDelete.src}
							alt="delete confirmation"
							className="w-20 h-20 sm:w-28 sm:h-28 mx-auto"
						/>
						<h3 className="text-lg sm:text-xl font-bold font-Merriweather py-4 sm:py-6">
							Are you sure you want to delete this {" "}
							{prompt ? prompt : "scheduled appointment"}?
						</h3>
						<p className="text-sm sm:text-base text-gray-600">
							{description
								? description
								: "This action cannot be undone."}
						</p>

						<div className="flex flex-col sm:flex-row justify-center gap-y-4 sm:gap-x-4 py-4 sm:py-6 px-6 sm:px-12">
							<HollowButton
								onClick={() => setDeleteModal(false)}
								className="w-full sm:w-auto">
								Cancel
							</HollowButton>
							<FullButton
								onClick={handleDelete}
								className="w-full sm:w-auto">
								Confirm
							</FullButton>
						</div>
						<button
							className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
							onClick={() => setDeleteModal(false)}>
							&times;
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default ModalDelete;
