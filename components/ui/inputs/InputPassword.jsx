import TextInput from "@/components/ui/inputs/TextInput";
import InputFirstPassword from "./InputFirstPassword";
import InputCheckPassword from "./InputCheckPassword";
const InputPassword = ({
	password,
	passwordCheck,
	showInvalidPassword,
	showPasswordDoNotMatch,
	handlePasswordChange,
	handlePasswordCheck,
}) => {
	return (
		<>
			<div className="w-1/2 flex flex-col">
				<InputFirstPassword
					password={password}
					showInvalidPassword={showInvalidPassword}
					handlePasswordChange={handlePasswordChange}
				/>
			</div>
			<div className="w-1/2 flex flex-col">
				<InputCheckPassword
					passwordCheck={passwordCheck}
					handlePasswordCheck={handlePasswordCheck}
					showPasswordDoNotMatch={showPasswordDoNotMatch}
				/>
			</div>
		</>
	);
};
export default InputPassword;
