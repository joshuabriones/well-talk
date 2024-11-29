import FullButton from "../buttons/FullButton";
import HollowButton from "../buttons/HollowButton";
const ConfirmationPopup = ({ icon, title, message, onConfirm, onCancel }) => {
	return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white  shadow-xl border border-slate-200 border-2 rounded-xl hover:-translate-y-1 duration-500 w-full lg:w-3/12 p-2 lg:p-4 relative">
				<section className="flex flex-col md:flex-col items-center md:gap-4 mb-8 justify-center items-center w-full">
					{/* Avatar */}
					<div className="w-full flex justify-center avatar absolute -top-10 md:-top-18">
						<div className="w-32 md:w-28 rounded-full ring ring-[#6B9080] ring-offset-base-100 ring-offset-1">
							<img
								src={icon}
								alt="Icon"
							/>
						</div>
					</div>
					{/* User Info */}
					<div className="w-full mt-14 md:mt-20 flex flex-col justify-center items-center md:justify-start">
						<h1 className="font-Merriweather text-2xl md:text-2xl lg:text-3xl font-bold tracking-tight mt-4">
							{title}
						</h1>
						<p className="font-Merriweather tracking-tight font-thin text-sm my-2">
							{message}
						</p>

						<div className="flex gap-4 mt-8">
							<FullButton onClick={onConfirm}>Confirm</FullButton>
							<HollowButton onClick={onCancel}>
								Cancel
							</HollowButton>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default ConfirmationPopup;
