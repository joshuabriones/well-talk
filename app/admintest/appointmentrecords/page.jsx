"use client";

import { useState, useEffect } from "react";
import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";

import Header from "../_admincomponents/Header";

const AppointmentRecords = () => {
  const [appointmentsPerCounselor, setAppointmentsPerCounselor] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllCounselors = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_COUNSELORS}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        const data = await response.json();
        setCounselors(data);
      } catch (error) {
        console.error("Error fetching counselors:", error);
      }
    };

    fetchAllCounselors();
  }, []);

  useEffect(() => {
    if (counselors.length > 0) {
      const fetchAppointmentsPerCounselor = async () => {
        try {
          const updatedAppointments = await Promise.all(
            counselors.map(async (counselor) => {
              const response = await fetch(
                `${process.env.BASE_URL}${API_ENDPOINT.GET_APPOINTMENTS_BY_COUNSELORID}${counselor.id}`, // Use counselor's id
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("token")}`,
                  },
                }
              );

              const appointments = await response.json();

              return {
                counselorName: `${counselor.firstName} ${counselor.lastName}`,
                appointmentCount: appointments.length,
                image: counselor.image,
                college: counselor.college,
              };
            })
          );

          setAppointmentsPerCounselor(updatedAppointments);
        } catch (error) {
          console.error("Error fetching appointments per counselor:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchAppointmentsPerCounselor();
    }
  }, [counselors]);

  return (
    <div className="min-h-screen w-full">
      <Header title="Counselor Appointment Records" />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-6 mt-6 overflow-scroll">
          {appointmentsPerCounselor.map((counselor) => (
            <div
              key={counselor.counselorName}
              className="bg-bgDark2 p-5 relative rounded-3xl shadow-md flex flex-col items-center gap-5"
            >
              <img
                src={counselor.image}
                alt={counselor.counselorName}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="text-2xl font-medium text-white text-center">
                  {counselor.counselorName}{" "}
                </h3>
                <p className="text-lg text-navgray mt-2">
                  {counselor.appointmentCount} appointments 🗓
                </p>
              </div>
              <p className="text-xs text-gold absolute top-6 right-6">
                {counselor.college}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentRecords;
