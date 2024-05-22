"use client";
import { useState } from "react";
import AppointmentsTable from "@/components/admin_components/AppointmentsTable";

// Dummy data
const statuses = ["Scheduled", "Completed", "Cancelled"];
const types = ["Initial Consultation", "Follow-Up", "Emergency"];
const purposes = ["Academic", "Personal", "Career"];
const notes = ["Note 1", "Note 2", "Note 3"];

const students = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
}));
const counselors = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `Counselor ${i + 1}`,
}));

const appointmentsCurrent = Array.from({ length: 20 }, (_, i) => {
  const appointmentDate = getRandomDate(
    new Date(2023, 0, 1),
    new Date(2023, 11, 31)
  );
  const startTime = getRandomTime();
  const endTime = getRandomTime();
  return {
    appointmentId: i + 1,
    student: getRandomElement(students),
    counselor: getRandomElement(counselors),
    appointmentDate: appointmentDate.toISOString().split("T")[0],
    appointmentStartTime: formatTime(startTime),
    appointmentEndTime: formatTime(endTime),
    appointmentStatus: getRandomElement(statuses),
    appointmentNotes: getRandomElement(notes),
    appointmentType: getRandomElement(types),
    appointmentPurpose: getRandomElement(purposes),
    appointmentAdditionalNotes: getRandomElement(notes),
    isDeleted: false,
  };
});

const Appointments = () => {
  const [appointments, setAppointments] = useState(appointmentsCurrent);

  console.log(appointments);
  const handleDeleteAppointment = (appointmentId) => {
    setAppointments(
      appointments.filter(
        (appointment) => appointment.appointmentId !== appointmentId
      )
    );
  };

  return (
    <div className="w-full bg-white font-Merriweather">
      <div>
        <h1 className="font-bold text-3xl mb-10">Appointments</h1>
        <AppointmentsTable
          appointments={appointments}
          onDelete={handleDeleteAppointment}
        />
      </div>
    </div>
  );
};

export default Appointments;

// Helper functions to generate dummy data
function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function getRandomTime() {
  const hours = Math.floor(Math.random() * 8) + 8; // Random hour between 8 and 16
  const minutes = Math.floor(Math.random() * 60);
  return { hours, minutes };
}

function formatTime({ hours, minutes }) {
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
