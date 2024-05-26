"use client";

import hdrAppointment from "@/public/images/headers/hdrAppointment.png";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import StudentAddAppointment from "@/components/ui/modals/counselor/appointments/StudentAddAppointment";
import TextInput from "@/components/ui/inputs/TextInput";
import FullButton from "@/components/ui/buttons/FullButton";
// css
import "@/styles/counselor.css";

// modals
import { Navbar } from "@/components/ui/Navbar";
import StudentModalAppointmentInfo from "@/components/ui/modals/counselor/appointments/ModalAppointmentInfo";
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";

export default function Appointment() {
  const AppointmentPerPage = 10;

  const [selectedID, setSelectedID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(null);

  const [isAddAppointment, setIsAddAppointment] = useState(false);
  const [isViewAppointment, setIsViewAppointment] = useState(false);

  const [appointments, setAppointments] = useState([]);

  const { data: session } = useSession();

  const [appointmentDate, setAppointmentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState(""); // State to store the selected time
  const [endTime, setEndTime] = useState(""); // State to store the end time
  const [appointmentType, setAppointmentType] = useState(""); // State to store the selected appointment type
  const [purpose, setPurpose] = useState(""); // State to store the purpose of the appointment
  const [appointmentOnThatDate, setAppointmentOnThatDate] = useState([]);

  const [showAddAppointmentModal, setShowAddAppointmentModal] = useState(false);

  useEffect(() => {
    if (session?.user.id) {
      try {
        fetchAppointments();
      } catch (error) {
        console.log(error);
      }
    }
  }, [session]);

  const fetchAppointments = async () => {
    const response = await fetch(
      `/api/appointment/view-appointment-by-studentid?studentId=` +
        session.user.id
    );
    const data = await response.json();
    setAppointments(data.studentAppointments);
  };

  useEffect(() => {
    fetchAppointmentsOnThatDate();
  }, [appointmentDate]);

  const fetchAppointmentsOnThatDate = async () => {
    const response = await fetch(
      `/api/appointment/get-appointment-by-date?date=${appointmentDate}`
    );
    const data = await response.json();
    setAppointmentOnThatDate(data.studentAppointments);
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

  const handleDelete = async () => {
    // Find
    const selected = appointments.find(
      (appointment) => appointment.appointmentId === selectedID
    );

    console.log("Sfx", selectedID);
    console.log("d", selected);

    try {
      const deleted = await fetch(
        `/api/appointment/cancel-appointment?appointmentId=${selectedID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }

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

  const handleAddAppointmentClick = () => {
    setIsAddAppointment(true);
    setIsViewAppointment(false);
  };

  const handleViewAppointmentClick = () => {
    setIsAddAppointment(false);
    setIsViewAppointment(true);
  };

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "1:00",
    "2:00",
    "3:00",
    "4:00",
  ];

  // Helper function to check if a time slot is taken
  const isTimeSlotTaken = (time) => {
    return appointmentOnThatDate.some(
      (appointment) => appointment.timeStart === time
    );
  };

  const addTime = (startTime, duration) => {
    // Split the start time and duration into hours and minutes
    let [startHours, startMinutes] = startTime.split(":").map(Number);
    let [durationHours, durationMinutes] = duration.split(":").map(Number);

    // Convert start time to 24-hour format if it's PM
    if (startHours < 12 && startTime.includes("PM")) {
      startHours += 12;
    }

    // Add the duration to the start time
    let endHours = startHours + durationHours;
    let endMinutes = startMinutes + durationMinutes;

    // Adjust minutes and hours if minutes exceed 60
    if (endMinutes >= 60) {
      endHours += Math.floor(endMinutes / 60);
      endMinutes %= 60;
    }

    // Convert back to 12-hour format if needed
    let endPeriod = "AM";
    if (endHours >= 12) {
      endPeriod = "PM";
      if (endHours > 12) {
        endHours -= 12;
      }
    }

    // Format the end time back to a string
    endHours = endHours.toString().padStart(2, "0");
    endMinutes = endMinutes.toString().padStart(2, "0");

    return `${endHours}:${endMinutes} ${endPeriod}`;
  };

  const handleTimeSlotClick = (time) => {
    if (!isTimeSlotTaken(time)) {
      setSelectedTime(time); // Update the selected time
      const duration = "1:00"; // Duration to add
      setEndTime(addTime(selectedTime, duration));
    }
  };

  const handleAppointmentSubmit = async () => {
    try {
      const response = await fetch("/api/appointment/create-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: session.user.id,
          date: appointmentDate,
          timeStart: selectedTime,
          timeEnd: endTime,
          appointmentType: appointmentType,
          purpose: purpose,
        }),
      });

      fetchAppointments();
      fetchAppointmentsOnThatDate();
      setIsAddAppointment(false);
      setIsViewAppointment(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* navigation bar */}
      <Navbar userType="student" />

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

      {session ? (
        <div>
          <div className="w-full mt-5 flex items-center gap-5 justify-center">
            <button
              className={`${isAddAppointment && "text-green-600 "}`}
              onClick={handleAddAppointmentClick}
            >
              Add Appointment
            </button>{" "}
            /{" "}
            <button
              className={`${isViewAppointment && "text-green-600 "}`}
              onClick={handleViewAppointmentClick}
            >
              View Appointments
            </button>
          </div>
          {isViewAppointment ? (
            <div className="flex flex-col text-center">
              {/* table*/}
              <div className="overflow-x-auto px-56 py-10 ">
                <table className="table bg-gray-100">
                  {/* head */}
                  <thead>
                    <tr className="bg-gray-200 font-bold">
                      <th className="text-center p-5">ID</th>
                      <th>Date</th>
                      <th className="p-5">Time</th>
                      <th>Appointment Type</th>
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
                        onClick={() =>
                          handleRowClick(appointments.appointmentId)
                        }
                        className="cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out"
                      >
                        <td className="text-center">
                          {appointments.appointmentId}
                        </td>
                        <td>
                          <div className="flex flex-row gap-x-3">
                            <div className="text-sm">
                              {formatDate(appointments.date)}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-row gap-x-3">
                            <div>{appointments.timeStart}</div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            {appointments.appointmentType}
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
                          <div
                            className={`w-24 h-5 badge badge-xs ${
                              appointments && appointments.status === "Pending"
                                ? "badge-warning"
                                : appointments && appointments.status === "Done"
                                ? "badge-success"
                                : appointments &&
                                  appointments.status === "Approved"
                                ? "badge-info"
                                : ""
                            }`}
                          >
                            {appointments.status}
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
                                showDeleteModal(appointments.appointmentId);
                              }}
                            >
                              Delete
                            </button>
                            {/* <button className="btn btn-xs text-green-700">
                              Edit
                            </button> */}
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
                      ...Array(
                        Math.ceil(appointments.length / AppointmentPerPage)
                      ),
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
            </div>
          ) : (
            <div className="flex flex-col w-full p-5 items-center justify-center">
              <div className="w-80">
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="peer border-1 bg-white placeholder-white focus:border-gray-800 focus:outline-none focus:ring-0 rounded-md w-full"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              {appointmentOnThatDate && (
                <div>
                  <h2 className="mt-4 font-bold text-lg">
                    Available Time Slots:
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {timeSlots.map((time, index) => (
                      <button
                        key={index}
                        disabled={isTimeSlotTaken(time)}
                        onClick={() => handleTimeSlotClick(time)} // Set the selected time on click
                        className={`time-slot-button ${
                          isTimeSlotTaken(time)
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                        } text-white font-semibold py-2 px-4 rounded-md`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 p-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold">
                      Selected Appointment:
                    </h3>
                    <p>Date: {appointmentDate}</p>
                    <p>Time: {selectedTime}</p>
                    <div className="w-full flex flex-row gap-x-6 py-4">
                      <TextInput
                        value={appointmentType}
                        onChange={(e) => setAppointmentType(e.target.value)}
                        placeholder="Appointment Type"
                        label="Appointment Type"
                      />
                      <TextInput
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="Purpose"
                        label="Purpose"
                        className="w-full mb-4 rounded-md "
                        id={purpose}
                      />
                    </div>
                    <FullButton onClick={handleAppointmentSubmit}>
                      Submit
                    </FullButton>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {/* modals */}
      {deleteModal && (
        <ModalDelete
          setDeleteModal={setDeleteModal}
          handleDelete={handleDelete}
        ></ModalDelete>
      )}

      {appointmentModal && (
        <StudentModalAppointmentInfo
          setAppointmentModal={setAppointmentModal}
          selectedID={selectedID}
          appointments={appointments}

          // TO BE ADDED
          // handleRescedule={handleReschedule}
          // handleUpdateStatus={handleUpdateStatus}
        ></StudentModalAppointmentInfo>
      )}

      {showAddAppointmentModal && (
        <StudentAddAppointment
          setShowAddAppointmentModal={setShowAddAppointmentModal}
        />
      )}
    </div>
  );
}
