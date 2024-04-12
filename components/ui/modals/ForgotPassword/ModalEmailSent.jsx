import { useRouter } from "next/navigation";

// comps
import FullButton from "../../buttons/FullButton";

// imgs
import iconSent from "@/public/images/icons/iconSent.png";

const ModalEmailSent = ({ setShowForgotPasswordModal, setShowEmailSent }) => {
	const router = useRouter();

	const handleBackToLogin = async (e) => {
		e.preventDefault();
		console.log("Email Sent Successfullay!");

		setShowEmailSent(false);
		setShowForgotPasswordModal(false);
	};

	return (
		<>
			<input
				type="checkbox"
				id="my_modal_8"
				className="modal-toggle"
				checked={true}
			/>
			<div className="modal" role="dialog">
				<div
					className="modal-box flex flex-col text-center"
					style={{ maxWidth: "650px" }}
				>
					<div className="p-10 flex flex-col">
						<div className="flex flex-col gap-y-2.5">
							<div className="flex justify-center py-2">
								<img
									src={iconSent.src}
									alt="Close Icon"
									className="h-28 w-28 hover:scale-90 transition-transform duration-300 cursor-pointer"
									onClick={(e) =>
										setShowForgotPasswordModal(false)
									}
								/>
							</div>
							<h1 className="font-Merriweather text-3xl px-10">
								Password reset e-mail has been sent!
							</h1>
							<p className="font-Jaldi text-lg mt-6 ">
								Password Reset Email Sent! Keep an eye on your
								inbox for a secure link to restore access. Your
								security is our top concern. Follow the provided
								instructions to reset your password with ease.
							</p>
						</div>

						<div className="w-full flex justify-center mt-12">
							<div className="w-7/12">
								<FullButton onClick={handleBackToLogin}>
									Back To Login
								</FullButton>
							</div>
						</div>
					</div>
				</div>

				<label className="modal-backdrop" htmlFor="my_modal_8">
					Close
				</label>
			</div>
		</>
	);
};

export default ModalEmailSent;
