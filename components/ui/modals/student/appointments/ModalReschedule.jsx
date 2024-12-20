"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Calendar } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";

const ModalReschedule = ({
  setRescheduleModal,
  appointmentId,
  sessionId,
  refreshAppointments,
  assignedCounselors,
}) => {
  const [appointmentDate, setAppointmentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentOnThatDate, setAppointmentOnThatDate] = useState([]);
  const [endTime, setEndTime] = useState("");

  const [appointments, setAppointments] = useState([]);
  const [counselorIds, setCounselorIds] = useState([]);

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "13:30",
    "14:30",
    "15:30",
  ];

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

  const isTimeSlotTaken = (time) => {
    return appointmentOnThatDate.some(
      (appointment) => appointment.appointmentStartTime === time
    );
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

  const addTime = (startTime, duration) => {
    let [startHours, startMinutes] = startTime.split(":").map(Number);
    let [durationHours, durationMinutes] = duration.split(":").map(Number);

    if (startHours < 12 && startTime.includes("PM")) {
      startHours += 12;
    }

    let endHours = startHours + durationHours;
    let endMinutes = startMinutes + durationMinutes;

    if (endMinutes >= 60) {
      endHours += Math.floor(endMinutes / 60);
      endMinutes %= 60;
    }

    let endPeriod = "AM";
    if (endHours >= 12) {
      endPeriod = "PM";
      if (endHours > 12) {
        endHours -= 12;
      }
    }

    endHours = endHours.toString().padStart(2, "0");
    endMinutes = endMinutes.toString().padStart(2, "0");

    return `${endHours}:${endMinutes} ${endPeriod}`;
  };

  const convertTo24HourFormat = (time) => {
    let [hours, minutes] = time.split(":").map(Number);

    if (hours === 12) {
      hours = 12;
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

  const handleTimeSlotClick = (time) => {
    if (!isTimeSlotTaken(time)) {
      setSelectedTime(time);
      setSelectedTimeSlot(time);
      const duration = "1:00";
      const endTime = addTime(time, duration);
      setEndTime(endTime);
      toast.success(`Time slot selected: ${timeFormatter(time)}`);
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

    if (isNaN(minutes)) {
      minutes = 0;
    }
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

  const fetchAppointments = async () => {
    const response = await fetch(
      `${process.env.BASE_URL}${API_ENDPOINT.GET_APPOINTMENT_BY_STUDENTID}${sessionId}`,
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

    // Extract counselor IDs from the appointments
    const counselorIds = data.map((appointment) => appointment.counselor.id);
    setCounselorIds(counselorIds);
  };

  const handleReschedule = async (e) => {
    e.preventDefault();

    const formattedTime = convertTo24HourFormat(selectedTime);
    try {
      if (!appointmentDate || !selectedTimeSlot) {
        toast.error("Please select both a date and a time.");
        return;
      }

      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.RESCHED_APPOINTMENT}${appointmentId}?date=${appointmentDate}&startTime=${formattedTime}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.ok) {
        setRescheduleModal(false);
        toast.success("Appointment rescheduled successfully!");
      } else {
        throw new Error("Failed to reschedule");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      refreshAppointments();
    }
  };

  const fetchAppointmentsOnThatDate = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_APPOINTMENTS_BY_DATE_AND_ASSIGNED_COUNSELORS}?date=${appointmentDate}&studentId=${sessionId}`,
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

  useEffect(() => {
    if (sessionId) {
      try {
        fetchAppointments();
      } catch (error) {
        toast.error("Failed to fetch appointments");
      }
    }
  }, []);

  useEffect(() => {
    fetchAppointmentsOnThatDate();
  }, [appointmentDate, counselorIds]);

  return (
    <div
      className="fixed inset-0 flex items-center px-4 justify-center bg-white bg-opacity-25 z-50 backdrop-blur"
      role="dialog"
    >
      {/* Modal Content */}
      <div className="relative w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg border-2 border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-maroon p-3 border-b-2">
          <div className="flex items-center space-x-2 ml-4">
            <div className="w-4 h-4 border-2 bg-yellow-400 rounded-full cursor-pointer"></div>
            <div className="w-4 h-4 border-2 bg-green-400 rounded-full cursor-pointer"></div>
            <div className="w-4 h-4 border-2 bg-red-400 rounded-full cursor-pointer"></div>
          </div>
          <button
            onClick={() => setRescheduleModal(false)}
            className="text-white font-bold"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-auto max-h-[80vh] md:max-h-[90vh] lg:max-h-[90vh]">
          <h2 className="text-lg font-semibold mb-2">Reschedule Appointment</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm">Select a New Date</label>
              <Calendar
                bordered
                renderCell={renderCell}
                onSelect={(date) => {
                  if (date >= new Date().setHours(0, 0, 0, 0)) {
                    setAppointmentDate(formatDateCalendar(date));
                    const formattedDate = date.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    });
                    toast.success(`Date selected: ${formattedDate}`);
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
                    isDateUnavailableForAllCounselors(date)
                  );
                }}
              />
            </div>

            <div className="flex flex-col w-full md:w-1/3 h-full">
              <label className="block mb-1 text-sm">Select a New Time</label>
              <div className="flex-1">
                <h2 className="font-semibold text-lg mb-2">
                  Available Time Slots
                </h2>
                <p className="text-sm mb-1">
                  🛑 To set an appointment, you must first select a valid date
                  in the calendar, then choose your desired time slot.
                </p>
                <p className="text-sm mb-4">
                  🛑 Do note that you can only select a time slot that has not
                  been taken yet.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {timeSlots.map((time, index) => (
                    <button
                      key={index}
                      disabled={
                        isTimeSlotTaken(time) || isTimeSlotUnavailable(time)
                      }
                      onClick={() => handleTimeSlotClick(time)}
                      className={`time-slot-button w-full md:w-1/2 lg:w-full ${
                        isTimeSlotTaken(time) || isTimeSlotUnavailable(time)
                          ? "bg-white border-[1px] border-[#CCE3DE] text-primary-green cursor-not-allowed"
                          : time === selectedTimeSlot
                          ? "bg-white border-2 border-maroon text-maroon font-semibold"
                          : "bg-maroon text-white hover:bg-maroon duration-300"
                      } py-2 px-3 rounded-md`}
                    >
                      {timeFormatter(time)}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="my-4" />

              <div className="flex flex-col gap-y-4 mt-2">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-2 border-black rounded-xl md:rounded-full px-4 py-3 font-Merriweather gap-4 w-full">
                  <div className="font-bold w-full md:w-auto">
                    DATE: {finalDateFormatter(appointmentDate)}
                  </div>
                  <div className="font-bold w-full md:w-auto">
                    TIME: {timeFormatter(selectedTime)}
                  </div>
                </div>
                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => setRescheduleModal(false)}
                    className="mt-2 w-full bg-white border-2 border-maroon font-Merriweather text-sm text-maroon font-semibold rounded-3xl px-4 py-3 hover:scale-95 transition-transform duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReschedule}
                    className="mt-2 w-full bg-maroon border-2 font-Merriweather text-sm text-white font-semibold rounded-3xl px-4 py-3 hover:scale-95 transition-transform duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalReschedule;

function getTodoList(date) {
  const day = date.getDate();

  switch (day) {
    case 10:
      return [
        // { time: "10:30 am", title: "Meeting" },
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
