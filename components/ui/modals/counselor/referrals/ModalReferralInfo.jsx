"use client";
import { useEffect, useState } from "react";

import iconDelete from "@/public/images/icons/iconDelete.png";
import HollowButton from "@/components/ui/buttons/HollowButton";
import FullButton from "@/components/ui/buttons/FullButton";
import { useRouter } from "next/navigation";

import "@/styles/counselor.css";

const ModalReferralInfo = ({ setReferralModal, selectedID, referrals }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [referral, setReferral] = useState(null);
  const route = useRouter();

  // for dialog
  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  // find referrals
  useEffect(() => {
    const handleFindReferral = () => {
      const foundRefferal = referrals.find(
        (referral) => referral.referralId === selectedID
      );
      setReferral(foundRefferal);
    };

    handleFindReferral();
  }, [selectedID, referrals]);

  // handle select appointment
  const handleSelectAppointment = () => {
    // Use selectedID directly
    const query = new URLSearchParams({ referralId: `${selectedID}` }); // Correctly reference selectedID
    route.push(`/counselor/counselor-appointment?${query}`);
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
        <div className="modal-box p-9 text-left max-w-2xl max-h-fit">
          <img
            src={iconDelete.src} // change to setter avatar
            alt="setter avatar"
            className="w-24 h-24 flex justify-center mx-auto mb-3"
          />

          <table className="my-4">
            <tbody>
              <tr>
                <th>ID Number:</th>
                <td>{referral ? referral.studentId : ""}</td>
              </tr>
              <tr>
                <th>Name:</th>
                <td>
                  {referral
                    ? `${referral.studentFirstName} ${referral.studentLastName}`
                    : ""}
                </td>
              </tr>
              <tr>
                <th>Referred by:</th>
                <td>
                  {referral
                    ? `${referral.referrer.firstName} ${referral.referrer.lastName}`
                    : ""}
                </td>
              </tr>
              <tr>
                <th>Reason:</th>
                <td>{referral ? referral.reason : ""}</td>
              </tr>
              <tr>
                <th>Feedback to Referrer:</th>
                <td>
                  <div className="pb-5">
                    {referral ? referral.feedback : ""}
                  </div>
                </td>
              </tr>

              <tr>
                <th>Date:</th>
                <td>{referral ? referral.dateOfRefferal : ""}</td>
              </tr>
              <tr>
                <th>Time:</th>
                <div className="pb-7">
                  <td>{referral ? referral.dateOfRefferal : ""}</td>
                </div>
              </tr>
              <tr>
                <th>Status:</th>
                <td
                  className={`h-fit badge badge-md ${
                    referral?.status === "Pending"
                      ? "badge-warning"
                      : referral?.status === "Appointed"
                      ? "badge-info"
                      : ""
                  }`}
                  style={{ width: "30%" }}
                >
                  {referral ? referral.status : ""}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-row gap-x-4 mt-8 px-14">
            <FullButton onClick={handleSelectAppointment}>
              Select Appointment
            </FullButton>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="my_modal_7"
          onClick={() => setReferralModal(false)}
        >
          Close
        </label>
      </div>
    </>
  );
};

export default ModalReferralInfo;
