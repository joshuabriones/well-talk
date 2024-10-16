"use client";

import hdrReferrals from "@/public/images/headers/hdrReferrals.png";
import { useEffect, useState } from "react";

// css
import "@/styles/counselor.css";
import { toast } from "react-hot-toast";

// modals
import Header from "@/components/Header";
import Load from "@/components/Load";
import { Navbar } from "@/components/ui/Navbar";
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import AddReferral from "@/components/ui/modals/teacher/AddReferral";
import ReferralInfo from "@/components/ui/modals/teacher/ReferralInfo";

import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const TableTitle = ({ addReferral }) => {
  return (
    <div className="flex flex-row justify-between items-center mb-3">
      <h1 className="font-Merriweather text-lg ">Referral Records</h1>
      <button
        className="w-36 font-Merriweather text-sm px-6 py-2 border-2 border-maroon text-maroon rounded-lg hover:bg-maroon hover:text-white hover:border-white transition duration-300 ease-in-out"
        onClick={addReferral}
      >
        Add Referral
      </button>
    </div>
  );
};

const TableHeaders = ({ handleSort }) => {
  return (
    <thead className="bg-silver px-2 border-b-2 border-maroon rounded-t-2xl">
                    <tr className="font-bold text-center py-4 rounded-t-2xl">
        <th className="py-4">Referred Student</th>
        <th className="py-4">College, Program and Year</th>
        {/* <th className="p-5">ID Number</th> */}
        <th className="py-4">Assigned Counselor</th>
        <th className="py-4">Reason</th>
        <th className="py-4">
          Status
        </th>
        <th className="py-4">Action</th>
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
         className={`border-slate-100 border-b-2
                          hover:bg-slate-100 cursor-pointer 
                          transition duration-300 ease-in-out`}
        >
          <td>
            <div className="flex items-center gap-3">
              <div>
                {referrals.studentLastName}, {referrals.studentFirstName}
              </div>
            </div>
          </td>
          <td>
            <div className="flex flex-row gap-x-3">
              <div className="text-sm">
                {referrals.studentCollege}: {referrals.studentProgram} -{" "}
                {referrals.studentYear}
              </div>
            </div>
          </td>
          <td>
            <div className="flex flex-row gap-x-3">
              <div className="text-sm">
                {referrals.counselor?.lastName},{" "}
                {referrals.counselor?.firstName}
              </div>
            </div>
          </td>
          {/* <td>
            <div className="flex flex-row gap-x-3">
              <div>{referrals.studentId}</div>
            </div>
          </td> */}
          <td>
            <p>
              {referrals?.reason?.length > 50
                ? `${referrals?.reason?.substring(0, 40)}...`
                : referrals?.reason}
            </p>
          </td>
          <td className="text-center">
            <div
              className={`w-26 h-6 rounded-lg border border-black flex items-center justify-center ${
                referrals && referrals.status === "Pending"
                  ? "status-pending"
                  : referrals && referrals.status === "Responded"
                  ? "status-responded"
                  : referrals && referrals.status === "Accepted"
                  ? "status-accepted"
                  : ""
              }`}
            >
              {referrals.status === "Pending" && "🟡"}
              {referrals.status === "Responded" && "🔵"}
              {referrals.status === "Accepted" && "🟢"}
              <span className="ml-2">
                {referrals.status}{" "}
                {referrals.status === "Responded" &&
                  (referrals.accepted ? "Accepted" : "Declined")}
              </span>
            </div>
          </td>

          <td>
            <div className="flex flex-row justify-center items-center gap-x-5">
              <button
                className="btn btn-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  showDeleteModal(referrals.referralId);
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

const Referral = () => {
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

  if (userSession && userSession.role !== "student") {
    return <Load route={userSession.role} />;
  }
  // sorting
  const [sortOrder, setSortOrder] = useState("asc");

  const handleRowClick = (id) => {
    setSelectedID(id);
    setReferralModal(true);
    console.log(id);
  };

  const showDeleteModal = (id) => {
    setSelectedID(id);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/user/referral/deleteReferral/${selectedID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete referral");
      }
      if (response.status !== 204) {
        // Check if the response is not empty
        const data = await response.json();
      }

      // Update local state to reflect the deletion
      const updatedReferrals = referrals.filter(
        (referral) => referral.id !== selectedID
      );
      setReferrals(updatedReferrals);

      // Close modal and reset selected ID
      setDeleteModal(false);
      toast.success("Referral deleted successfully");
      setSelectedID(null);
    } catch (error) {
      console.error("Failed to delete referral", error);
    }
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
        `${process.env.BASE_URL}${API_ENDPOINT.GET_REFERRAL_BY_ID}${userSession.id}`,
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

  return (
    <div className="min-h-screen w-full">
      <Navbar userType="student" />
      <Header
        image={hdrReferrals.src}
        desc="Empower your peers! As a student, use this referral portal to recommend friends who may benefit from counseling support. Your understanding and encouragement can help them access the resources they need for personal growth and success."
      />

      <div className="flex flex-col px-4 sm:px-10 md:px-20 lg:px-56 py-10">
        <TableTitle addReferral={setAddReferral} />

        <div className="overflow-x-auto">
          <table className="table w-full bg-gray-100">
            <TableHeaders handleSort={handleSort} />
            <TableBody
              currentList={currentList}
              handleRowClick={handleRowClick}
              showDeleteModal={showDeleteModal}
            />
          </table>
        </div>

        <PaginationControls
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          list={referrals}
        />
      </div>

      {deleteModal && (
        <ModalDelete
          setDeleteModal={setDeleteModal}
          handleDelete={handleDelete}
        />
      )}

      {referralModal && (
        <ReferralInfo
          setReferralModal={setReferralModal}
          selectedID={selectedID}
          referrals={referrals}
        />
      )}

      {addReferral && (
        <AddReferral
          userId={userSession.id}
          onOpen={setAddReferral}
          fetchReferrals={fetchReferrals}
        />
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Referral), { ssr: false });
