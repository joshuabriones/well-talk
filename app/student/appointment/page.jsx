"use client";

import FullButton from "@/components/ui/buttons/FullButton";
import TextAreaInput from "@/components/ui/inputs/TextAreaInput";
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
import Load from "@/components/Load";
import Cookies from "js-cookie";
import { getUserSession } from "@/lib/helperFunctions";
import { API_ENDPOINT } from "@/lib/api";

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

  const userSession = getUserSession();

  const [appointmentDate, setAppointmentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState(""); // State to store the selected time
  const [endTime, setEndTime] = useState(""); // State to store the end time
  const [appointmentType, setAppointmentType] = useState(""); // State to store the selected appointment type
  const [purpose, setPurpose] = useState(""); // State to store the purpose of the appointment
  const [appointmentOnThatDate, setAppointmentOnThatDate] = useState([]);

  const [showAddAppointmentModal, setShowAddAppointmentModal] = useState(false);

  if (Cookies.get("token") === undefined || Cookies.get("token") === null) {
    return <Load route="login" />;
  }

  if (userSession.role !== "student") {
    return <Load role={userSession.role} />;
  }

  useEffect(() => {
    if (userSession) {
      try {
        fetchAppointments();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const fetchAppointments = async () => {
    const response = await fetch(
      `${process.env.BASE_URL}${API_ENDPOINT.GET_APPOINTMENT_BY_STUDENTID}${userSession.id}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Error fetching appointments");
    }
    const data = await response.json();
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointmentsOnThatDate();
  }, [appointmentDate]);

  const fetchAppointmentsOnThatDate = async () => {
    const response = await fetch(
      `${process.env.BASE_URL}${API_ENDPOINT.GET_APPOINTMENT_BY_DATE}${appointmentDate}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const data = await response.json();
    setAppointmentOnThatDate(data);
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

    try {
      const deleted = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.DELETE_APPOINTMENT}${selectedID}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }

      // Refresh appointments list or update state as needed
      fetchAppointments();
    } catch (err) {
      console.log(err);
    }
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
      (appointment) => appointment.appointmentStartTime === time
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
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.STUDENT_CREATE_APPOINTMENT}${userSession.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            appointmentDate: appointmentDate,
            appointmentStartTime: selectedTime,
            appointmentEndTime: endTime,
            appointmentType: appointmentType,
            appointmentPurpose: purpose,
          }),
        }
      );

      if (response.ok) {
        console.log("Appointment created successfully");
      }

      setPurpose("");
      setAppointmentType("");
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

      {userSession ? (
        <div>
          <div className="w-full mt-8 flex items-center gap-3 justify-center">
            <button
              className={`font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
                isAddAppointment
                  ? "bg-primary-green text-white"
                  : "border border-primary-green text-primary-green"
              }`}
              onClick={handleAddAppointmentClick}
            >
              Set Appointment
            </button>
            <button
              className={`font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
                isViewAppointment
                  ? "bg-primary-green text-white"
                  : "border border-primary-green text-primary-green"
              }`}
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
                          {appointments?.appointmentId}
                        </td>
                        <td>
                          <div className="flex flex-row gap-x-3">
                            <div className="text-sm">
                              {formatDate(appointments?.appointmentDate)}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-row gap-x-3">
                            <div>{appointments?.appointmentStartTime}</div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-3">
                            {appointments?.appointmentType}
                          </div>
                        </td>
                        <td>
                          <p>
                            {appointments?.appointmentPurpose.length > 50
                              ? `${appointments.appointmentPurpose.substring(
                                  0,
                                  40
                                )}...`
                              : appointments.appointmentPurpose}
                          </p>
                        </td>
                        <td className="text-center">
                          <div
                            className={`w-24 h-5 badge badge-xs ${
                              appointments &&
                              appointments.appointmentStatus === "Pending"
                                ? "badge-warning"
                                : appointments &&
                                  appointments.appointmentStatus === "Done"
                                ? "badge-success"
                                : appointments &&
                                  appointments.appointmentStatus === "Approved"
                                ? "badge-info"
                                : ""
                            }`}
                          >
                            {appointments?.appointmentStatus}
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
            <div className="flex w-full py-10 px-8 gap-10 justify-center">
              <div className="flex-1">
                <Calendar
                  bordered
                  renderCell={renderCell}
                  onSelect={(date) => {
                    if (date >= new Date().setHours(0, 0, 0, 0)) {
                      setAppointmentDate(formatDateCalendar(date));
                      toast.success("Date selected");
                    }
                  }}
                  disabledDate={(date) =>
                    date < new Date().setHours(0, 0, 0, 0)
                  }
                />
              </div>
              {appointmentOnThatDate && (
                <div className="flex-1">
                  <h2 className="font-semibold text-lg mb-2">
                    Available Time Slots
                  </h2>
                  <p>
                    🛑 To set an appointment, you must first select a valid date
                    in the calendar, then choose your desired time slot.
                  </p>
                  <p>
                    🛑 Do note that you can only select a time slot that has not
                    been taken yet.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-8">
                    {timeSlots.map((time, index) => (
                      <button
                        key={index}
                        disabled={isTimeSlotTaken(time)}
                        onClick={() => handleTimeSlotClick(time)} // Set the selected time on click
                        className={`time-slot-button ${
                          isTimeSlotTaken(time)
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
                    <div className="w-full flex lg:flex-col gap-5 mt-4 sm:flex-col">
                      <TextInput
                        value={appointmentType}
                        onChange={(e) => setAppointmentType(e.target.value)}
                        placeholder="Appointment Type"
                        label="Appointment Type"
                      />
                      <TextAreaInput
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
                      <div className="w-2/12">
                        <FullButton
                          disabled={selectedTime ? false : true}
                          onClick={handleAppointmentSubmit}
                        >
                          Submit
                        </FullButton>
                      </div>
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
