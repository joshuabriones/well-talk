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
