import TextInput from "@/components/ui/inputs/TextInput";

const InputCheckPassword = ({
	passwordCheck,
	handlePasswordCheck,
	showPasswordDoNotMatch,
}) => {
	return (
		<>
			<div className="w-full full flex flex-col">
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
export default InputCheckPassword;
