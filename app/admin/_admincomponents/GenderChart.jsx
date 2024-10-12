import { DonutChart } from "@tremor/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "@/lib/api";

export const GenderChart = () => {
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
    <div className="bg-white dark:bg-bgDark2 p-5 rounded-3xl shadow-md">
      <h3 className="text-xl font-medium mb-5 text-textDark dark:text-white">
        Student Details
      </h3>
      <DonutChart
        data={programsData}
        variant="donut"
        valueFormatter={dataFormatter}
        onValueChange={(v) => console.log(v)}
        showAnimation={true}
        colors={["blue", "yellow", "red"]}
        className="h-20 w-full"
      />
      <div className="flex items-center justify-between mt-5 text-navlight dark:text-white">
        <p className="text-xs ">
          <span className="inline-block h-2 w-2 mr-1 bg-[#3979EC]"></span>Male
        </p>
        <p className="text-xs ">
          <span className="inline-block h-2 w-2 mr-1 bg-[#E2AA35]"></span>Female
        </p>
        <p className="text-xs ">
          <span className="inline-block h-2 w-2 mr-1 bg-[#DF4A41]"></span>Others
        </p>
      </div>
    </div>
  );
};
