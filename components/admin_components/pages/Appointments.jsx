"use client";
import { useState, useEffect } from "react";
import AppointmentsTable from "@/components/admin_components/AppointmentsTable";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    try {
      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function fetchAppointments() {
    const response = await fetch("/api/appointment/view-appointments");
    const data = await response.json();

    const retrievedAppointments = data.appointments;

    // TESTING (must filter to PENDING status only)

    setAppointments(
      retrievedAppointments.filter(
        (appointment) => appointment.status === "Pending"
      )
    );
  }

  async function handleApproveAppointment(appointmentID, counselorID) {
    const isConfirmed = window.confirm(
      `Are you sure you want to set this appointment?`
    );
    if (isConfirmed) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/appointment/mark-appointment-as-approved",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              appointmentId: appointmentID,
              counselorId: counselorID,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          fetchAppointments();
          setOpenModal(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

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
          handleApproveAppointment={handleApproveAppointment}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </div>
    </div>
  );
};

export default Appointments;
