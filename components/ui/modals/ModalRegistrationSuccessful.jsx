import registeredUser from "@/public/images/registeredUser.png";
import FullButton from "../buttons/FullButton";

const ModalRegistrationSuccessful = ({
	setShowRegistrationSuccessful,
	registrationDetails, // to be deleted
	handleLoginClick,
}) => {
	return (
		<>
			<input
				type="checkbox"
				id="my_modal_8"
				className="modal-toggle"
				checked={true}
			/>
			<div className="modal" role="dialog">
				<div className="modal-box p-9 text-center">
					<img
						src={registeredUser.src}
						alt="terms&condition"
						className="w-24 h-24 flex justify-center mx-auto"
					/>
					<h3 className="text-xl font-bold py-2">
						Registration Successful
					</h3>
					<p className="text-sm py-4">
						Registration has been successful.
						{registrationDetails} {/* to be deleted */}
					</p>
					<FullButton onClick={handleLoginClick}>
						Go to Login
					</FullButton>
				</div>
				<label
					className="modal-backdrop"
					htmlFor="my_modal_8"
					onClick={() => setShowRegistrationSuccessful(false)}
				>
					Close
				</label>
			</div>
		</>
	);
};

export default ModalRegistrationSuccessful;
