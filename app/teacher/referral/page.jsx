"use client";

import hdrReferrals from "@/public/images/headers/hdrReferrals.png";
import { useState, useEffect } from "react";

// css
import "@/styles/counselor.css";

// modals
import Header from "@/components/Header";
import { Navbar } from "@/components/ui/landing/LandingNav";
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import AddReferral from "@/components/ui/modals/teacher/AddReferral";
import ReferralInfo from "@/components/ui/modals/teacher/ReferralInfo";
import Load from "@/components/Load";

import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import Cookies from "js-cookie";

export default function Referral() {
  const ReferralsPerPage = 10;
  const userSession = getUserSession();

  const [selectedID, setSelectedID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [referralModal, setReferralModal] = useState(null);
  const [addReferral, setAddReferral] = useState(false);

  // referrals sample
  const [referrals, setReferrals] = useState([{}]);

  /* Handling unauthenticated users */
  if (Cookies.get("token") === undefined || Cookies.get("token") === null) {
    return <Load route="login" />;
  }

  if (userSession && userSession.role !== "teacher") {
    return <Load route={userSession.role} />;
  }
  // sorting
  const [sortOrder, setSortOrder] = useState("asc");

  const handleRowClick = (id) => {
    setSelectedID(id);
    setReferralModal(true);
  };

  const showDeleteModal = (id) => {
    setSelectedID(id);
    setDeleteModal(true);
  };

  const handleDelete = () => {
    // Find
    const selected = referrals.find((referral) => referral.id === selectedID);

    // Delete
    const newReffera = referrals.filter(
      //
      (referral) => referral.id !== selectedID
    );
    setReferrals(newReffera);

    // Reset
    setDeleteModal(false);
    setSelectedID(null);
  };

  // Calculate the index range of refferal to display for the current page
  const indexOfLastInquiry = currentPage * ReferralsPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - ReferralsPerPage;
  const currentList = referrals.slice(indexOfFirstInquiry, indexOfLastInquiry);

  const handleSort = (column) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    const sortedList = [...referrals].sort((a, b) => {
      if (column === "id") {
        return order === "asc" ? a.id - b.id : b.id - a.id;
        // }
        // else if (column === "dateTime") {
        // 	// Combine date and time strings into a single Date object for comparison
        // 	const dateTimeA = new Date(`${a.date} ${a.timeStart}`);
        // 	const dateTimeB = new Date(`${b.date} ${b.timeStart}`);
        // 	return order === "asc" ? dateTimeA - dateTimeB : dateTimeB - dateTimeA;
      } else if (column === "status") {
        // Define priority order for status
        const statusOrder = ["Pending", "Accepted"];
        return order === "asc"
          ? statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
          : statusOrder.indexOf(b.status) - statusOrder.indexOf(a.status);
      }
      return 0;
    });
    setReferrals(sortedList);
  };

  const fetchReferrals = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_REFERRALS}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch referrals");
      }
      const data = await response.json();
      setReferrals(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (userSession) {
      fetchReferrals();
    }
  }, []);

  console.log(referrals);

  return (
    <div className="min-h-screen w-full">
      <Navbar userType="counselor" />
      <Header
        image={hdrReferrals.src}
        desc="Unlock student potential! Teachers, utilize this referral portal to recommend students who could thrive with counseling support. Your insight fuels our commitment to student well-being and success."
      />

      <div className="flex flex-col">
        <div className="overflow-x-auto px-56 py-10">
          <TableTitle addReferral={setAddReferral} />

          <table className="table bg-gray-100">
            <TableHeaders handleSort={handleSort} />
            <TableBody
              currentList={currentList}
              handleRowClick={handleRowClick}
              showDeleteModal={showDeleteModal}
            />
          </table>

          <PaginationControls
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            list={referrals}
          />
        </div>
      </div>

      {deleteModal && (
        <ModalDelete
          setDeleteModal={setDeleteModal}
          handleDelete={handleDelete}
        ></ModalDelete>
      )}

      {referralModal && (
        <ReferralInfo
          setReferralModal={setReferralModal}
          selectedID={selectedID}
          referrals={referrals}
        ></ReferralInfo>
      )}

      {addReferral && <AddReferral onOpen={setAddReferral}></AddReferral>}
    </div>
  );
}

const TableTitle = ({ addReferral }) => {
  return (
    <div className="flex flex-row justify-between items-center mb-3">
      <h1 className="font-Merriweather text-lg ">Referral Records</h1>
      <button
        className="w-36 font-Merriweather text-sm px-6 py-2 border border-black rounded-lg hover:bg-[#6B9080] hover:text-white hover:border-white transition duration-300 ease-in-out"
        onClick={addReferral}
      >
        Add Referral
      </button>
    </div>
  );
};

const TableHeaders = ({ handleSort }) => {
  return (
    <thead>
      <tr className="bg-gray-200 font-bold">
        <th
          className="hover:bg-gray-300 cursor-pointer p-5 text-center"
          onClick={() => handleSort("id")}
          style={{ width: "5%" }}
        >
          ID
        </th>
        <th>Date and Time</th>
        <th className="p-5">ID Number</th>
        <th>Referred Student</th>
        <th className="">Reason</th>
        <th
          className="hover:bg-gray-300 cursor-pointer p-5 text-center"
          onClick={() => handleSort("status")}
          style={{ width: "10%" }}
        >
          Status
        </th>
        {/* Delete and Edit*/}
        <th className="no-hover-highlight"></th>
      </tr>
    </thead>
  );
};

const TableBody = ({ currentList, handleRowClick, showDeleteModal }) => {
  return (
    <tbody>
      {currentList.map((referrals) => (
        <tr
          key={referrals.referralId}
          onClick={() => handleRowClick(referrals.referralId)}
          className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
        >
          <td className="text-center">{referrals.referralId}</td>
          <td>
            <div className="flex flex-row gap-x-3">
              <div className="text-sm">{referrals.dateOfRefferal}</div>
            </div>
          </td>
          <td>
            <div className="flex flex-row gap-x-3">
              <div>{referrals.studentId}</div>
            </div>
          </td>
          <td>
            <div className="flex items-center gap-3">
              <div>{referrals.studentEmail}</div>
            </div>
          </td>
          <td>
            <p>
              {referrals?.reason?.length > 50
                ? `${referrals?.reason?.substring(0, 40)}...`
                : referrals?.reason}
            </p>
          </td>
          <td className="text-center">
            <div
              className={`w-24 h-5 badge badge-xs ${
                referrals && referrals.status === "Pending"
                  ? "badge-warning"
                  : referrals && referrals.status === "Responded"
                  ? "badge-success"
                  : referrals && referrals.status === "Accepted"
                  ? "badge-info"
                  : ""
              }`}
            >
              {referrals.status}
            </div>
          </td>

          <td>
            <div className="flex flex-row justify-center items-center gap-x-5">
              <button
                className="btn btn-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  showDeleteModal(referrals.id);
                }}
              >
                Delete
              </button>
              <button className="btn btn-xs text-green-700">Edit</button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const PaginationControls = ({ currentPage, setCurrentPage, list }) => {
  const ReferralsPerPage = 10;

  return (
    <div className="join pt-5 flex flex-row justify-center">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="join-item btn w-28"
      >
        Previous
      </button>
      {[...Array(Math.ceil(list.length / ReferralsPerPage))].map((_, index) => (
        <button
          key={index}
          className={`join-item btn ${
            currentPage === index + 1 ? "btn-active" : ""
          }`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={ReferralsPerPage > list.length}
        className="join-item btn w-28"
      >
        Next
      </button>
    </div>
  );
};
