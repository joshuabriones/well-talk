import { DonutChart } from "@tremor/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "@/lib/api";

export const PieGraph = ({ userSession }) => {
  const [programsData, setProgramsData] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch(
      `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_USERS}`,
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
      if (student.program) {
        acc[student.program] = (acc[student.program] || 0) + 1;
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
    <div className="w-full flex flex-col items-center justify-between shadow-xl rounded-2xl bg-white mt-7 p-8 lg:col-span-1 sm:col-span-3">
      <h3 className="text-lg font-bold text-tremor-content-strong">
        Student Programs
      </h3>
      <DonutChart
        data={programsData}
        variant="donut"
        valueFormatter={dataFormatter}
        onValueChange={(v) => console.log(v)}
        showAnimation={true}
        colors={["blue", "cyan", "indigo", "violet", "fuchsia", "pink-400"]}
        className="h-72 w-full"
      />
    </div>
  );
};
