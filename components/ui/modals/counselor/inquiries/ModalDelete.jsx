import { useState } from "react";

import iconDelete from "@/public/images/icons/deleteconfirm.png";
import HollowButton from "@/components/ui/buttons/HollowButton";
import FullButton from "@/components/ui/buttons/FullButton";

const ModalDelete = ({ setDeleteModal, handleDelete, prompt }) => {
  const [isChecked, setIsChecked] = useState(true);

  const toggleChecked = () => {
    setIsChecked(!isChecked);
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
        <div className="modal-box p-6 sm:p-9 text-center max-w-xs sm:max-w-lg">
          <img
            src={iconDelete.src}
            alt="delete confirmation"
            className="w-20 h-20 sm:w-28 sm:h-28 flex justify-center mx-auto"
          />
          <h3 className="text-lg sm:text-xl font-bold font-Merriweather py-4 sm:py-6">
            Do you confirm to delete this {prompt ? prompt : "scheduled appointment"}?
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Once you confirm delete, you won't be able to restore the appointment. 
            You will need to fill out the appointment form again.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-y-4 sm:gap-x-4 py-4 sm:py-6 px-6 sm:px-12">
            <HollowButton onClick={() => setDeleteModal(false)} className="w-full sm:w-auto">
              Cancel
            </HollowButton>
            <FullButton onClick={handleDelete} className="w-full sm:w-auto">
              Confirm
            </FullButton>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="my_modal_7"
          onClick={() => setDeleteModal(false)}
        >
          Close
        </label>
      </div>
    </>
  );
};

export default ModalDelete;
