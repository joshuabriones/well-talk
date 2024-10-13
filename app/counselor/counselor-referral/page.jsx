"use client";

import hdrReferrals from "@/public/images/headers/hdrReferrals.png";
import { useState, useEffect } from "react";

// css
import "@/styles/counselor.css";

// modals
import { Navbar } from "@/components/ui/Navbar";
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import ModalReferralInfo from "@/components/ui/modals/counselor/referrals/ModalReferralInfo";
import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";
import { getUserSession } from "@/lib/helperFunctions";
import Header from "@/components/Header";

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
      setReferrals(data);
    } catch (error) {
      console.error("Error fetching referrals:", error);
    }
  };

  const handleRowClick = (id) => {
    setSelectedID(id);
    setReferralModal(true);
  };

  const showDeleteModal = (id) => {
    setSelectedID(id);
    setDeleteModal(true);
  };

  const handleDelete = () => {
    const newReferrals = referrals.filter(
      (referral) => referral.id !== selectedID
    );
    setReferrals(newReferrals);
    setDeleteModal(false);
    setSelectedID(null);
  };

  // Pagination calculations
  const indexOfLastInquiry = currentPage * ReferralsPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - ReferralsPerPage;
  const currentA = referrals.slice(indexOfFirstInquiry, indexOfLastInquiry);

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
          <th className="py-4">Date and Time</th>
          <th className="py-4">ID Number</th>
                 <th className="py-4">Referred Student</th>
                 <th className="py-4">Reason</th>
                 <th className="py-4">Status</th>
                 <th className="py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentA.map((referrals) => (
                <tr
                  key={referrals.id}
                  onClick={() => handleRowClick(referrals.referralId)}
                  className={`border-slate-100 border-b-2
                    hover:bg-slate-100 cursor-pointer 
                    transition duration-300 ease-in-out`}
                >
                  <td>{referrals.date}</td>
                  <td>{referrals.studentIdNumber}</td>
                  <td>
                    <div className="font-bold">
                      {referrals.studentLastName} {referrals.studentFirstName}
                    </div>
                    <div className="text-sm opacity-50">
                      {referrals.studentEmail}
                    </div>
                  </td>
                  <td>
                    {referrals.reason.length > 50
                      ? `${referrals.reason.substring(0, 40)}...`
                      : referrals.reason}
                  </td>
                  <td className="text-center">
                    <div className={`badge ${getBadgeClass(referrals.status)}`}>
                      {referrals.status}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        showDeleteModal(referrals.id);
                      }}
                    >
                      Delete
                    </button>
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
  
      {/* Modals */}
      {deleteModal && (
        <ModalDelete
          setDeleteModal={setDeleteModal}
          handleDelete={handleDelete}
        />
      )}
  
      {referralModal && (
        <ModalReferralInfo
          setReferralModal={setReferralModal}
          selectedID={selectedID}
          referrals={referrals}
        />
      )}
    </div>
  );
  
}

function getBadgeClass(status) {
  switch (status) {
    case "Pending":
      return "badge-warning";
    case "Responded":
      return "badge-success";
    case "Appointed":
      return "badge-info";
    default:
      return "";
  }
}
