import { useRouter } from "next/navigation";

// comps
import FullButton from "../../buttons/FullButton";

// imgs
import IconFlower from "@/public/images/icons/IconFlower.png";

const ModalPasswordChanged = ({}) => {
	const router = useRouter();

	const handleBackToLogin = async (e) => {
		e.preventDefault();
		console.log("Password Changed Successfolay!!!");

		router.push("/login");
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
									src={IconFlower.src}
									alt="Flower Icon"
									className="h-28 w-28"
								/>
							</div>
							<h1 className="font-Merriweather text-3xl px-10">
								Password was changed successfully!
							</h1>
							<p className="font-Jaldi text-lg mt-6 ">
								Your account is now updated with your new
								password. Your security is our priority, so feel
								confident in your enhanced protection. Carry on
								accessing our services worry-free with your
								updated credentials.
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

export default ModalPasswordChanged;
