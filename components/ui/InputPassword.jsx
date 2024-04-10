import TextInput from "@/components/ui/TextInput";
const InputPassword = ({
	password,
	setPassword,
	passwordCheck,
	setPasswordCheck,
	showInvalidPassword,
	showPasswordDoNotMatch,
	handlePasswordChange,
	handlePasswordCheck,
}) => {
	return (
		<>
			<div className="w-1/2 flex flex-col">
				<TextInput
					label="Password"
					value={password}
					onChange={handlePasswordChange}
					type="password"
				/>
				{/* error message */}
				{showInvalidPassword && (
					<div className="text-red-600 text-xs pt-2 pb-1.5">
						Choose a password with at least 8 characters, including
						at least one uppercase letter, one lowercase letter, one
						number, and one special character.
					</div>
				)}
			</div>
			<div className="w-1/2 flex flex-col">
				<TextInput
					label="Re-enter Password"
					value={passwordCheck}
					onChange={handlePasswordCheck}
					type="password"
				/>
				{/* error message */}
				{showPasswordDoNotMatch && (
					<div className="text-red-600 text-xs pt-2 pb-1.5">
						Passwords do not match.
					</div>
				)}
			</div>
		</>
	);
};
export default InputPassword;
