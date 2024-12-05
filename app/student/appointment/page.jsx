"use client";

import Loading from "@/components/Loading";
import { Navbar } from "@/components/ui/Navbar";
import FullButton from "@/components/ui/buttons/FullButton";
import Consent from "@/components/ui/modals/Consent";
import StudentModalAppointmentInfo from "@/components/ui/modals/counselor/appointments/ModalAppointmentInfo";
import StudentAddAppointment from "@/components/ui/modals/counselor/appointments/StudentAddAppointment";
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import ModalConfirmResponseAppointment from "@/components/ui/modals/student/appointments/ModalConfirmedResponseAppointment";
import ModalParentInfo from "@/components/ui/modals/student/appointments/ModalParentInfo";
import ModalReschedule from "@/components/ui/modals/student/appointments/ModalReschedule";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import "@/styles/counselor.css";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { is } from "date-fns/locale";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Calendar, Popover, Whisper } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const Appointment = () => {
  const AppointmentPerPage = 10;

  const [isLoading, setIsLoading] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(null);
  const [isAddAppointment, setIsAddAppointment] = useState(true);
  const [isViewAppointment, setIsViewAppointment] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [confirmResponseModal, setConfirmResponseModal] = useState(false);

  const userSession = getUserSession();
  const [selectedTime, setSelectedTime] = useState(""); // State to store the selected time
  const [endTime, setEndTime] = useState(""); // State to store the end time
  const [appointmentType, setAppointmentType] = useState(""); // State to store the selected appointmenttype
  const [purpose, setPurpose] = useState(""); // State to store the purpose of the appointment
  const [appointmentOnThatDate, setAppointmentOnThatDate] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showAddAppointmentModal, setShowAddAppointmentModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    appointmentType: "",
    purpose: "",
  });
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [showConsent, setShowConsent] = useState(false);

  const [counselorIds, setCounselorIds] = useState([]);
  const [studentData, setStudentData] = useState({});

  const [guardianName, setGuardianName] = useState("");
  const [guardianContact, setGuardianContact] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState("");

  const [isDayAvailable, setIsDayAvailable] = useState(true);

  const params = new URLSearchParams(window.location.search);

  const [assignedCounselors, setAssignedCounselors] = useState([]);

  useEffect(() => {
    if (params.size > 0) {
      const typeRoute = params.get("typeRoute");
      const purposeRoute = params.get("purposeRoute");

      setAppointmentType(typeRoute);
      setPurpose(purposeRoute);
    }
  }, []);

  const handleTermsChange = (e) => {
    setConsentAccepted(e.target.checked);
    if (e.target.checked) {
      setShowConsent(true); // Show Consent when checked
    } else {
      setShowConsent(false); // Hide terms when unchecked
    }
  };

  const handleCloseModal = () => {
    setShowConsent(false);
  };

  useEffect(() => {
    if (userSession) {
      try {
        fetchAppointments();
        fetchStudentById(userSession.id);
        fetchAssignedCounselors();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const fetchStudentById = async (studentId) => {
    const response = await fetch(
      `${process.env.BASE_URL}${API_ENDPOINT.GET_STUDENT_BY_ID}${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Error fetching student");
    }
    const data = await response.json();
    setStudentData(data);
  };

  // const fetchCounselorIds = async () => {
  // 	try {
  // 		const response = await fetch(
  // 			`${process.env.BASE_URL}${API_ENDPOINT.GET_COUNSELOR_BY_STUDENT_ID}${userSession?.id}`,
  // 			{
  // 				headers: {
  // 					Authorization: `Bearer ${Cookies.get("token")}`,
  // 				},
  // 			}
  // 		);

  // 		if (!response.ok) {
  // 			throw new Error("Error fetching counselor IDs");
  // 		}

  // 		const data = await response.json();
  // 		return data.map((counselor) => counselor.id);
  // 	} catch (error) {
  // 		console.error(
  // 			"An error occurred while fetching counselor IDs:",
  // 			error
  // 		);
  // 		return [];
  // 	}
  // };

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

  const fetchAppointmentsOnThatDate = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_APPOINTMENTS_BY_DATE_AND_ASSIGNED_COUNSELORS}?date=${appointmentDate}&studentId=${userSession.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching appointments on that date");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setAppointmentOnThatDate(data);
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching appointments on that date:",
        error
      );
    }
  };

  const fetchAssignedCounselors = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_COUNSELOR_BY_STUDENT_ID}${userSession.id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching counselor IDs");
      }

      setAssignedCounselors(await response.json());
    } catch (error) {
      console.error("An error occurred while fetching counselor IDs:", error);
    }
  };

  useEffect(() => {
    fetchAppointmentsOnThatDate();
  }, [appointmentDate]);

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
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.DELETE_APPOINTMENT}${selectedID}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel appointment");
      }

      toast.success("Appointment cancelled successfully");
      fetchAppointments();
    } catch (err) {
      console.log(err);
      toast.error("Error cancelling appointment");
    } finally {
      setIsLoading(false);
      setDeleteModal(false);
      setSelectedID(null);
    }
  };

  const showRescheduleModal = (id) => {
    setSelectedID(id);
    setRescheduleModal(true);
  };

  const handleReschedule = () => {
    const appointmentId = selectedID;
    if (appointmentId) {
      console.log("Reschedule appointment with ID:", appointmentId);
      setRescheduleModal(true);
    } else {
      console.error("No appointment ID found");
    }
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
    "13:30",
    "14:30",
    "15:30",
  ];

  // Helper function to check if a time slot is taken
  const isTimeSlotTaken = (time) => {
    const counselorsWithAppointments = appointmentOnThatDate.filter(
      (appointment) => appointment.appointmentStartTime === time
    );

    let isTaken = false;

    for (let i = 0; i < counselorsWithAppointments.length; i++) {
      if (counselorsWithAppointments[i].studentId === userSession.id) {
        isTaken = true;
        break;
      }
    }

    return (
      counselorsWithAppointments.length === appointmentOnThatDate.length ||
      isTaken
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

  const convertTo24HourFormat = (time) => {
    let [hours, minutes] = time.split(":").map(Number);

    // If the time is 12:00, always treat it as PM
    if (hours === 12) {
      hours = 12; // Keep it as 12 for PM
    } else if (time.includes("PM") && hours < 12) {
      hours += 12;
    } else if (time.includes("AM") && hours === 12) {
      hours = 0;
    }

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    return formattedTime;
  };

  const isTimeSlotUnavailable = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(appointmentDate);
    const [hours, minutes] = time.split(":").map(Number);

    // Set the full date and time for comparison
    const slotDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hours,
      minutes
    );

    return slotDateTime < currentDate || isTimeSlotTaken(time);
  };

  const handleTimeSlotClick = (time) => {
    // Check if the time slot is either taken or unavailable
    if (!isTimeSlotTaken(time) && !isTimeSlotUnavailable(time)) {
      setSelectedTime(time); // Update the selected time
      setSelectedTimeSlot(time);
      const duration = "1:00"; // Duration to add
      const endTime = addTime(time, duration);
      setEndTime(endTime);
      toast.success(`Time slot selected: ${timeFormatter(time)}`);
    } else {
      // Optionally, you can show a message if the time slot is not selectable
      toast.error(`Time slot ${timeFormatter(time)} is not available.`);
    }
  };

  const handleAppointmentSubmit = async () => {
    setErrorMessages({ appointmentType: "", purpose: "" });

    if (!appointmentType) {
      setErrorMessages((prev) => ({
        ...prev,
        appointmentType: "Please select appointment type!",
      }));
      setIsLoading(false);
      return;
    }

    if (!purpose) {
      setErrorMessages((prev) => ({
        ...prev,
        purpose: "Please state purpose!",
      }));
      setIsLoading(false);
      return;
    }

    // Open the confirm response modal
    // if (
    //   (studentData && studentData.parentGuardianName === null) ||
    //   studentData.parentGuardianContactNumber === null
    // ) {
    //   setIsParentModalOpen(true);
    // } else {
    setConfirmResponseModal(true);
    // }
  };

  const handleParentInfoSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.UPDATE_STUDENT}${userSession.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            institutionalEmail: studentData.institutionalEmail,
            idNumber: studentData.idNumber,
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            gender: studentData.gender,
            contactNumber: studentData.contactNumber,
            password: studentData.password,
            image: studentData.image,
            college: studentData.college,
            program: studentData.program,
            year: studentData.year,
            birthDate: studentData.birthDate,
            permanentAddress: studentData.permanentAddress,
            parentGuardianName: guardianName,
            parentGuardianContactNumber: guardianContact,
          }),
        }
      );

      if (response.ok) {
        fetchStudentById(userSession.id);
        toast.success("Student profile updated successfully");
        setConfirmResponseModal(true);
        setIsParentModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating student profile: ", error);
      toast.error("Failed to update student profile");
    }
  };

  const handleAppointmentSubmitConfirmed = async () => {
    setConfirmResponseModal(false);
    setIsLoading(true);

    // try {
    //   const response = await fetch(
    //     `${process.env.BASE_URL}${
    //       API_ENDPOINT.CHECK_APPOINTMENT_IS_TAKEN
    //     }${appointmentDate}&appointmentStartTime=${convertTo24HourFormat(
    //       appointmentStartTime
    //     )}&counselorId=${counselorId}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${Cookies.get("token")}`,
    //       },
    //     }
    //   );
    //   if (response) {
    //     toast.error("Appointment is already taken");
    //     setIsLoading(false);
    //     return;
    //   }
    // } catch (error) {
    //   console.error("Error checking appointment: ", error);
    //   toast.error("Failed to check appointment");
    // }

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
            appointmentStartTime: convertTo24HourFormat(selectedTime),
            appointmentEndTime: convertTo24HourFormat(endTime),
            appointmentType: appointmentType,
            appointmentPurpose: purpose,
          }),
        }
      );

      if (response.ok) {
        toast.success("Appointment created successfully");
      }

      setPurpose("");
      setAppointmentType("");
      fetchAppointments();
      fetchAppointmentsOnThatDate();
      setIsAddAppointment(false);
      setIsViewAppointment(true);
      setSelectedTime("");
      setSelectedTimeSlot(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create appointment");
    } finally {
      setIsLoading(false);
    }
  };

  function timeFormatter(time) {
    let [hours, minutes] = time.split(":").map(Number);
    let period = "AM";

    if (hours >= 12) {
      period = "PM";
      if (hours > 12) {
        hours -= 12;
      }
    } else if (hours === 0) {
      hours = 12;
    }

    // Handle cases where minutes might be missing
    if (isNaN(minutes)) {
      minutes = 0;
    }

    // Ensure 1:00 to 4:00 are PM
    if (hours >= 1 && hours <= 4) {
      period = "PM";
    }

    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  }

  const formatDateCalendar = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const finalDateFormatter = (date) => {
    const dateObject = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = dateObject.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  const notifDateFormatter = (dateInput) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateInput);
    return date.toLocaleDateString(undefined, options);
  };

  const notifTimeFormatter = (timeString) => {
    const [time] = timeString.split(":");
    const hour = Number(time);
    const period = hour < 12 ? "AM" : "PM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:00 ${period}`;
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredAppointments = currentAppointments?.filter((appointment) => {
    const formattedDate = formatDate(appointment.appointmentDate);

    const matchesStatus =
      selectedStatus === "All" ||
      appointment.appointmentStatus === selectedStatus;

    const matchesSearch =
      formattedDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.appointmentDate
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.appointmentStartTime
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.appointmentType
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.appointmentPurpose
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.appointmentNotes
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const holidays = [
    {
      date: "2024-10-25", // Use the same format as `appointmentDate` for easier comparison
      event: "Independence Day",
    },
    {
      date: "2024-12-25",
      event: "Christmas Day",
    },
    // Add more holiday dates here
  ];

  const isUnavailableDate = (date) => {
    return holidays.some((holiday) => {
      // Split holiday.date to match the parts
      const [year, month, day] = holiday.date.split("-");
      return (
        date.getFullYear() === parseInt(year) &&
        date.getMonth() + 1 === parseInt(month) && // Month needs +1
        date.getDate() === parseInt(day)
      );
    });
  };

  const getHolidayEvent = (date) => {
    return holidays.find((holiday) => {
      // Split holiday.date to match the parts
      const [year, month, day] = holiday.date.split("-");
      return (
        date.getFullYear() === parseInt(year) &&
        date.getMonth() + 1 === parseInt(month) && // Month needs +1
        date.getDate() === parseInt(day)
      );
    })?.event; // Return the event if found, otherwise undefined
  };

  const isDateUnavailableForAllCounselors = (date) => {
    const formattedDate = formatDateCalendar(date);

    let counselorUnavailableCount = 0;

    for (let i = 0; i < assignedCounselors.length; i++) {
      const counselor = assignedCounselors[i];
      const unavailableDates = counselor.unavailableDates
        ? counselor.unavailableDates.split(", ").map((d) => d.trim())
        : [];

      // Count counselors who are unavailable on this date
      if (
        unavailableDates.includes(formattedDate) &&
        counselor.status === "Unavailable"
      ) {
        counselorUnavailableCount++;
      }
    }

    console.log(
      formattedDate,
      counselorUnavailableCount == assignedCounselors.length
    );

    // Return true if ALL counselors are unavailable
    return counselorUnavailableCount === assignedCounselors.length;
  };

  console.log("Assigned counselors:", assignedCounselors);
  return (
    <div className="min-h-screen w-full">
      <Navbar userType="student" />

      {userSession ? (
        <div>
          <div className="w-full pt-24 flex items-center gap-3 justify-center">
            <button
              className={`font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
                isAddAppointment
                  ? "bg-maroon text-white"
                  : "border-2 border-maroon text-maroon"
              }`}
              onClick={handleAddAppointmentClick}
            >
              Set Appointment
            </button>
            <button
              className={`font-medium px-4 py-2 rounded-full transition-colors duration-200 ${
                isViewAppointment
                  ? "bg-maroon text-white"
                  : "border-2 border-maroon text-maroon"
              }`}
              onClick={handleViewAppointmentClick}
            >
              View Appointments
            </button>
          </div>

          {isViewAppointment ? (
            <div className="w-full flex flex-col">
              {/* table*/}

              <div className="overflow-x-auto max-w-full py-10 px-8 md:px-28 lg:px-28 xs:px-1 flex flex-col items-center">
                <div className="flex flex-col md:flex-row lg:flex-row gap-5 py-4 w-full">
                  <div className="flex items-center">
                    <label htmlFor="search-filter" className="mr-2">
                      Search:
                    </label>
                    <input
                      id="search-filter"
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search appointments..."
                      className="border rounded pr-2 max-w-md text-sm"
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="status-filter" className="mr-2">
                      Status:
                    </label>
                    <select
                      id="status-filter"
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      className="border rounded pr-[26px]"
                    >
                      <option value="All">All </option>
                      <option value="Pending">Pending 🟡</option>
                      <option value="Done">Done 🟢</option>
                      <option value="Cancelled">Cancelled 🔴</option>
                    </select>
                  </div>
                </div>
                <table className="table bg-gray-100 rounded-xl">
                  {/* head */}
                  <thead className="bg-silver px-2 border-b-2 border-maroon rounded-t-2xl">
                    <tr className="font-bold text-center py-4 rounded-t-2xl">
                      <th className="py-4">Date</th>
                      <th className="py-4">Time</th>
                      <th className="py-4 hidden  lg:table-cell">
                        Counselor Assigned
                      </th>
                      <th className="py-4 hidden  lg:table-cell">
                        Appointment Type
                      </th>
                      <th className="py-4 hidden  lg:table-cell">Reason</th>
                      <th className="py-4 hidden  lg:table-cell">Feedback</th>
                      <th className="py-4">Status</th>
                      <th className="py-4 hidden  lg:table-cell">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments?.map((appointment) => (
                      <>
                        <tr
                          key={appointment.appointmentId}
                          onClick={() =>
                            handleRowClick(appointment.appointmentId)
                          }
                          className={`border-slate-100 border-b-2
                          hover:bg-slate-100 cursor-pointer 
                          transition duration-300 ease-in-out`}
                        >
                          <td>
                            <div className="text-center py-2">
                              {formatDate(appointment.appointmentDate)}
                            </div>
                          </td>
                          <td className="text-center py-2">
                            {appointment.appointmentStartTime}
                          </td>
                          <td className="text-center py-2 hidden lg:table-cell">
                            {`${appointment.counselor.firstName} ${appointment.counselor.lastName}`}
                          </td>

                          <td className="text-center py-2 hidden  lg:table-cell">
                            {appointment.appointmentType}
                          </td>
                          <td className="text-center py-2 hidden  lg:table-cell">
                            <p className="truncate">
                              {appointment.appointmentPurpose.length > 50
                                ? `${appointment.appointmentPurpose.substring(
                                    0,
                                    40
                                  )}...`
                                : appointment.appointmentPurpose}
                            </p>
                          </td>
                          <td className="text-center hidden  lg:table-cell">
                            <p>
                              {appointment?.appointmentNotes?.length > 50
                                ? `${appointment?.appointmentNotes?.substring(
                                    0,
                                    40
                                  )}...`
                                : appointment?.appointmentNotes ||
                                  "No feedback yet"}
                            </p>
                          </td>
                          <td className="h-full">
                            <div className="flex justify-center items-center">
                              <div
                                className={`w-28 h-6 rounded-lg border border-black flex items-center justify-center`}
                              >
                                {appointment &&
                                  appointment.appointmentStatus === "Pending" &&
                                  "🟡"}
                                {appointment &&
                                  appointment.appointmentStatus === "Done" &&
                                  "🟢"}
                                {appointment &&
                                  appointment.appointmentStatus ===
                                    "On-going" &&
                                  "🔵"}
                                {appointment &&
                                  appointment.appointmentStatus ===
                                    "Cancelled" &&
                                  "🔴"}{" "}
                                {/* Added red dot for Cancelled */}
                                <span className="ml-2 text-bold text-sm">
                                  {appointment
                                    ? appointment.appointmentStatus
                                    : ""}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Delete and Edit */}
                          <td className="hidden  lg:table-cell">
                            <div className="flex justify-center text-center py-2">
                              {appointment.appointmentStatus === "Pending" && (
                                <>
                                  <button
                                    className="btn btn-xs text-maroon hover:text-silver hover:bg-maroon mr-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      showDeleteModal(
                                        appointment.appointmentId
                                      );
                                    }}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className=" btn btn-xs text-gray hover:text-gray hover:bg-gold"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      showRescheduleModal(
                                        appointment.appointmentId
                                      );
                                    }}
                                  >
                                    Reschedule
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                        {rescheduleModal && (
                          <ModalReschedule
                            setRescheduleModal={setRescheduleModal}
                            handleReschedule={handleReschedule}
                            appointmentId={selectedID}
                            sessionId={userSession.id}
                            refreshAppointments={fetchAppointments}
                            assignedCounselors={assignedCounselors}
                          />
                        )}
                      </>
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
            <div className="flex w-full py-10 px-8 md:px-10 xl:px-28 gap-10 justify-center lg:flex-row flex-col">
              <div className="flex-1 flex flex-col gap-2">
                <Calendar
                  bordered
                  renderCell={renderCell}
                  onSelect={(date) => {
                    const today = new Date().toISOString().split("T")[0]; // Today's date in 'YYYY-MM-DD' format
                    const formattedDate = date.toISOString().split("T")[0]; // Selected date in 'YYYY-MM-DD' format

                    // if (isDateUnavailableForAllCounselors(date)) {
                    //   toast.error(
                    //     "Appointments are unavailable on this date due to all counselors being unavailable."
                    //   );
                    //   setIsDayAvailable(false);
                    // }

                    if (isUnavailableDate(date)) {
                      // Get the event for the unavailable date
                      const eventName =
                        getHolidayEvent(date) || "an unavailable holiday"; // Fallback if no event is found

                      toast.error(
                        `Appointments are unavailable on this date due to ${eventName}.`
                      );
                      setIsDayAvailable(false);
                    } else if (formattedDate >= today) {
                      // If it's today or in the future (except unavailable dates), allow the selection
                      setAppointmentDate(formatDateCalendar(date));
                      const displayDate = date.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      });
                      toast.success(`Date selected: ${displayDate}`);
                      setIsDayAvailable(true);
                    }
                  }}
                  disabledDate={(date) => {
                    const today = new Date().setHours(0, 0, 0, 0); // Disable past dates
                    const dayOfWeek = date.getDay(); // Get the day of the week (0 = Sunday, 6 = Saturday)

                    // Disable past dates, weekends
                    return (
                      date < today ||
                      dayOfWeek === 0 || // Sunday
                      dayOfWeek === 6 || // Saturday
                      // || isUnavailableDate(date) // Holiday
                      isDateUnavailableForAllCounselors(date) // All counselors are unavailable
                    );
                  }}
                />
              </div>
              {appointmentOnThatDate && (
                <>
                  {isDayAvailable ? (
                    <div className="flex-1">
                      <h2 className="font-semibold text-lg mb-2">
                        Available Time Slots
                      </h2>
                      <p>
                        🛑 To set an appointment, you must first select a valid
                        date in the calendar, then choose your desired time
                        slot.
                      </p>
                      <p>
                        🛑 Do note that you can only select a time slot that has
                        not been taken yet.
                      </p>
                      <div className="flex flex-wrap gap-2 my-6">
                        {timeSlots.map((time, index) => (
                          <button
                            key={index}
                            // Check if the selected `appointmentDate` is a holiday
                            disabled={
                              isTimeSlotTaken(time) ||
                              isTimeSlotUnavailable(time)
                            }
                            onClick={() => handleTimeSlotClick(time)} // Set the selected time on click
                            className={`time-slot-button ${
                              isTimeSlotTaken(time) ||
                              isTimeSlotUnavailable(time)
                                ? "bg-white border-[1px] border-gray text-primary-green cursor-not-allowed"
                                : time === selectedTimeSlot
                                ? "bg-white border-2 border-maroon text-maroon font-semibold" // Apply a different style to the selected time slot
                                : "bg-maroon text-white hover:bg-maroon duration-300"
                            } py-2 px-3 rounded-md`}
                          >
                            {timeFormatter(time)}
                          </button>
                        ))}
                      </div>
                      <hr />
                      <div className="mt-4">
                        <p>
                          🤗 Please state the type of appointment and your
                          purpose.
                        </p>
                        <div className="w-full flex lg:flex-col gap-5 my-5 flex-col">
                          {/* <TextInput
                          value={appointmentType}
                          onChange={(e) => setAppointmentType(e.target.value)}
                          placeholder="Appointment Type"
                          label="Appointment Type"
                        /> */}
                          <FormControl
                            fullWidth
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "black",
                                },
                                "&:hover fieldset": {
                                  borderColor: "default",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "black",
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "inherit",
                                "&.Mui-focused": {
                                  color: "inherit",
                                },
                                fontSize: "0.75 rem",
                              },
                            }}
                            error={!!errorMessages.appointmentType}
                          >
                            <InputLabel id="appointment-type">
                              Appointment Type
                            </InputLabel>
                            <Select
                              labelId="appointment-type"
                              id="appointment-type-select"
                              value={appointmentType}
                              label="Appointment Type"
                              onChange={(e) =>
                                setAppointmentType(e.target.value)
                              }
                            >
                              <MenuItem value="Academic Counseling">
                                Academic Counseling
                              </MenuItem>
                              <MenuItem value="Career Counseling">
                                Career Counseling
                              </MenuItem>
                              <MenuItem value="Personal Counseling">
                                Personal Counseling
                              </MenuItem>
                              <MenuItem value="Wellness Check">
                                Wellness Check
                              </MenuItem>
                              <MenuItem value="Referral">Referral</MenuItem>
                              <MenuItem value="Others">Others</MenuItem>
                            </Select>
                            {errorMessages.appointmentType && (
                              <FormHelperText>
                                {errorMessages.appointmentType}
                              </FormHelperText>
                            )}
                          </FormControl>
                          <FormControl
                            fullWidth
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "black", // Set border color to match Select
                                },
                                "&:hover fieldset": {
                                  borderColor: "default", // Match hover border color
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "black", // Keep focus border color black
                                },
                                "&.Mui-focused": {
                                  outline: "none", // Remove the blue box outline
                                  borderColor: "none", // Remove
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "inherit", // Match label color
                                "&.Mui-focused": {
                                  color: "inherit", // Keep label color the same when focused
                                },
                                fontSize: "1rem", // Match label font size
                              },
                            }}
                            error={!!errorMessages.purpose}
                          >
                            <TextField
                              value={purpose}
                              onChange={(e) => setPurpose(e.target.value)}
                              label="Purpose"
                              multiline
                              variant="outlined"
                              id="purpose"
                              rows={4}
                            />
                            {errorMessages.purpose && (
                              <FormHelperText>
                                {errorMessages.purpose}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </div>
                        <div className="w-full flex items-center gap-x-2 py-2">
                          <input
                            type="checkbox"
                            checked={consentAccepted}
                            onChange={handleTermsChange}
                            disabled={!purpose}
                            className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                          />
                          <label className="text-md font-Jaldi text-gray-700 italic">
                            I have read, understood, and agree to the{" "}
                            <a
                              href="#"
                              className="hover:underline text-maroon"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowConsent(true); // Show terms when the link is clicked
                              }}
                            >
                              Counseling Consent and Agreement
                            </a>
                            , including the limits to confidentiality and
                            commitment to cooperation.
                          </label>
                          {/* {errors.termsAccepted && (
                          <p className="text-red-500 text-sm font-Jaldi font-semibold">
                            {
                              errors.termsAccepted
                                ._errors[0]
                            }
                          </p>
                        )} */}
                        </div>
                        <hr />
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-5 rounded-xl px-4 py-2 font-Merriweather gap-4 md:gap-6">
                          {/* Date and Time Container */}
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-2 border-black rounded-xl md:rounded-full px-4 py-2 font-Merriweather gap-4 md:gap-6 w-full">
                            <div className="font-bold w-full text-sm md:w-auto md:text-sm lg:text-base">
                              DATE: {finalDateFormatter(appointmentDate)}
                            </div>
                            <div className="font-bold w-full md:w-auto text-sm md:text-sm lg:text-base">
                              TIME: {timeFormatter(selectedTime)}
                            </div>
                          </div>
                          {/* Submit Button */}
                          <div className="w-full md:w-auto md:flex-shrink-0">
                            <FullButton
                              disabled={
                                !selectedTime || isLoading || !consentAccepted
                              }
                              onClick={handleAppointmentSubmit}
                              className="w-full px-4 py-2 text-xs md:text-sm lg:text-base"
                            >
                              {isLoading ? "Submitting..." : "Submit"}
                            </FullButton>
                          </div>
                        </div>

                        {isParentModalOpen && (
                          <ModalParentInfo
                            setIsParentModalOpen={setIsParentModalOpen}
                            guardianName={guardianName}
                            setGuardianName={setGuardianName}
                            guardianContact={guardianContact}
                            setGuardianContact={setGuardianContact}
                            handleParentInfoSubmit={handleParentInfoSubmit}
                          />
                        )}
                        {isLoading && (
                          <div className="flex gap-2 items-center mt-5">
                            <span className="loading loading-dots loading-lg"></span>
                            <span className="text-lg">
                              Processing your appointment, please wait a
                              moment...
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="w-1/2 italic flex justify-center items-center">
                      Appointment service unavailable on this date. Please
                      select another day.
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}

      {deleteModal && (
        <ModalDelete
          setDeleteModal={setDeleteModal}
          prompt="cancel"
          handleDelete={handleDelete}
          description="scheduled appointment"
          isLoading={isLoading}
        ></ModalDelete>
      )}

      {appointmentModal && (
        <StudentModalAppointmentInfo
          setAppointmentModal={setAppointmentModal}
          selectedID={selectedID}
          appointments={appointments}
          handleReschedule={handleReschedule}
          handleDelete={showDeleteModal}
          //handleUpdateStatus={handleUpdateStatus}
        ></StudentModalAppointmentInfo>
      )}

      {showAddAppointmentModal && (
        <StudentAddAppointment
          setShowAddAppointmentModal={setShowAddAppointmentModal}
        />
      )}
      {confirmResponseModal && (
        <ModalConfirmResponseAppointment
          setConfirmResponse={setConfirmResponseModal}
          setAppointmentModal={setAppointmentModal}
          handleResponse={handleAppointmentSubmitConfirmed}
          fetchAppointments={fetchAppointments}
        />
      )}
      {showConsent && <Consent onClose={handleCloseModal} />}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Appointment), { ssr: false });

function getTodoList(date) {
  const day = date.getDate();

  switch (day) {
    case 10:
      return [
        // { title: "Meeting" },
        // { time: "12:00 pm", title: "Lunch" },
        // { time: "10:00 pm", title: "Going home to walk the dog" },
        // { time: "11:00 pm", title: "Going home to walk the dog" },
        // { time: "12:00 pm", title: "Going home to walk the dog" },
        // { time: "12:00 pm", title: "Going home to walk the dog" },
      ];
    case 15:
      return [
        // { time: "09:30 pm", title: "Products Introduction Meeting" },
        // { time: "12:30 pm", title: "Client entertaining" },
        // { time: "02:00 pm", title: "Product design discussion" },
        // { time: "05:00 pm", title: "Product test and acceptance" },
        // { time: "06:30 pm", title: "Reporting" },
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
      <li className="bg-[#89252c]">
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
            <b>{item.time}</b> {item.title}
          </button>
        ))}
        {moreCount ? moreItem : null}
      </ul>
    );
  }

  return null;
}
