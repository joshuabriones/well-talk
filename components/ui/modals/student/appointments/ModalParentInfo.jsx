import { useRef } from "react";
import TextInput from "@/components/ui/inputs/TextInput";

const ModalParentInfo = ({ setIsParentModalOpen, guardianName, setGuardianName, guardianContact, setGuardianContact, handleParentInfoSubmit }) => {
	const modalRef = useRef(null);

	// Function to close the modal
	const closeModal = () => {
		setIsParentModalOpen(false);
	};

	const handleClickOutside = (event) => {
		if (modalRef.current && !modalRef.current.contains(event.target)) {
			closeModal();
		}
	};

	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-25 z-50"
			role="dialog"
			onClick={handleClickOutside}>
			<div
				ref={modalRef}
				className="bg-white shadow-xl border w-4/5 md:max-w-lg lg:max-w-lg border-gray border-2 rounded-xl relative">
				<div className="flex justify-between items-center bg-maroon p-4 border-b-2">
					<div className="flex items-center space-x-2 ml-4">
						<div className="w-4 h-4 border-2 bg-yellow-400 rounded-full cursor-pointer"></div>
						<div className="w-4 h-4 border-2 bg-green-400 rounded-full cursor-pointer"></div>
						<div className="w-4 h-4 border-2 bg-red-400 rounded-full cursor-pointer"></div>
					</div>
				</div>

				{/* Modal Body */}
				<div className="px-8 py-4">
					<div className="flex flex-col py-3">
						<h1 className="text-lg font-bold text-center">
							Parent/Guardian Information
						</h1>
						<p className="text-center">
							To proceed, please fill this information first to proceed.
						</p>
						<div className="flex flex-col gap-4 w-full mt-6">
							<TextInput
								value={guardianName}
								onChange={(e) => setGuardianName(e.target.value)}
								placeholder="Jane Doe"
								label="Parent/Guardian Name"
								id="parent-guardian-name"
							/>
							<TextInput
								value={guardianContact}
								onChange={(e) => setGuardianContact(e.target.value)}
								placeholder="09123456789"
								label="Parent/Guardian Contact Number"
								id="parent-guardian-contact"
							/>
							
						</div><button
								onClick={handleParentInfoSubmit}
								className="mt-2 w-full bg-gray border-2 font-Merriweather text-sm text-white font-semibold rounded-3xl px-4 py-3 hover:scale-95 transition-transform duration-300">
								Submit
							</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalParentInfo;
