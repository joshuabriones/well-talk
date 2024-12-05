import { API_ENDPOINT } from "@/lib/api";
import { collegeOptions2, programOptions } from "@/lib/inputOptions";
import { DonutChart } from "@tremor/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const countUsersPerProgram = (userData, selectedCollege) => {
  const counts = {};
  userData.forEach((user) => {
    if (user.college === selectedCollege && user.role === "student") {
      const { program } = user;
      counts[program] = (counts[program] || 0) + 1;
    }
  });
  return counts;
};
const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

export const TotalUsersGraph = ({ userSession }) => {
  const [users, setUsers] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(collegeOptions2[0].value); // Default to the first college

  let userCounts = {};
  if (users.length > 0) {
    userCounts = countUsersPerProgram(users, selectedCollege);
  }

  const chartdata = Object.entries(userCounts).map(([program, count]) => ({
    name: programOptions[selectedCollege].find((p) => p.value === program)?.label || program, // Get program label or default to program key
    value: count,
  }));

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
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
  };

  return (
    <div className="col-span-2 bg-white dark:bg-bgDark2 p-7 rounded-3xl shadow-md">
      <h2 className="text-xl font-medium mb-4 text-textDark dark:text-white">
        Total Students by Program
      </h2>
      <div>
        <label htmlFor="college">Select College/Department:</label>
        <select
          id="college"
          value={selectedCollege}
          onChange={handleCollegeChange}
          className="form-select mt-1 block w-full text-black dark:text-white"
        >
          {collegeOptions2.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <DonutChart
        className="h-80 w-full bg-white dark:bg-bgDark2 mt-4"
        data={chartdata}
        category="value"
        index="name"
        colors={["red", "blue", "green", "orange", "purple",
          "yellow", "pink", "cyan", "lime", "teal",
          "brown", "magenta", "gold", "navy", "olive",
          "indigo", "coral"]}
        valueFormatter={dataFormatter}
        showAnimation={true}
      />
      {/* Legend Section */}
      <div className="flex flex-wrap mt-5 text-navlight dark:text-white">
        {chartdata.map((item, index) => (
          <p key={item.name} className="text-xs mr-4 flex items-center">
            <span
              className={`inline-block h-2 w-2 mr-1`}
              style={{
                backgroundColor: ["red", "blue", "green", "orange", "purple",
                  "yellow", "pink", "cyan", "lime", "teal",
                  "brown", "magenta", "gold", "navy", "olive",
                  "indigo", "coral"][index],
              }}
            ></span>
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};
