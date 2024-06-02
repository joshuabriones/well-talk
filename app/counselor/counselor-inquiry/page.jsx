"use client";

import { Navbar } from "@/components/ui/Navbar";
import { API_ENDPOINT } from "@/lib/api";
import hdrInquiry from "@/public/images/headers/hdrInquiry.png";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
// css
import "@/styles/counselor.css";
import { toast } from "react-hot-toast";

// modals
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import ModalInquiryInfo from "@/components/ui/modals/counselor/inquiries/ModalInquiryInfo";

export default function Home() {
  const inquiriesPerPage = 10;

  const [selectedID, setSelectedID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [inquiryModal, setInquiryModal] = useState(null);

  // inquiries sample
  const [inquiries, setInquiries] = useState([]);

  const fetchInquiries = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_INQUIRIES}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch inquiries");
      }

      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleRowClick = (id) => {
    setSelectedID(id);
    setInquiryModal(true);
  };

  const showDeleteModal = (id) => {
    setSelectedID(id);
    setDeleteModal(true);
  };

  // const handleDelete = async () => {
  // 	// // Find
  // 	// const selected = inquiries.find((inquiry) => inquiry.id === selectedID);

  // 	// // Delete
  // 	// const newInquiries = inquiries.filter(
  // 	//   (inquiry) => inquiry.id !== selectedID
  // 	// );
  // 	// setInquiries(newInquiries);

  // 	try {
  // 		const response = await fetch(`/api/inquiry/delete-inquiry`, {
  // 			method: "PUT",
  // 			headers: {
  // 				"Content-Type": "application/json",
  // 			},
  // 			body: JSON.stringify({ inquiryId: selectedID }),
  // 		});
  // 		console.log(response);
  // 	} catch {
  // 		throw new Error("Failed to delete inquiry");
  // 	}

  // 	// Reset
  // 	setDeleteModal(false);
  // 	setSelectedID(null);
  // };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.DELETE_INQUIRY}${selectedID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete inquiry");
      }
      if (response.status !== 204) { // Check if the response is not empty
        const data = await response.json();
      }

      // Update local state to reflect the deletion
      const updatedInquiries = inquiries.filter(
        (inquiry) => inquiry.inquiryId !== selectedID
      );
      setInquiries(updatedInquiries);

      // Close modal and reset selected ID
      setDeleteModal(false);
      toast.success("Inquiry deleted successfully");
      setSelectedID(null);
    } catch (error) {
      console.error("Failed to delete inquiry", error);
    }
  };
  // Calculate the index range of inquiries to display for the current page
  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = inquiries?.slice(
    indexOfFirstInquiry,
    indexOfLastInquiry
  );

  return (
    <div className="min-h-screen w-full">
      {/* navigation bar */}
      <Navbar userType="counselor" />

      {/* header */}
      <div className="w-full h-[55vh] relative">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url(${hdrInquiry.src})`,
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="flex flex-col text-left px-44 py-10 gap-y-4">
            <h1 className="font-Merriweather text-8xl">Inquiries</h1>
            <p className="w-1/2 font-Jaldi text-xl">
              Facilitate student inquiries and foster meaningful connections
              with counselors. Students can ask questions, seek guidance, and
              receive personalized support to navigate their academic and
              personal journey effectively.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col text-center">
        {/* table*/}
        <div className="overflow-x-auto px-56 py-10 ">
          <table className="table bg-gray-100">
            {/* head */}
            <thead>
              <tr className="bg-gray-200 font-bold">
                <th className="text-center p-5" style={{ width: "5%" }}>
                  ID
                </th>
                <th style={{ width: "15%" }}>Date and Time</th>
                <th style={{ width: "20%" }}>Inquirer</th>
                <th style={{ width: "15%" }}>Subject of Inquiry</th>
                <th className="text-center" style={{ width: "10%" }}>
                  Status
                </th>
                {/* Delete and Edit*/}
                <th
                  className="no-hover-highlight"
                  style={{ width: "10%" }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {currentInquiries?.map((inquiry) => (
                <tr
                  key={inquiry.inquiryId}
                  onClick={() => handleRowClick(inquiry.inquiryId)}
                  className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
                >
                  <td className="text-center">{inquiry.inquiryId}</td>
                  <td>
                    <div className="flex flex-row gap-x-3">
                      <div className="text-sm">{inquiry.date}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={inquiry?.sender.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {inquiry?.sender?.firstName}{" "}
                          {inquiry?.sender?.lastName}
                        </div>
                        <div className="text-sm opacity-50">
                          {inquiry.sender.institutionalEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>
                      {inquiry.subject.length > 50
                        ? `${inquiry.subject.substring(0, 40)}...`
                        : inquiry.subject}
                    </p>
                  </td>
                  <td className="text-center">
                    <div
                      className={`w-24 h-5 badge badge-xs ${inquiry.status === false
                        ? "badge-warning"
                        : "badge-success"
                        }`}
                    >
                      {inquiry.status ? "Replied" : "Pending"}
                    </div>
                  </td>

                  {/* Delete and Edit */}
                  <td>
                    <div className="flex flex-row justify-center items-center gap-x-5">
                      <button
                        className="btn btn-xs"
                        onClick={(e) => {
                          // Stop event propagation to prevent row hover effect
                          e.stopPropagation();
                          showDeleteModal(inquiry.inquiryId);
                        }}
                      >
                        Delete
                      </button>
                      <button className="btn btn-xs text-green-700">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="join pt-5">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="join-item btn w-28"
            >
              Previous
            </button>

            {inquiries &&
              [
                ...Array(
                  Math.ceil((inquiries?.length || 1) / inquiriesPerPage)
                ),
              ].map((_, index) => (
                <button
                  key={index}
                  className={`join-item btn ${currentPage === index + 1 ? "btn-active" : ""
                    }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={inquiriesPerPage > inquiries?.length}
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
        ></ModalDelete>
      )}

      {inquiryModal && (
        <ModalInquiryInfo
          setInquiryModal={setInquiryModal}
          selectedID={selectedID}
          inquiries={inquiries}
          fetchInquiries={fetchInquiries}
        ></ModalInquiryInfo>
      )}
    </div>
  );
}
