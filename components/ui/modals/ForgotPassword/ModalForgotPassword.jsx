import { useState } from "react";

// comps
import FullButton from "../../buttons/FullButton";
import TextInput from "../../inputs/TextInput";

// modals
import ModalEmailSent from "./ModalEmailSent";

// imgs
import IconClose from "@/public/images/icons/IconClose.png";

const ModalForgotPassword = ({
	setShowForgotPasswordModal,
	forgotPasswordEmail,
	setForgotPasswordEmail,
}) => {
	const [showEmailSent, setShowEmailSent] = useState(false);

	const handleForgotPassword = async (e) => {
		e.preventDefault();
		console.log("Forgot password");

		setShowEmailSent(true);
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
					className="modal-box text-left pt-6 pb-10 flex flex-col"
					style={{ maxWidth: "650px" }}
				>
					{/* close modal */}
					<div className="flex justify-end">
						<img
							src={IconClose.src}
							alt="Close Icon"
							className="h-9 w-9 hover:scale-90 transition-transform duration-300 cursor-pointer"
							onClick={(e) => setShowForgotPasswordModal(false)}
						/>
					</div>

					<div className="px-10">
						<div className="flex flex-col gap-y-2.5 mt-40">
							<h1 className="font-Merriweather text-4xl">
								Forgot Password?
							</h1>
							<p className="font-Jaldi text-lg">
								Locked out of your account? No sweat! Provide
								your email, and we'll guide you through
								resetting your password securely. Your peace of
								mind matters to us!
							</p>
						</div>
						<div className="py-9">
							<TextInput
								label={"Enter Institutional Email Address"}
								type={"text"}
								value={forgotPasswordEmail}
								onChange={(e) => {
									setForgotPasswordEmail(e.target.value);
								}}
							></TextInput>
						</div>
						<div className="w-full flex justify-center mt-5">
							<div className="w-7/12">
								<FullButton onClick={handleForgotPassword}>
									Reset Password
								</FullButton>
							</div>
						</div>
					</div>
				</div>

				<label className="modal-backdrop" htmlFor="my_modal_8">
					Close
				</label>
			</div>

			{showEmailSent && (
				<ModalEmailSent
					setShowForgotPasswordModal={setShowForgotPasswordModal}
					setShowEmailSent={setShowEmailSent}
				/>
			)}
		</>
	);
};

export default ModalForgotPassword;
