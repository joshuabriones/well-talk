"use client";

import hdrAppointment from "@/public/images/headers/hdrAppointment.png";
import { useState, useEffect } from "react";

// css
import "@/styles/counselor.css";

// modals
import { Navbar } from "@/components/ui/Navbar";
import ModalAppointmentInfo from "@/components/ui/modals/counselor/appointments/ModalAppointmentInfo";
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";

export default function Appointment() {
  const AppointmentPerPage = 10;

  const [selectedID, setSelectedID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(null);

  // table state (pending appointments || my appointments)
  const [isPendingTable, setIsPendingTable] = useState(true);

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    try {
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  }, [isPendingTable]);

  const fetchAppointments = async () => {
    const response = await fetch("/api/appointment/view-appointments");
    const data = await response.json();
    // setAppointments(data.appointments);
    console.log(data.appointments);
    const retrievedAppointments = data.appointments;

    // TESTING (must filter to PENDING status only)
    if (isPendingTable) {
      setAppointments(
        retrievedAppointments.filter(
          (appointment) => appointment.status === false
        )
      );
    } else {
      setAppointments(
        retrievedAppointments.filter(
          (appointment) => appointment.status === true
        )
      );
    }
  };

  const formatDate = (date) => {
    const dateObject = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const finalDate = dateObject.toLocaleDateString("en-US", options);

    return finalDate;
  };

  const handleRowClick = (id) => {
    setSelectedID(id);
    setAppointmentModal(true);
  };

  const showDeleteModal = (id) => {
    setSelectedID(id);
    setDeleteModal(true);
  };

  const handleDelete = () => {
    // Find
    const selected = appointments.find(
      (appointment) => appointment.id === selectedID
    );

    // Delete
    const newAppointments = appointments.filter(
      (appointment) => appointment.id !== selectedID
    );
    setAppointments(newAppointments);

    // Reset
    setDeleteModal(false);
    setSelectedID(null);
  };

  // handle reschedule // TO BE ADDED AFTER CALENDAR IMPLEMENTATION
  // const handleReschedule = () => {
  // 	// Find
  // 	const selected = appointments.find(
  // 		(appointment) => appointment.id === selectedID
  // 	);

  // Calculate the index range of appointment to display for the current page
  const indexOfLastInquiry = currentPage * AppointmentPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - AppointmentPerPage;
  const currentAppointments = appointments?.slice(
    indexOfFirstInquiry,
    indexOfLastInquiry
  );

  // THIS DUPLICATE IS FOR MY APPOINTMENTS TABLE
  const indexOfLastInquiry1 = currentPage * AppointmentPerPage;
  const indexOfFirstInquiry1 = indexOfLastInquiry - AppointmentPerPage;
  const currentAppointments1 = appointments?.slice(
    indexOfFirstInquiry1,
    indexOfLastInquiry1
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
            backgroundImage: `url(${hdrAppointment.src})`,
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="flex flex-col text-left px-44 py-10 gap-y-4">
            <h1 className="font-Merriweather text-8xl">Appointments</h1>
            <p className="w-1/2 font-Jaldi text-xl">
              Manage sessions effortlessly and provide tailored guidance and
              support to students through efficient booking and coordination.
              Streamline your scheduling process and ensure students receive
              personalized attention.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col text-center">
        <div className="flex items-center justify-center gap-8 mt-10">
          <button
            className={`${isPendingTable && "text-green-600 "}`}
            onClick={() => setIsPendingTable(true)}
          >
            Pending Appointments
          </button>{" "}
          {"/"}
          <button
            className={`${!isPendingTable && "text-green-600 "}`}
            onClick={() => setIsPendingTable(false)}
          >
            My Appointments
          </button>
        </div>
        {/* table*/}
        {isPendingTable ? (
          <div className="overflow-x-auto px-56 py-10 ">
            <table className="table bg-gray-100">
              {/* head */}
              <thead>
                <tr className="bg-gray-200 font-bold">
                  <th className="text-center p-5">ID</th>
                  <th>Date and Time</th>
                  <th className="p-5">ID Number</th>
                  <th>Student</th>
                  <th className="">Reason</th>
                  <th className="text-center">Status</th>
                  {/* Delete and Edit*/}
                  <th className="no-hover-highlight"></th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments?.map((appointments) => (
                  <tr
                    key={appointments.appointmentId}
                    onClick={() => handleRowClick(appointments.appointmentId)}
                    className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
                  >
                    <td className="text-center">
                      {appointments.appointmentId}
                    </td>
                    <td>
                      <div className="flex flex-row gap-x-3">
                        <div className="text-sm">
                          {formatDate(appointments.date)}{" "}
                          {appointments.timeStart}-{appointments.timeEnd}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-row gap-x-3">
                        <div>{appointments.student.idNumber}</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={appointments.student.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {appointments.student.firstName}{" "}
                            {appointments.student.lastName}
                          </div>
                          <div className="text-sm opacity-50">
                            {appointments.student.institutionalEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p>
                        {appointments.purpose.length > 50
                          ? `${appointments.purpose.substring(0, 40)}...`
                          : appointments.purpose}
                      </p>
                    </td>
                    <td className="text-center">
                      <div className={`w-24 h-5 badge badge-xs badge-warning`}>
                        {appointments.status ? "Done" : "Pending"}
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
                            showDeleteModal(appointments.id);
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

              {appointments &&
                [
                  ...Array(Math.ceil(appointments.length / AppointmentPerPage)),
                ].map((_, index) => (
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
                disabled={AppointmentPerPage > appointments?.length}
                className="join-item btn w-28"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto px-56 py-10 ">
            <table className="table bg-gray-100">
              {/* head */}
              <thead>
                <tr className="bg-gray-200 font-bold">
                  <th className="text-center p-5">ID</th>
                  <th>Date and Time</th>
                  <th className="p-5">ID Number</th>
                  <th>Student</th>
                  <th className="">Reason</th>
                  <th className="text-center">Status</th>
                  {/* Delete and Edit*/}
                  <th className="no-hover-highlight"></th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments1?.map((appointments) => (
                  <tr
                    key={appointments.appointmentId}
                    onClick={() => handleRowClick(appointments.appointmentId)}
                    className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
                  >
                    <td className="text-center">
                      {appointments.appointmentId}
                    </td>
                    <td>
                      <div className="flex flex-row gap-x-3">
                        <div className="text-sm">
                          {formatDate(appointments.date)}{" "}
                          {appointments.timeStart}-{appointments.timeEnd}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-row gap-x-3">
                        <div>{appointments.student.idNumber}</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={appointments.student.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {appointments.student.firstName}{" "}
                            {appointments.student.lastName}
                          </div>
                          <div className="text-sm opacity-50">
                            {appointments.student.institutionalEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p>
                        {appointments.purpose.length > 50
                          ? `${appointments.purpose.substring(0, 40)}...`
                          : appointments.purpose}
                      </p>
                    </td>
                    <td className="text-center">
                      <div className={`w-24 h-5 badge badge-xs badge-success`}>
                        {appointments.status ? "Done" : "Pending"}
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
                            showDeleteModal(appointments.id);
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

              {appointments &&
                [
                  ...Array(Math.ceil(appointments.length / AppointmentPerPage)),
                ].map((_, index) => (
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
                disabled={AppointmentPerPage > appointments?.length}
                className="join-item btn w-28"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* modals */}
      {deleteModal && (
        <ModalDelete
          setDeleteModal={setDeleteModal}
          handleDelete={handleDelete}
        ></ModalDelete>
      )}

      {appointmentModal && (
        <ModalAppointmentInfo
          setAppointmentModal={setAppointmentModal}
          selectedID={selectedID}
          appointments={appointments}
          setAppointments={setAppointments}
          isPendingTable={isPendingTable}

          // TO BE ADDED
          // handleRescedule={handleReschedule}
          // handleUpdateStatus={handleUpdateStatus}
        ></ModalAppointmentInfo>
      )}
    </div>
  );
}
