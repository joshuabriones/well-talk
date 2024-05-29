"use client";

import React, { useState, useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";

export default function AppointmentModal({
  setOpenModal,
  appointmentID,
  handleApproveAppointment,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [counselors, setCounselors] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_COUNSELORS}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setCounselors(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredUsers = counselors.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-2/4 h-2/3 bg-white drop-shadow-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute rounded-lg p-8 font-Merriweather">
      <span
        onClick={() => setOpenModal(false)}
        className="cursor-pointer p-2 absolute top-4 right-4 rounded-full bg-red-200 hover:bg-red-300 duration-300"
      >
        <CloseIcon sx={{ color: "red" }} />
      </span>
      <h1 className="font-bold text-xl">Set an Appointment</h1>
      <div className="grid grid-cols-2 mt-5 gap-5">
        <div className="col-span-2 flex flex-col gap-2">
          <UserSearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <div className="relative w-full max-h-1/3 min-h-20 overflow-y-scroll">
            <p className="font-light italic font text-slate-600 mt-2">
              {selectedUser
                ? `Selected: ${selectedUser.firstName} ${selectedUser.lastName}`
                : "Select the counselor you want to assign to this student."}
            </p>
            {filteredUsers.map((user) => (
              <button
                key={user.id}
                className={`w-full text-left p-2 border-b-[1px] border-slate-300 rounded-lg hover:bg-green-300 ${
                  selectedUser?.id === user.id && "bg-green-300"
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <ul className="flex justify-between text-left text-slate-500">
                  <li>
                    🟢 {user.firstName} {user.lastName}
                  </li>
                  <li>{user.institutionalEmail}</li>
                </ul>
              </button>
            ))}
          </div>
        </div>
      </div>
      <button
        className="bg-black py-2 px-4 rounded-lg text-white absolute right-3 bottom-4 hover:bg-slate-800"
        onClick={() =>
          handleApproveAppointment(
            appointmentID,
            selectedUser?.institutionalEmail
          )
        }
      >
        Set Appointment
      </button>
    </div>
  );
}

function UserSearchInput({ searchTerm, setSearchTerm }) {
  return (
    <div class="relative w-1/2">
      <input
        type="text"
        placeholder="Search counselor..."
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
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </div>
  );
}
