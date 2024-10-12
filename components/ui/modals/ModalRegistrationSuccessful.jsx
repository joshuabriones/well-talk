import registeredUser from "@/public/images/registered.png";
import FullButton from "../buttons/FullButton";

const ModalRegistrationSuccessful = ({
	setShowRegistrationSuccessful,
	handleLoginClick,
}) => {
	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-25 z-50 backdrop-blur"
			role="dialog"
		>
				<div className="modal-box relative p-4 sm:p-6 lg:p-9 border-2 text-center max-w-xs sm:max-w-lg bg-white rounded-2xl shadow-lg transform transition-transform duration-300 scale-95">
				<img
					src={registeredUser.src}
					alt="Registration Successful"
					className="w-20 h-20 sm:w-28 sm:h-28 mx-auto"
				/>
				<h3 className="text-lg sm:text-xl font-bold font-Merriweather py-4 sm:py-6">
					Registration Successful
				</h3>
				<p className="text-sm sm:text-base text-gray-600">
					Registration has been successful. Your account has been sent for approval. Please wait for the admin to verify your account before you can access it.
				</p>

				<div className="flex flex-col sm:flex-row justify-center gap-y-4 sm:gap-x-4 py-4 sm:py-6 px-6 sm:px-12">
				<FullButton onClick={handleLoginClick}>
					Back to Login
				</FullButton>
				</div>
			</div>
		</div>
	);
};

export default ModalRegistrationSuccessful;
