import { LineChart } from "@tremor/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { API_ENDPOINT } from "@/lib/api";

const StatisticsGraph = () => {
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

  console.log(appointments);

  const processData = () => {
    // Initialize data object
    const data = {};

    // Iterate over appointments and aggregate counts
    appointments.forEach((appointment) => {
      const month = appointment.appointmentDate; // Extract month from date
      const status = appointment.appointmentStatus;

      if (!data[month]) {
        // Initialize month if not already present
        data[month] = { OnGoing: 0, Done: 0, Pending: 0 };
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

  const dataFormatter = (number) => number.toString();
  return (
    <div className="col-span-2 bg-bgDark2 p-7 rounded-3xl shadow-md">
      <h2 className="text-xl font-medium mb-4">Appointments Over Time</h2>
      <LineChart
        className="h-72 w-full bg-bgDark2"
        data={chartData}
        index="date"
        valueFormatter={dataFormatter}
        categories={["OnGoing", "Done", "Pending"]}
        colors={["yellow", "lime", "red"]}
        yAxisWidth={60}
        showAnimation={true}
        curveType="monotone"
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
};

export default StatisticsGraph;
