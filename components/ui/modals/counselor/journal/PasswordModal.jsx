import FullButton from "@/components/ui/buttons/FullButton";
import InputFirstPassword from "@/components/ui/inputs/InputFirstPassword";

const PasswordModal = ({
	isOpen,
	onClose,
	onSubmit,
	password,
	setPassword,
}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(password);
		setPassword("");
	};

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-25 z-50"
			role="dialog">
			<div
				className={`relative w-94 mx-auto bg-white rounded-lg shadow-lg border-2 border-gray-200 ${styles.floating}`}>
				<div className="flex justify-between items-center bg-maroon p-4 border-b-2">
					<div className="flex items-center space-x-2 ml-4">
						<div
							className="w-4 h-4 border-2 bg-yellow-400 rounded-full cursor-pointer"
							onClick={() => console.log("Minimize")}></div>
						<div
							className="w-4 h-4 border-2 bg-green-400 rounded-full cursor-pointer"
							onClick={() => console.log("Maximize")}></div>
						<div
							className="w-4 h-4 border-2 bg-red-400 rounded-full cursor-pointer"
							onClick={() => setIsModalOpen(false)}></div>
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
									showInvalidPassword={showInvalidPassword}
									handlePasswordChange={handlePasswordChange}
								/>
							</div>
						</div>
						<div className="flex justify-center mt-10 mb-4">
							<div className="w-7/12">
								<FullButton onClick={handleSavePassword}>
									Save Password
								</FullButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PasswordModal;
