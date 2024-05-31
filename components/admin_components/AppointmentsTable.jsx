import React, { useState } from "react";
import AppointmentsRow from "./AppointmentsRow";

const AppointmentsTable = ({
  appointments,
  onDelete,
  handleApproveAppointment,
  openModal,
  setOpenModal,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (appointmentId) => {
    onDelete(appointmentId);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.appointmentPurpose
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (selectedStatus === "all" ||
        appointment.appointmentStatus === selectedStatus)
  );

  const indexOfLastAppointment = currentPage * 10;
  const indexOfFirstAppointment = indexOfLastAppointment - 10;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const totalPages = Math.ceil(currentAppointments.length / 10);

  return (
    <div className="px-10 w-full">
      <div className="flex justify-between">
        <div class="relative">
          <input
            type="text"
            placeholder="Search purposes..."
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

        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="w-40 rounded-xl text-slate-500"
        >
          <option value="all">All</option>
          <option value="Completed">Completed</option>
          <option value="Approve">Approve</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <table className="mt-8 lg:w-full xs:w-[900px]">
        <thead className="bg-slate-200">
          <tr className="">
            <th className="py-4 rounded-tl-xl text-center">Appointment Date</th>
            <th className="py-4 text-center">Time</th>
            <th className="py-4 text-center">Purpose</th>
            <th className="py-4 text-center">Status</th>
            <th className="py-4 text-center">Student</th>
            <th className="py-4 text-center rounded-tr-xl">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentAppointments.map((appointment) => (
            <AppointmentsRow
              key={appointment.appointmentId}
              appointment={appointment}
              onDelete={handleDelete}
              setOpenModal={setOpenModal}
              openModal={openModal}
              handleApproveAppointment={handleApproveAppointment}
            />
          ))}
        </tbody>
      </table>

      <div className="flex items-center gap-2 mt-5 p-2">
        <button
          className="hover:text-slate-600 cursor-pointer"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          ＜ Previous
        </button>
        <span>
          <span className="text-red-400"> {currentPage}</span> of {totalPages}
        </span>
        <button
          className="hover:text-slate-600 cursor-pointer"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next ＞
        </button>
      </div>
    </div>
  );
};

export default AppointmentsTable;
