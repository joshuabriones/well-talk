import React, { useState } from "react";
import ReferralsRow from "./ReferralsRow";

const ReferralsTable = ({ referrals, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (referralId) => {
    onDelete(referralId);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredReferrals = referrals?.filter((referral) =>
    referral.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastReferral = currentPage * 10;
  const indexOfFirstReferral = indexOfLastReferral - 10;
  const currentReferrals = filteredReferrals?.slice(
    indexOfFirstReferral,
    indexOfLastReferral
  );

  const totalPages = Math.ceil(currentReferrals?.length / 10);

  return (
    <div className="px-10 w-full">
      <div className="flex justify-between">
        <div class="relative">
          <input
            type="text"
            placeholder="Search reasons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            class="relative w-full h-12 px-4 transition-all border rounded-xl text-slate-500 autofill:bg-white"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute w-6 h-6 cursor-pointer top-3 right-4 stroke-slate-400 peer-disabled:cursor-not-allowed"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            aria-labelledby="title-9 description-9"
            role="graphics-symbol"
          >
            <title id="title-9">Search icon</title>
            <desc id="description-9">Icon description here</desc>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>

      <table className="mt-8 lg:w-full sm:w-[900px]">
        <thead className="bg-slate-200">
          <tr className="text-left">
            <th className="px-10 py-4 rounded-tl-xl">Referred Student</th>
            <th className="py-4">Student ID</th>
            <th className="py-4">Teacher</th>
            <th className="py-4">Reason</th>
            <th className="py-4">Status</th>
            <th className="py-4 rounded-tr-xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentReferrals?.map((referral) => (
            <ReferralsRow
              key={referral.referralId}
              referral={referral}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>

      <div className="flex items-center gap-2 mt-5 p-2">
        <button
          className="hover:text-slate-600 cursor-pointer"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          ＜ Previous
        </button>
        <span>
          <span className="text-red-400"> {currentPage}</span> of {totalPages}
        </span>
        <button
          className="hover:text-slate-600 cursor-pointer"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next ＞
        </button>
      </div>
    </div>
  );
};

export default ReferralsTable;
