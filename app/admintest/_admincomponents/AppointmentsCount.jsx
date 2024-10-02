"use client";

import { API_ENDPOINT } from "@/lib/api";
import { BarChart } from "@tremor/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const countAppointmentsPerStatus = (appointmentData) => {
  const counts = {};
  appointmentData.forEach((appointment) => {
    const { appointmentStatus } = appointment;
    counts[appointmentStatus] = (counts[appointmentStatus] || 0) + 1;
  });
  return counts;
};

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

const AppointmentsCount = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const response = await fetch(
      `${process.env.BASE_URL}${API_ENDPOINT.STUDENT_GET_ALL_APPOINTMENTS}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const data = await response.json();
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  let appointmentCounts = {};
  if (appointments.length > 0) {
    appointmentCounts = countAppointmentsPerStatus(appointments);
  }

  const chartdata = Object.entries(appointmentCounts).map(
    ([appointmentStatus, count]) => ({
      name:
        appointmentStatus.charAt(0).toUpperCase() + appointmentStatus.slice(1), // Capitalize role name
      "Number of appointments ": count,
    })
  );

  return (
    <div className="bg-bgDark2 p-5 rounded-3xl shadow-md">
      <h2 className="text-xl font-medium mb-5">Total Appointments</h2>
      <BarChart
        className="h-36"
        data={chartdata}
        index="name"
        categories={["Number of appointments "]}
        colors={["blue"]}
        valueFormatter={dataFormatter}
        onValueChange={(v) => console.log(v)}
        showAnimation={true}
        layout="horizontal"
      />
    </div>
  );
};

export default AppointmentsCount;

// import React from "react";

// const AppointmentsCount = () => {
//   return <div>AppointmentsCount</div>;
// };

// export default AppointmentsCount;
