import { useState } from "react";
import HollowButton from "@/components/ui/buttons/HollowButton";
import FullButton from "@/components/ui/buttons/FullButton";

const PinPostModal = ({ setOpenPinModal, handlePin }) => {
  const [isChecked, setIsChecked] = useState(true);

  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <input
        type="checkbox"
        id="pin_modal"
        className="modal-toggle"
        checked={isChecked}
        onChange={toggleChecked}
      />
      <div className="modal" role="dialog">
        <div className="modal-box p-9 text-center">
          <h3 className="text-xl font-bold font-Merriweather py-6">
            Do you confirm to pin this post?
          </h3>

          <div className="flex flex-row gap-x-4 py-2 px-12">
            <HollowButton onClick={() => setOpenPinModal(false)}>
              Cancel
            </HollowButton>
            <FullButton onClick={handlePin}>Confirm</FullButton>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="pin_modal"
          onClick={() => setOpenPinModal(false)}
        >
          Close
        </label>
      </div>
    </>
  );
};

export default PinPostModal;
