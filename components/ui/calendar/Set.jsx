import GlobalContext from "@/context/GlobalContext";
import { useContext } from "react";
import EventModal from "./EventModal";
import AppointmentModal from "./AppointmentModal";

const Set = ({ onOpen }) => {
  const {
    showEventModal,
    setShowEventModal,
    showAppointmentModal,
    setShowAppointmentModal,
  } = useContext(GlobalContext);

  console.log(showAppointmentModal);
  return (
    <>
      <input
        type="checkbox"
        id="my_modal_7"
        className="modal-toggle"
        checked={true}
        readOnly
      />
      <div className="modal" role="dialog">
        <div
          className="modal-box p-12 px-16 text-center flex flex-col gap-y-5 text-white font-Merriweather"
          style={{ maxWidth: "25vw" }}
        >
          <Button setShowModal={setShowEventModal}>Set Event</Button>
          <Button setShowModal={setShowAppointmentModal}>
            Set Appointment
          </Button>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="my_modal_7"
          onClick={() => onOpen(false)}
        >
          Close
        </label>

        {showEventModal && <EventModal />}
        {showAppointmentModal && <AppointmentModal />}
      </div>
    </>
  );
};

export default Set;

function Button({ setShowModal, children }) {
  return (
    <div>
      <button
        className="bg-[#6B9080] w-full h-12 rounded-lg text-lg hover:scale-105 shadow-lg"
        onClick={() => setShowModal && setShowModal(true)}
      >
        {children}
      </button>
    </div>
  );
}
