"use client";

import hdrInquiry from "@/public/images/headers/hdrInquiry.png";
import { useState, useEffect } from "react";

// css
import "@/styles/counselor.css";

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

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch("/api/inquiry/view-inquiries");
        const data = await response.json();
        setInquiries(data.inquiries);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    };

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

  const handleDelete = () => {
    // Find
    const selected = inquiries.find((inquiry) => inquiry.id === selectedID);

    // Delete
    const newInquiries = inquiries.filter(
      (inquiry) => inquiry.id !== selectedID
    );
    setInquiries(newInquiries);

    // Reset
    setDeleteModal(false);
    setSelectedID(null);
  };

  // Calculate the index range of inquiries to display for the current page
  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = inquiries.slice(
    indexOfFirstInquiry,
    indexOfLastInquiry
  );

  return (
    <div className="min-h-screen w-full">
      {/* navigation bar */}
      <div className="h-20 w-full bg-white flex flex-row justify-between items-center px-44">
        <div className="text-2xl text-[#6B9080] font-Merriweather font-bold">
          WellTalk
        </div>
        <div className="flex flex-row gap-x-16">
          <div className="text-lg font-Jaldi">Home</div>
          <div className="text-lg font-Jaldi">About</div>
          <div className="text-lg font-Jaldi">Contact</div>
        </div>
      </div>

      {/* header */}
      <div className="w-full h-96 relative">
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
                <th className="text-center p-5">ID</th>
                <th>Date and Time</th>
                <th>Inquirer</th>
                <th className="">Subject of Inquiry</th>
                <th className="text-center">Status</th>
                {/* Delete and Edit*/}
                <th className="no-hover-highlight"></th>
              </tr>
            </thead>
            <tbody>
              {currentInquiries.map((inquiry) => (
                <tr
                  key={inquiry.id}
                  onClick={() => handleRowClick(inquiry.id)}
                  className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
                >
                  <td className="text-center">{inquiry.id}</td>
                  <td>
                    <div className="flex flex-row gap-x-3">
                      <div className="text-sm">{inquiry.dateTime}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={inquiry.inquirer.avatar}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{inquiry.inquirer.name}</div>
                        <div className="text-sm opacity-50">
                          {inquiry.inquirer.email}
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
                      className={`w-24 h-5 badge badge-xs ${
                        inquiry.status === "Pending"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {inquiry.status}
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
                          showDeleteModal(inquiry.id);
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
            {[...Array(Math.ceil(inquiries.length / inquiriesPerPage))].map(
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
              disabled={inquiriesPerPage > inquiries.length}
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
        ></ModalInquiryInfo>
      )}
    </div>
  );
}
