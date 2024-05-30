import emergency from "@/public/images/emer/emergency.png";
import phone from "@/public/images/emer/phone.png";

const EmergencyModal = ({ onOpen }) => {
	return (
		<>
			<input type="checkbox" id="my_modal_7" className="modal-toggle" checked={true} />
			<div className="modal" role="dialog">
				<div
					className="modal-box flex flex-col justify-center items-center border-4 border-red-600"
					style={{
						minHeight: "50vh",
						minWidth: "45vw",
					}}
				>
					<section className="flex flex-row justify-center items-center gap-x-8">
						<img src={emergency.src} alt="terms&condition" className="w-20 h-20" />
						<h1 className="text-7xl font-Merriweather">EMERGENCY</h1>
					</section>

					<section className="w-full grid grid-cols-2 gap-6 pt-9 px-20">
						<CallId number="911" label="Emergency Calls" />
						<CallId number="143" label="Red Cross" />
						<CallId number="16-911" label="Ambulance" />
						<CallId number="2920" label="PNP" />
					</section>
				</div>
				<label
					className="modal-backdrop"
					htmlFor="my_modal_7"
					onClick={() => onOpen(false)}
				>
					Close
				</label>
			</div>
		</>
	);
};

export default EmergencyModal;

const CallId = ({ number, label }) => {
	return (
		<a
			className="w-full h-fit py-4 flex flex-col text-center justify-center border border-black rounded-xl shadow-lg hover:bg-red-600 hover:text-white hover:border-red-600"
			href={`tel:${number}`}
		>
			<div className="flex flex-row justify-center items-center gap-x-2">
				<img src={phone.src} alt="terms&condition" className="w-5 h-5" />
				<h2 className="text-4xl font-Merriweather font-extralight">{number}</h2>
			</div>
			<p className="font-Merriweather">{label}</p>
		</a>
	);
};
