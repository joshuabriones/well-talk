"use client";

import TextInput from "@/components/ui/inputs/TextInput";
import StudentAddAppointment from "@/components/ui/modals/counselor/appointments/StudentAddAppointment";
import hdrAppointment from "@/public/images/headers/hdrAppointment.png";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// css
import "@/styles/counselor.css";

// modals
import { Navbar } from "@/components/ui/Navbar";
import StudentModalAppointmentInfo from "@/components/ui/modals/counselor/appointments/ModalAppointmentInfo";
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";

import toast from "react-hot-toast";
import { Badge, Calendar, Popover, Whisper } from "rsuite";
import "rsuite/dist/rsuite.min.css";

export default function Appointment() {
  const AppointmentPerPage = 10;

  const [selectedID, setSelectedID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(null);

  const [isAddAppointment, setIsAddAppointment] = useState(true);
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

  console.log(appointmentDate);

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

  const formatDateCalendar = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
              className={`${isAddAppointment && "text-primary-green "
                } font-medium`}
              onClick={handleAddAppointmentClick}
            >
              Set Appointment
            </button>{" "}
            /{" "}
            <button
              className={`${isViewAppointment && "text-primary-green "
                } font-medium`}
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
                            className={`w-24 h-5 badge badge-xs ${appointments && appointments.status === "Pending"
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
                        className={`join-item btn ${currentPage === index + 1 ? "btn-active" : ""
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
            <div className="flex w-full py-10 px-8 gap-10 justify-center">
              <div className="flex-1">
                <p className="px-6">
                  🛑 To set an appointment, you must first select a valid date
                  in the calendar, then choose your desired time slot.
                </p>
                <Calendar
                  bordered
                  renderCell={renderCell}
                  onSelect={(date) => {
                    if (date >= new Date().setHours(0, 0, 0, 0)) {
                      setAppointmentDate(formatDateCalendar(date));
                      toast.success("Date selected");
                    }
                  }}
                  disabledDate={(date) => date < new Date().setHours(0, 0, 0, 0)}
                />
              </div>
              {appointmentOnThatDate && (
                <div className="flex-1">
                  <h2 className="font-semibold text-lg mb-4">
                    Available Time Slots
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((time, index) => (
                      <button
                        key={index}
                        disabled={isTimeSlotTaken(time)}
                        onClick={() => handleTimeSlotClick(time)} // Set the selected time on click
                        className={`time-slot-button ${isTimeSlotTaken(time)
                            ? "bg-white border-[1px] border-[#CCE3DE] text-primary-green cursor-not-allowed"
                            : "bg-primary-green text-white hover:bg-primary-green-dark duration-300"
                          }  py-2 px-4 rounded-md`}
                      >
                        {timeFormatter(time)}
                      </button>
                    ))}
                  </div>
                  <hr />
                  <div className="mt-4">
                    <p>
                      🤗 Please state the type of appointment and your purpose.
                    </p>
                    <div className="w-full flex lg:flex-row gap-5 mt-2 sm:flex-col">
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

                    <div className="flex justify-between items-center border-2 border-black mt-10 rounded-xl px-4 p-2 font-Merriweather">
                      <div className="font-bold">DATE: {appointmentDate}</div>
                      <div className="font-bold">
                        TIME: {timeFormatter(selectedTime)}
                      </div>
                      <button
                        className="py-2 px-3 bg-black text-white rounded-md"
                        disabled={selectedTime ? false : true}
                        onClick={handleAppointmentSubmit}
                      >
                        Submit
                      </button>
                    </div>
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

function getTodoList(date) {
  const day = date.getDate();

  switch (day) {
    case 10:
      return [
        { time: "10:30 am", title: "Meeting" },
        { time: "12:00 pm", title: "Lunch" },
        { time: "10:00 pm", title: "Going home to walk the dog" },
        { time: "11:00 pm", title: "Going home to walk the dog" },
        { time: "12:00 pm", title: "Going home to walk the dog" },
        { time: "12:00 pm", title: "Going home to walk the dog" },
      ];
    case 15:
      return [
        { time: "09:30 pm", title: "Products Introduction Meeting" },
        { time: "12:30 pm", title: "Client entertaining" },
        { time: "02:00 pm", title: "Product design discussion" },
        { time: "05:00 pm", title: "Product test and acceptance" },
        { time: "06:30 pm", title: "Reporting" },
      ];
    default:
      return [];
  }
}

function renderCell(date) {
  const list = getTodoList(date);

  const displayList = list.filter((item, index) => index < 1);

  if (list.length) {
    const moreCount = list.length - displayList.length;
    const moreItem = (
      <li>
        <Whisper
          placement="top"
          trigger="click"
          speaker={
            <Popover>
              {list.map((item, index) => (
                <p key={index}>
                  <b>{item.time}</b> - {item.title}
                </p>
              ))}
            </Popover>
          }
        >
          <a>{moreCount} more</a>
        </Whisper>
      </li>
    );

    return (
      <ul className="calendar-todo-list">
        {displayList.map((item, index) => (
          <button key={index}>
            <Badge /> <b>{item.time}</b> - {item.title}
          </button>
        ))}
        {moreCount ? moreItem : null}
      </ul>
    );
  }

  return null;
}

function timeFormatter(time) {
  let formmatedTime = "";
  switch (time) {
    case "08:00":
    case "09:00":
    case "10:00":
    case "11:00":
      formmatedTime = `${time} AM`;
      break;
    case "12:00":
    case "1:00":
    case "2:00":
    case "3:00":
    case "4:00":
      formmatedTime = `${time} PM`;
      break;
  }

  return formmatedTime;
}
