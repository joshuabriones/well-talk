"use client";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "@/lib/api";
import AppointmentsTable from "@/components/admin_components/AppointmentsTable";
import Cookies from "js-cookie";

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
    const response = await fetch(
      `${process.env.BASE_URL}${API_ENDPOINT.STUDENT_GET_ALL_APPOINTMENTS}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const data = await response.json();

    const retrievedAppointments = data;

    // TESTING (must filter to PENDING status only)

    setAppointments(
      retrievedAppointments.filter(
        (appointment) => appointment.appointmentStatus === "Pending"
      )
    );
  }

  async function handleApproveAppointment(appointmentID, counselorEmail) {
    const isConfirmed = window.confirm(
      `Are you sure you want to set this appointment?`
    );
    if (isConfirmed) {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}${API_ENDPOINT.SET_APPOINTMENT_COUNSELOR}${counselorEmail}&appointmentId=${appointmentID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
            // body: JSON.stringify({
            //   appointmentId: appointmentID,
            //   counselorId: counselorID,
            // }),
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
