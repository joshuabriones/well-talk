import TextInput from "@/components/ui/inputs/TextInput";

const InputFirstPassword = ({
	password,
	showInvalidPassword,
	handlePasswordChange,
}) => {
	return (
		<>
			<div className="w-full full flex flex-col">
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
		</>
	);
};
export default InputFirstPassword;
