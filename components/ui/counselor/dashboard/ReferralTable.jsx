import React from 'react';

const ReferralTable = ({ currentReferrals, handleRowClick, currentPageReferrals, setCurrentPageReferrals, referralsPerPage }) => {

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Referrals</h2>
      <div className="flex flex-col text-center">
        <div className="overflow-x-auto px-56 py-10">
          <table className="table bg-white w-full rounded-lg">
            <thead>
              <tr className="bg-gray-200 font-bold">
                <th className="text-center p-5">ID</th>
                <th>Date and Time</th>
                <th>Referred Student</th>
                <th className="">Reason</th>
              </tr>
            </thead>
            <tbody>
              {currentReferrals.map((referral) => (
                <tr key={referral.id} onClick={() => handleRowClick(referral.id)} className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out">
                  <td className="text-center">{referral.id}</td>
                  <td>
                    <div className="flex flex-row gap-x-3">
                      <div className="text-sm">{referral.date}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={referral.student.image} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {referral.student.firstName} {referral.student.lastName}
                        </div>
                        <div className="text-sm opacity-50">
                          {referral.student.institutionalEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>
                      {referral.reason.length > 50 ? `${referral.reason.substring(0, 40)}...` : referral.reason}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReferralTable;
