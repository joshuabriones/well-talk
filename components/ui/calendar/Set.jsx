import GlobalContext from "@/context/GlobalContext";
import { useContext } from "react";
import EventModal from "./EventModal";

const Set = ({ onOpen }) => {
	const { showEventModal, setShowEventModal } = useContext(GlobalContext);

	return (
		<>
			<input type="checkbox" id="my_modal_7" className="modal-toggle" checked={true} />
			<div className="modal" role="dialog">
				<div
					className="modal-box p-12 px-16 text-center flex flex-col gap-y-5 text-white font-Merriweather"
					style={{ maxWidth: "25vw" }}
				>
					<Button setShowEventModal={setShowEventModal}>Set Event</Button>
					<Button>Set Appointment</Button>
				</div>
				<label
					className="modal-backdrop"
					htmlFor="my_modal_7"
					onClick={() => onOpen(false)}
				>
					Close
				</label>

				{showEventModal && <EventModal />}
			</div>
		</>
	);
};

export default Set;

function Button({ setShowEventModal, children }) {
	return (
		<div>
			<button
				className="bg-[#6B9080] w-full h-12 rounded-lg text-lg hover:scale-105 shadow-lg"
				onClick={() => setShowEventModal(true)}
			>
				{children}
			</button>
		</div>
	);
}
