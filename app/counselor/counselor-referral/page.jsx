"use client";

import hdrReferrals from "@/public/images/headers/hdrReferrals.png";
import { useEffect, useState } from "react";

// css
import "@/styles/counselor.css";

// modals
import Header from "@/components/Header";
import { Navbar } from "@/components/ui/Navbar";
import ModalReferralInfo from "@/components/ui/modals/counselor/referrals/ModalReferralInfo";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import Cookies from "js-cookie";

export default function Referral() {
  const ReferralsPerPage = 10;
  const userSession = getUserSession();

  const [selectedID, setSelectedID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [referralModal, setReferralModal] = useState(null);

  // referrals data
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    fetchReferrals();
  }, []); // You want to fetch referrals only once, not every time `referrals` is updated
  const fetchReferrals = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_REFERRAL_BY_COUNSELOR_ID}${userSession.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log("Data", data);
      setReferrals(data);
    } catch (error) {
      console.error("Error fetching referrals:", error);
    }
  };

  const handleRowClick = (id) => {
    setSelectedID(id);
    console.log("show id", id);
    setReferralModal(true);
  };

  // Pagination calculations
  const indexOfLastInquiry = currentPage * ReferralsPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - ReferralsPerPage;
  const currentA = referrals.slice(indexOfFirstInquiry, indexOfLastInquiry);

  function formatDateTime(dateString) {
    const date = new Date(dateString);

    // Get the components
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    // Format the time
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : "12"; // Convert '0' hour to '12'

    // Combine the formatted date and time into one string
    return `${month}/${day}/${year} - ${hours}:${minutes}:${seconds} ${ampm}`;
  }

  return (
    <div className="min-h-screen w-full">
      {/* Navigation bar */}
      <Navbar userType="counselor" />
      <Header
        image={hdrReferrals.src}
        desc="Manage sessions effortlessly and provide tailored guidance and support to students."
      />

      <div className="flex flex-col text-center">
        <div className="overflow-x-auto px-4 sm:px-10 lg:px-20 xl:px-56 py-10">
          <table className="table bg-gray-100 w-full">
            <thead className="bg-silver px-2 border-b-2 border-maroon rounded-t-2xl">
              <tr className="font-bold text-center py-4 rounded-t-2xl">
                <th className="py-4 text-xs md:text-sm">Date and Time</th>
                <th className="py-4 hidden lg:table-cell text-xs md:text-sm">
                  ID Number
                </th>
                <th className="py-4 text-xs md:text-sm">Referred Student</th>
                <th className="py-4 hidden lg:table-cell text-xs md:text-sm">
                  Reason
                </th>
                <th className="py-4 text-xs md:text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentA.map((referrals) => (
                <tr
                  key={referrals.referralId}
                  onClick={() => handleRowClick(referrals.referralId)}
                  className={`border-slate-100 border-b-2 hover:bg-slate-100 cursor-pointer transition duration-300 ease-in-out`}
                >
                  <td className="text-center text-xs md:text-sm">
                    {formatDateTime(referrals.dateOfRefferal)}
                  </td>
                  <td className="text-center hidden lg:table-cell text-xs md:text-sm">
                    {referrals.studentId}
                  </td>
                  <td className="text-center text-xs md:text-sm">
                    <div className="font-bold text-center">
                      {referrals.studentLastName} {referrals.studentFirstName}
                    </div>
                    <div className="text-xs md:text-sm opacity-50 text-center">
                      {referrals.studentEmail}
                    </div>
                  </td>
                  <td className="text-center hidden lg:table-cell text-xs md:text-sm">
                    {referrals.reason.length > 50
                      ? `${referrals.reason.substring(0, 40)}...`
                      : referrals.reason}
                  </td>
                  <td className="flex justify-center text-center">
                    <div
                      className={`w-full max-w-xs h-auto rounded-lg border border-black text-center ${
                        referrals && referrals.status === "Pending"
                          ? "status-pending"
                          : referrals && referrals.status === "Responded"
                          ? "status-responded"
                          : referrals && referrals.status === "Accepted"
                          ? "status-accepted"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        {referrals.status === "Pending" && "🟡"}
                        {referrals.status === "Responded" && "🔵"}
                        {referrals.status === "Accepted" && "🟢"}
                        <span className="ml-2 text-xs md:text-sm">
                          {referrals.status}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="join pt-5">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="join-item btn w-28"
            >
              Previous
            </button>
            {[...Array(Math.ceil(referrals.length / ReferralsPerPage))].map(
              (_, index) => (
                <button
                  key={index}
                  className={`join-item btn ${
                    currentPage === index + 1 ? "btn-active" : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(referrals.length / ReferralsPerPage)
              }
              className="join-item btn w-28"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {referralModal && (
        <ModalReferralInfo
          setReferralModal={setReferralModal}
          selectedID={selectedID}
          referrals={referrals}
          userSession={userSession}
        />
      )}
    </div>
  );
}

function getBadgeClass(status) {
  switch (status) {
    case "Pending":
      return "badge-warning";
    case "Accepted":
      return "badge-success";
    case "Appointed":
      return "badge-info";
    default:
      return "";
  }
}
