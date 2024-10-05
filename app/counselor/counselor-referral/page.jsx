"use client";

import hdrReferrals from "@/public/images/headers/hdrReferrals.png";
import { useState, useEffect } from "react";

// css
import "@/styles/counselor.css";

// modals
import { Navbar } from "@/components/ui/landing/LandingNav";
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import ModalReferralInfo from "@/components/ui/modals/counselor/referrals/ModalReferralInfo";
import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";
import { getUserSession } from "@/lib/helperFunctions";

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
      {/* navigation bar */}
      <Navbar userType="counselor" />

      {/* header */}
      <div className="w-full h-[55vh] relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${hdrReferrals.src})` }}
        ></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="flex flex-col text-left px-44 py-10 gap-y-4">
            <h1 className="font-Merriweather text-8xl">Referrals</h1>
            <p className="w-1/2 font-Jaldi text-xl">
              Manage sessions effortlessly and provide tailored guidance and
              support to students.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col text-center">
        <div className="overflow-x-auto px-56 py-10">
          <table className="table bg-gray-100">
            <thead>
              <tr className="bg-gray-200 font-bold">
                <th>Date and Time</th>
                <th className="p-5">ID Number</th>
                <th>Referred Student</th>
                <th>Reason</th>
                <th className="text-center">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentA.map((referrals) => (
                <tr
                  key={referrals.id}
                  onClick={() => handleRowClick(referrals.referralId)}
                  className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
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

      {/* modals */}
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
