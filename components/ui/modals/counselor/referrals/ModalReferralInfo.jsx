"use client";
import { useEffect, useState } from "react";
import FullButton from "@/components/ui/buttons/FullButton";
import iconDelete from "@/public/images/icons/iconDelete.png";
import { useRouter } from "next/navigation";

import "@/styles/counselor.css";

const ModalReferralInfo = ({
  setReferralModal,
  selectedID,
  referrals,
  userSession,
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const [referral, setReferral] = useState(null);
  const route = useRouter();

  // For dialog
  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  // Find referrals
  useEffect(() => {
    const handleFindReferral = () => {
      const foundReferral = referrals.find(
        (referral) => referral.referralId === selectedID
      );
      setReferral(foundReferral);
    };

    handleFindReferral();
  }, [selectedID, referrals]);

  // Handle select appointment
  const handleSelectAppointment = () => {
    const query = new URLSearchParams({ referralId: `${selectedID}` });
    route.push(`/counselor/counselor-appointment?${query}`);
  };

  const handleOverlayClick = () => {
    setReferralModal(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center w-full bg-white bg-opacity-25 z-50 backdrop-blur"
      role="dialog"
      onClick={handleOverlayClick}
    >
      <div className="bg-white shadow-xl border w-4/5 md:max-w-lg lg:max-w-lg border-gray border-2 rounded-xl relative">
      <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              &times;
            </button>
        <section className="text-center items-center md:gap-4 mb-8 justify-center w-full">
          <div className="w-full flex justify-center avatar absolute -top-16 md:-top-24">
            {/* <div className="w-32 md:w-40 rounded-full ring ring-maroon ring-offset-base-100 ring-offset-1">
							<img
								src={referral?.student?.image} // Use referral image or default
								alt="appointee avatar"
							/>
						</div> */}
          </div>

          <div className="flex justify-center text-center items-center flex-col gap-y-2 px-12 lg:ml-8">
            <table className="mb-4 mt-8 w-full ml-2">
              <tbody>
                <tr className="py-4">
                  <th className="text-left py-2 pr-4">ID Number:</th>
                  <td className="py-2">{referral ? referral.studentId : ""}</td>
                </tr>
                <tr className="py-4">
                  <th className="text-left py-2 pr-4">Name:</th>
                  <td className="py-2">
                    {referral
                      ? `${referral.studentFirstName} ${referral.studentLastName}`
                      : ""}
                  </td>
                </tr>
                <tr className="py-4">
                  <th className="text-left py-2 pr-4">Referred by:</th>
                  <td className="py-2">
                    {referral
                      ? `${referral.referrer.firstName} ${referral.referrer.lastName}`
                      : ""}
                  </td>
                </tr>
                <tr className="py-4">
                  <th className="text-left py-2 pr-4">Reason:</th>
                  <td className="py-2">{referral ? referral.reason : ""}</td>
                </tr>
                <tr className="py-4">
                  <th className="text-left py-2 pr-4">Feedback to Referrer:</th>
                  <td className="py-2">
                    <div className="pb-5">
                      {referral ? referral.feedback : ""}
                    </div>
                  </td>
                </tr>
                <tr className="py-4">
                  <th className="text-left py-2 pr-4">Date:</th>
                  <td className="py-2">
                    {referral
                      ? new Date(referral.dateOfRefferal).toLocaleDateString()
                      : ""}
                  </td>
                </tr>
                <tr className="py-4">
                  <th className="text-left py-2 pr-4">Time:</th>
                  <td className="py-2">
                    {referral
                      ? new Date(referral.dateOfRefferal).toLocaleTimeString()
                      : ""}
                  </td>
                </tr>
                <tr className="py-4">
                  <th className="text-left py-2 pr-4">Status:</th>
                  <td className="py-2">
                    <div
                      className={`w-30 h-6 rounded-lg border border-black flex items-center justify-center`}
                    >
                      {referral && referral.status === "Pending" && "🟡"}
                      {referral && referral.status === "Completed" && "🟢"}
                      {referral && referral.status === "On-going" && "🔵"}
                      <span className="ml-2 font-bold text-sm">
                        {referral ? referral.status : ""}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Hide button if user is student or teacher */}
          {userSession?.role === "counselor" &&
            referral &&
            (referral.status === "Pending" ||
              referral.status === "Accepted") && (
              <div className="flex justify-center mt-3 px-10">
                <FullButton onClick={handleSelectAppointment}>
                  Select Appointment
                </FullButton>
              </div>
            )}
        </section>
      </div>
    </div>
  );
};

export default ModalReferralInfo;
