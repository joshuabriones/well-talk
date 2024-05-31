import phone from "@/public/images/emer/phone.png";

import "@/css/emergency/floatingicon.css";
import { useState } from "react";
import EmergencyModal from "./Emergency";

const FloatingIcon = () => {
  const [openEmergencyModal, setOpenEmergencyModal] = useState(false);

  return (
    <>
      <div
        className="floating-icon hover:scale-125 duration-200 cursor-pointer animate-pulse"
        onClick={() => setOpenEmergencyModal(true)}
      >
        <img src={phone.src} alt="terms&condition" className="w-12 h-12" />
      </div>

      {openEmergencyModal && <EmergencyModal onOpen={setOpenEmergencyModal} />}
    </>
  );
};

export default FloatingIcon;
