import { useState } from "react";
import HollowButton from "@/components/ui/buttons/HollowButton";
import FullButton from "@/components/ui/buttons/FullButton";
import iconPin from "@/public/images/icons/pin.png";

const PinPostModal = ({ setOpenPinModal, handlePin }) => {
  const [isChecked, setIsChecked] = useState(true);

  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      {isChecked && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25 backdrop-blur-sm"
          role="dialog"
        >
          <div className="modal-box relative p-10 border-2 text-center bg-white rounded-2xl shadow-lg">
          <img
							src={iconPin.src}
							alt="Pin post"
							className="w-20 h-20 sm:w-28 sm:h-28 mx-auto"
						/>
            <h3 className="text-xl font-bold font-Merriweather py-6">
              Do you want to pin this post?
            </h3>

            <div className="flex flex-row gap-x-4 py-2 px-12">
              <HollowButton onClick={() => setOpenPinModal(false)}>
                Cancel
              </HollowButton>
              <FullButton onClick={handlePin}>Confirm</FullButton>
            </div>

            {/* Close button overlay */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => setOpenPinModal(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PinPostModal;
