import { useState } from "react";

// comps
import FullButton from "../../buttons/FullButton";
import TextInput from "../../inputs/TextInput";
import InputFirstPassword from "../../inputs/InputFirstPassword";
import InputCheckPassword from "../../inputs/InputCheckPassword";

// modals
import ModalPasswordChanged from "./ModalPasswordChanged";

const ModalChangePassword = ({}) => {
	const [password, setPassword] = useState("");
	const [passwordCheck, setPasswordCheck] = useState("");

	const [showInvalidPassword, setShowInvalidPassword] = useState(false);
	const [showPasswordDoNotMatch, setShowPasswordDoNotMatch] = useState(false);

	const [showPasswordChangeConfirm, setShowPasswordChangeConfirm] =
		useState(false);

	// handle save password
	const handleSavePassword = () => {
		if (validatePassword(password) && password === passwordCheck) {
			// save password
			console.log("password saved");
			setShowPasswordChangeConfirm(true);
		} else {
			// show error message
			console.log("password not saved");
		}
	};

	// password validation function
	const validatePassword = (password) => {
		const regex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return regex.test(password);
	};

	const handlePasswordChange = (e) => {
		const newPassword = e.target.value;
		setPassword(newPassword);

		console.log(newPassword);

		if (!validatePassword(newPassword)) {
			// password is not valid
			setShowInvalidPassword(true);
		} else {
			// password is valid
			setShowInvalidPassword(false);
		}
	};

	const handlePasswordCheck = (e) => {
		const newPasswordCheck = e.target.value;
		setPasswordCheck(newPasswordCheck);

		if (newPasswordCheck.trim() === "") {
			// password is empty
			setShowPasswordDoNotMatch(false);
		} else if (validatePassword(password)) {
			// password is valid
			if (newPasswordCheck !== password) {
				// passwords do not match
				setShowPasswordDoNotMatch(true);
			} else {
				// passwords match
				setShowPasswordDoNotMatch(false);
			}
		} else {
			// default
			setShowPasswordDoNotMatch(false);
		}
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
					className="modal-box text-left pt-6 flex flex-col px-16"
					style={{ maxWidth: "650px" }}
				>
					<div className="flex flex-col gap-y-4 py-5">
						<h1 className="font-Merriweather text-4xl py-8 pr-20">
							Please enter new password.
						</h1>
						<div className="flex flex-col gap-y-4">
							<div>
								<InputFirstPassword
									password={password}
									showInvalidPassword={showInvalidPassword}
									handlePasswordChange={handlePasswordChange}
								/>
							</div>
							<div>
								<InputCheckPassword
									passwordCheck={passwordCheck}
									handlePasswordCheck={handlePasswordCheck}
									showPasswordDoNotMatch={
										showPasswordDoNotMatch
									}
								/>
							</div>
						</div>
						<div className="flex justify-center mt-16 mb-4">
							<div className="w-7/12">
								<FullButton onClick={handleSavePassword}>
									Save Password
								</FullButton>
							</div>
						</div>
					</div>
				</div>

				<label className="modal-backdrop" htmlFor="my_modal_8">
					Close
				</label>
			</div>

			{/* modal for confirmation */}
			{showPasswordChangeConfirm && <ModalPasswordChanged />}
		</>
	);
};

export default ModalChangePassword;
