import { useEffect, useState } from "react";
import { getUserSession } from "@/lib/helperFunctions";
import iconDelete from "@/public/images/icons/iconDelete.png";

import "@/styles/counselor.css";

const ReferralInfo = ({ setReferralModal, selectedID, referrals }) => {
	const [isChecked, setIsChecked] = useState(true);
	const [referral, setReferral] = useState(null);
  const userSession = getUserSession();

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

  const handleModalClose = () => {
		setIsChecked(false); // Close the modal
		setReferralModal(false); // Close the parent modal
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
			<div
				className="modal"
				role="dialog">
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
				<label
						 className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0 flex items-center justify-center"
						htmlFor="my_modal_7"
						onClick={handleModalClose}>
						Close
					</label>
					<div className="bg-white shadow-xl border border-slate-200 border-2 rounded-xl hover:-translate-y-1 duration-500 w-full lg:w-3/12 p-2 lg:p-4 relative">
						<section className="items-center md:gap-4 mb-8 justify-center w-full">
							<div className="w-full flex justify-center avatar absolute -top-16 md:-top-24">
								<div className="w-32 md:w-40 rounded-full ring ring-[#6B9080] ring-offset-base-100 ring-offset-1">
									<img
										src={userSession?.image}
										alt="appointee avatar"
									/>
								</div>
							</div>

              <div className="flex justify-center flex-col px-12">
								<table className="mb-4 mt-20">
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
										? `${referral.teacher.firstName} ${referral.teacher.lastName}`
										: ""}
								</td>
							</tr>
							<tr>
								<th>Reason:</th>
								<td>{referral ? referral.reason : ""}</td>
							</tr>
							{/* <tr>
                <th>Addtional Notes:</th>
                <td>
                  <div className="pb-5">
                    {referral ? referral.additional_notes : ""}
                  </div>
                </td>
              </tr> */}

							<tr>
								<th>Date:</th>
								<td>
									{referral ? referral.dateOfRefferal : ""}
								</td>
							</tr>
							<tr>
								<th>Time:</th>
								<div className="pb-7">
									<td>
										{referral
											? referral.dateOfRefferal
											: ""}
									</td>
								</div>
							</tr>
							<tr>
								<th>Status:</th>
								<td>
                <div className={`w-28 h-6 rounded-lg border border-black flex items-center justify-center`}>
										{referral && referral?.status ===
											"Pending" &&
                      "🟡"}
											{referral && referral?.status === "Accepted"
											&&
                      "🟢"}
									<span className="ml-2 text-bold text-sm">
                    {referral ? referral.status : ""}
                    </span>
                  </div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
        </section>
        </div>
        </div>
			</div>
		</>
	);
};

export default ReferralInfo;
