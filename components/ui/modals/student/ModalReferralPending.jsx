import referredUser from "@/public/images/refer.png";
import FullButton from "../../buttons/FullButton";
import HollowButton from "../../buttons/HollowButton";
const ModalReferralPending = ({ setIsReferralPending, router }) => {
	return (
		<div
			className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50 backdrop-blur"
			role="dialog">
			<div className="modal-box relative p-4 sm:p-6 lg:p-9 border-2 text-center max-w-xs sm:max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-lg transform transition-transform duration-300 scale-95">
				<img
					src={referredUser.src}
					alt="Registration Successful"
					className="w-20 h-20 sm:w-28 sm:h-28 mx-auto"
				/>
				<h1 className="text-lg sm:text-xl font-bold font-Merriweather py-4 sm:py-6">
					Referral Pending
				</h1>
				<p className="text-sm sm:text-base text-gray-600">
					We have noticed you have accepted a referral. Please make an
					appointment with the counselor.
				</p>

				<div className="flex flex-col  justify-center gap-y-4 sm:gap-x-4 py-4 sm:py-6 px-6 sm:px-12">
					<FullButton
						onClick={() => {
							const query = new URLSearchParams({
								typeRoute: "Referral",
								purposeRoute: "Referred by teacher",
							}).toString();

							router.push(`/student/appointment?${query}`);
						}}>
						Schedule an Appointment
					</FullButton>
					<div
						className="text-sm font-semibold font-Merriweather cursor-pointer hover:scale-95 hover:text-[#8a252c]"
						onClick={() => setIsReferralPending(false)}>
						Later
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalReferralPending;
