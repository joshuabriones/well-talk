import { useState } from "react";

import styles from "../../../../css/landing.module.css";
import FullButton from "../../buttons/FullButton";
import InputCheckPassword from "../../inputs/InputCheckPassword";
import InputFirstPassword from "../../inputs/InputFirstPassword";

import ModalPasswordChanged from "./ModalPasswordChanged";

const ModalChangePassword = ({ token }) => {
	const [password, setPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");
	const [showInvalidPassword, setShowInvalidPassword] = useState(false);
	const [showPasswordDoNotMatch, setShowPasswordDoNotMatch] = useState(false);
	const [showPasswordChangeConfirm, setShowPasswordChangeConfirm] =
		useState(false);
	const [isModalOpen, setIsModalOpen] = useState(true);

	const handleSavePassword = () => {
		if (validatePassword(password) && password === passwordCheck) {
			console.log("password saved");
			setShowPasswordChangeConfirm(true);
			setIsModalOpen(false);
		} else {
			console.log("password not saved");
		}
	};

	const validatePassword = (password) => {
		const regex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return regex.test(password);
	};

	const handlePasswordChange = (e) => {
		const newPassword = e.target.value;
		setPassword(newPassword);

		if (!validatePassword(newPassword)) {
			setShowInvalidPassword(true);
		} else {
			setShowInvalidPassword(false);
		}
	};

	const handlePasswordCheck = (e) => {
		const newPasswordCheck = e.target.value;
		setPasswordCheck(newPasswordCheck);

		if (newPasswordCheck.trim() === "") {
			setShowPasswordDoNotMatch(false);
		} else if (validatePassword(password)) {
			if (newPasswordCheck !== password) {
				setShowPasswordDoNotMatch(true);
			} else {
				setShowPasswordDoNotMatch(false);
			}
		} else {
			setShowPasswordDoNotMatch(false);
		}
	};

	return (
		<>
			{isModalOpen && (
				<div
					className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-25 z-50"
					role="dialog">
					<div
						className={`relative w-94 mx-auto bg-white rounded-lg shadow-lg border-2 border-gray-200 ${styles.floating}`}>
						<div className="flex justify-between items-center bg-maroon p-4 border-b-2">
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
						<div className="p-8">
							<div className="flex flex-col gap-y-4 py-3">
								<h1 className="font-Merriweather text-4xl py-8 pr-20">
									Please enter new password.
								</h1>
								<div className="flex flex-col gap-y-4">
									<div>
										<InputFirstPassword
											password={password}
											showInvalidPassword={
												showInvalidPassword
											}
											handlePasswordChange={
												handlePasswordChange
											}
										/>
									</div>
									<div>
										<InputCheckPassword
											passwordCheck={passwordCheck}
											handlePasswordCheck={
												handlePasswordCheck
											}
											showPasswordDoNotMatch={
												showPasswordDoNotMatch
											}
										/>
									</div>
								</div>
								<div className="flex justify-center mt-10 mb-4">
									<div className="w-7/12">
										<FullButton
											onClick={handleSavePassword}>
											Save Password
										</FullButton>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{showPasswordChangeConfirm && <ModalPasswordChanged />}
		</>
	);
};

export default ModalChangePassword;
