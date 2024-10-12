"use client";

import { useState, useEffect } from "react";
import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";
import { collegeOptions } from "@/lib/inputOptions";

import Header from "../_admincomponents/Header";

const AppointmentRecords = () => {
  const [appointmentsPerCounselor, setAppointmentsPerCounselor] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState("all");

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
              try {
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

                if (!response.ok) {
                  if (response.status === 404) {
                    // If no appointments found (404 error), return 0 appointments for that counselor
                    return {
                      counselorName: `${counselor.firstName} ${counselor.lastName}`,
                      appointmentCount: 0,
                      image: counselor.image,
                      college: counselor.college,
                    };
                  } else {
                    throw new Error("Error fetching appointments");
                  }
                }

                const appointments = await response.json();

                return {
                  counselorName: `${counselor.firstName} ${counselor.lastName}`,
                  appointmentCount: appointments.length,
                  image: counselor.image,
                  college: counselor.college,
                };
              } catch (error) {
                console.error(
                  `Error fetching appointments for counselor ${counselor.id}:`,
                  error
                );
                // In case of error, return counselor info with 0 appointments
                return {
                  counselorName: `${counselor.firstName} ${counselor.lastName}`,
                  appointmentCount: 0,
                  image: counselor.image,
                  college: counselor.college,
                };
              }
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

  const filteredCounselors = appointmentsPerCounselor.filter(
    (counselor) =>
      selectedCollege === "all" || counselor.college === selectedCollege
  );

  return (
    <div className="min-h-screen w-full">
      <Header title="Counselor Appointment Records" />
      <select
        value={selectedCollege}
        onChange={(e) => {
          setSelectedCollege(e.target.value);
        }}
        className="w-1/7 rounded-3xl text-navgray bg-bgDark2 mt-2"
      >
        <option value="all">All</option>
        {collegeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-6 mt-6 overflow-scroll">
          {filteredCounselors.map((counselor) => (
            <div
              key={counselor.counselorName}
              className="w-full min-w-[240px] bg-bgDark2 p-5 relative rounded-3xl shadow-md flex flex-col items-center gap-5"
            >
              <img
                src={counselor.image}
                alt={counselor.counselorName}
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h3 className="sm:text-2xl font-medium text-white text-center text-xl">
                  {counselor.counselorName}{" "}
                </h3>
                <p className="sm:text-lg text-navgray mt-2 text-base">
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
