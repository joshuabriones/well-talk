import { useState } from "react";

// comps
import FullButton from "../../buttons/FullButton";
import TextInput from "../../inputs/TextInput";

import { API_ENDPOINT } from "@/lib/api";

// modals
import ModalEmailSent from "./ModalEmailSent";

// imgs
import IconClose from "@/public/images/icons/iconClose.png";

const ModalForgotPassword = ({
	setShowForgotPasswordModal,
	forgotPasswordEmail,
	setForgotPasswordEmail,
}) => {
	const [showEmailSent, setShowEmailSent] = useState(false);

	const handleForgotPassword = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.FORGOT_PASSWORD}${forgotPasswordEmail}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (!response.ok) {
				throw new Error("Error sending email");
			}
		} catch (error) {
			console.error("Error sending email", error);
		}

		setShowEmailSent(true);
	};

	return (
		<>
			{/*
				Backdrop - You can manage visibility of this through state
			*/}
			<div
				className="fixed inset-0 bg-white bg-opacity-25 z-40"
				onClick={() => setShowForgotPasswordModal(false)}
			></div>

			{/* Modal Content */}
			<div
				className="fixed inset-0 z-50 flex items-center justify-center"
				role="dialog"
				aria-modal="true"
				style={{ pointerEvents: 'none' }}>
				<div
					className="bg-white rounded-lg shadow-lg border-2 max-w-lg w-full text-left pb-10 flex flex-col pointer-events-auto"
					style={{ maxWidth: "650px" }}>
					
					<div className="flex justify-between items-center bg-maroon p-4 mb-2 border-b-2 rounded-t">
							<div className="flex items-center space-x-2 ml-4">
								<div
									className="w-4 h-4 border-2 bg-yellow-400 rounded-full cursor-pointer"
									onClick={() => console.log("Minimize")} 
								></div>
								<div
									className="w-4 h-4 border-2 bg-green-400 rounded-full cursor-pointer"
									onClick={() => console.log("Maximize")} 
								></div>
								<div
									className="w-4 h-4 border-2 bg-red-400 rounded-full cursor-pointer"
									onClick={() => setIsModalOpen(false)}
								></div>
							</div>
						</div>

					{/* Modal Body */}
					<div className="px-10">
						<div className="flex flex-col gap-y-2.5 mt-2">
							<img
								src="/images/thinking.png"
								alt="Thinking"
								className="w-40 h-40 mx-auto mb-4"
							/>
							<h1 className="font-Merriweather text-4xl">Forgot Password?</h1>
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
								}}></TextInput>
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
			</div>

			{/* Modal for email sent confirmation */}
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
