import { DonutChart } from "@tremor/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "@/lib/api";

export const PieGraph = () => {
  const [programsData, setProgramsData] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch(
      `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_VERIFIED_USERS}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const data = await response.json();
    const students = data.filter((user) => user.role === "student");

    // Count the number of students in each program
    const programsCount = students.reduce((acc, student) => {
      if (student.gender) {
        acc[student.gender] = (acc[student.gender] || 0) + 1;
      }
      return acc;
    }, {});

    // Convert programsCount to the format required by DonutChart
    const programsData = Object.entries(programsCount).map(([name, value]) => ({
      name,
      value,
    }));

    setProgramsData(programsData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const dataFormatter = (number) => number.toString();

  return (
    <div className="bg-bgDark2 p-5 rounded-3xl shadow-md">
      <h3 className="text-xl font-medium mb-5">Student Details</h3>
      <DonutChart
        data={programsData}
        variant="donut"
        valueFormatter={dataFormatter}
        onValueChange={(v) => console.log(v)}
        showAnimation={true}
        colors={["blue", "cyan", "indigo", "violet", "fuchsia", "pink-400"]}
        className="h-56 w-full"
      />
      <p>Male</p>
      <p>Female</p>
      <p>Others</p>
    </div>
  );
};
