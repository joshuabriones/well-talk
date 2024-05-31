import { LineChart } from "@tremor/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { API_ENDPOINT } from "@/lib/api";

export function LineGraph({ userSession }) {
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

  const processData = () => {
    // Initialize data object
    const data = {};

    // Iterate over appointments and aggregate counts
    appointments.forEach((appointment) => {
      const month = appointment.appointmentDate; // Extract month from date
      const status = appointment.appointmentStatus;

      if (!data[month]) {
        // Initialize month if not already present
        data[month] = { Assigned: 0, Done: 0, Pending: 0 };
      }

      // Increment count for corresponding status
      data[month][status]++;
    });

    // Convert data object into array of objects
    return Object.keys(data).map((month) => ({
      date: month, // Assuming month is in the format "MM"
      ...data[month],
    }));
  };

  const chartData = processData();
  console.log(chartData);

  const dataFormatter = (number) => number.toString();

  return (
    <div className="mt-7 rounded-2xl bg-white p-8 drop-shadow-lg w-full">
      <h3 className="text-lg font-bold text-tremor-content-strong">
        Appointments Over Time
      </h3>
      <LineChart
        className="h-96 w-full"
        data={chartData}
        index="date"
        valueFormatter={dataFormatter}
        categories={["Assigned", "Done", "Pending"]}
        colors={["indigo", "red", "yellow", "green"]}
        yAxisWidth={60}
        showAnimation={true}
        curveType="monotone"
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
}
