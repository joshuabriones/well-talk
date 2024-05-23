"use client";

import React, { useState, useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import GlobalContext from "@/context/GlobalContext";

// dummy time slots
const timeSlotsAvailable = [];

export default function AppointmentModal() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dummyUsers, setDummyUsers] = useState(getDummyUsers());
  const [selectedUser, setSelectedUser] = useState(null);
  const [timeSlots, setTimeSlots] = useState(timeSlotsAvailable);

  const { setShowAppointmentModal, daySelected } = useContext(GlobalContext);

  const filteredUsers = dummyUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-2/4 h-2/3 bg-white drop-shadow-xl absolute rounded-lg p-8 font-Merriweather">
      <span
        onClick={() => setShowAppointmentModal(false)}
        className="cursor-pointer p-2 absolute top-4 right-4 rounded-full bg-red-200 hover:bg-red-300 duration-300"
      >
        <CloseIcon sx={{ color: "red" }} />
      </span>
      <h1 className="font-bold text-xl">Set an Appointment</h1>
      <div className="grid grid-cols-3 mt-5 gap-5">
        <div className="col-span-2 flex flex-col gap-2">
          <UserSearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <div className="w-full h-[440px] overflow-y-scroll">
            <p className="font-light italic font text-slate-600 mt-2">
              {selectedUser
                ? `Selected: ${selectedUser.name}`
                : "Select a student to appoint"}
            </p>
            {filteredUsers.map((user) => (
              <button
                key={user.id}
                className="w-full text-left p-2 border-b-[1px] border-slate-300 hover:rounded-lg hover:bg-green-300"
                onClick={() => setSelectedUser(user)}
              >
                <ul className="flex justify-between text-left text-slate-500">
                  <li>🟢 {user.name} </li>
                  <li>{user.email}</li>
                </ul>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <h3 className="text-lg">Date: {daySelected.format("MM-DD-YYYY")}</h3>
          <div className="overflow-y-scroll h-[440px]">
            {timeSlots.map((slot) => (
              <button
                className={`w-full p-4 border-slate-300 rounded-xl mb-5 ${
                  slot.isAvailable
                    ? "border-[1px] border-[#CCE3DE] text-primary-green"
                    : "bg-primary-green text-white"
                }`}
                disabled={!slot.isAvailable}
                onClick={() => alert(`Appointment set! ${slot.time}`)}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UserSearchInput({ searchTerm, setSearchTerm }) {
  return (
    <div class="relative w-1/2">
      <input
        type="text"
        placeholder="Search users..."
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

function getDummyUsers() {
  return [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      idNumber: "19-1911-377",
      role: "counselor",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      idNumber: "19-1911-300",
      role: "student",
    },
    {
      id: 3,
      name: "Alice Doe",
      email: "alice@example.com",
      idNumber: "19-2000-377",
      role: "teacher",
    },
    {
      id: 4,
      name: "Bob Doe",
      email: "bob@example.com",
      idNumber: "19-1911-2222",
      role: "teacher",
    },
    {
      id: 5,
      name: "Michael Smith",
      email: "michael@example.com",
      idNumber: "11-1911-477",
      role: "counselor",
    },
    {
      id: 6,
      name: "Emily Johnson",
      email: "emily@example.com",
      idNumber: "19-1211-307",
      role: "student",
    },
    {
      id: 7,
      name: "William Brown",
      email: "william@example.com",
      idNumber: "20-1911-277",
      role: "student",
    },
    {
      id: 8,
      name: "Emma Jones",
      email: "emma@example.com",
      idNumber: "19-1911-0000",
      role: "teacher",
    },
    {
      id: 9,
      name: "Olivia Taylor",
      email: "olivia@example.com",
      idNumber: "19-1911-100",
      role: "student",
    },
    {
      id: 10,
      name: "James Wilson",
      email: "james@example.com",
      idNumber: "19-1911-113",
      role: "teacher",
    },
    {
      id: 11,
      name: "Sophia Anderson",
      email: "sophia@example.com",
      idNumber: "19-1911-377",
      role: "student",
    },
    {
      id: 12,
      name: "Daniel Martinez",
      email: "daniel@example.com",
      idNumber: "19-1911-377",
      role: "counselor",
    },
    {
      id: 13,
      name: "Isabella Jackson",
      email: "isabella@example.com",
      idNumber: "19-1911-377",
      role: "student",
    },
    {
      id: 14,
      name: "Liam Harris",
      email: "liam@example.com",
      idNumber: "19-1911-377",
      role: "teacher",
    },
    {
      id: 15,
      name: "Mia Martin",
      email: "mia@example.com",
      idNumber: "19-1911-377",
      role: "teacher",
    },
    {
      id: 16,
      name: "Ethan Thompson",
      email: "ethan@example.com",
      idNumber: "19-1911-377",
      role: "student",
    },
    {
      id: 17,
      name: "Amelia Garcia",
      email: "amelia@example.com",
      idNumber: "19-1911-377",
      role: "counselor",
    },
    {
      id: 18,
      name: "Lucas Robinson",
      email: "lucas@example.com",
      idNumber: "19-1911-377",
      role: "student",
    },
    {
      id: 19,
      name: "Ava Clark",
      email: "ava@example.com",
      idNumber: "19-1911-377",
      role: "teacher",
    },
    {
      id: 20,
      name: "Alexander Rodriguez",
      email: "alexander@example.com",
      idNumber: "19-1911-377",
      role: "counselor",
    },
  ];
}

// Loop by hour increments
for (let hour = 9; hour <= 17; hour++) {
  const timeString = `${hour % 12 !== 0 ? hour % 12 : 12}:${
    hour >= 12 ? "00 PM" : "00 AM"
  }`;
  const isAvailable = Math.random() >= 0.5; // Randomly assign true/false for availability

  timeSlotsAvailable.push({
    time: timeString,
    isAvailable,
  });
}
