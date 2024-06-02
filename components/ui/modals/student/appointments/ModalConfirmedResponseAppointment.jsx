import { useState } from "react";
import FullButton from "@/components/ui/buttons/FullButton";
import HollowButton from "@/components/ui/buttons/HollowButton";
import sendResponse from "@/public/images/icons/sendResponse.png";

const ModalConfirmResponseAppointment = ({
  response,
  setConfirmResponse,
  setAppointmentModal,
  handleResponse,
  fetchAppointments,
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const [showConfirmed, setShowConfirmed] = useState(false);

  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = () => {
    handleResponse();

    setShowConfirmed(true);
    setTimeout(() => {
      setShowConfirmed(false);
      handleReset();
    }, 3000);
  };

  const handleReset = () => {
    setConfirmResponse(false);
    setAppointmentModal(false);
    fetchAppointments();
  };

  return (
    <>
      <input
        type="checkbox"
        id="my_modal_7"
        className="modal-toggle"
        checked={isChecked}
        onChange={toggleChecked}
      />
      <div className="modal" role="dialog">
        <div className="modal-box p-9 text-center">
          <img
            src={sendResponse.src}
            alt="terms&condition"
            className="w-28 h-28 flex justify-center mx-auto"
          />
          <h3 className="text-xl font-bold font-Merriweather py-6">
            Do you confirm to submit the Appointment?
          </h3>

          <div className="flex flex-row gap-x-4 py-2 px-12">
            <HollowButton onClick={() => setConfirmResponse(false)}>
              Cancel
            </HollowButton>
            <FullButton onClick={handleResponse}>Confirm</FullButton>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="my_modal_7"
          onClick={() => setConfirmResponse(false)}
        >
          Close
        </label>
      </div>
    </>
  );
};

export default ModalConfirmResponseAppointment;
