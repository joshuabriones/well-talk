import { BarChart } from "@tremor/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "@/lib/api";

const countUsersPerRole = (userData) => {
  const counts = {};
  userData.forEach((user) => {
    const { role } = user;
    counts[role] = (counts[role] || 0) + 1;
  });
  return counts;
};

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

export const BarGraph = ({ userSession }) => {
  const [users, setUsers] = useState([]);

  let userCounts = {};
  if (users.length > 0) {
    userCounts = countUsersPerRole(users);
  }

  const chartdata = Object.entries(userCounts).map(([role, count]) => ({
    name: role.charAt(0).toUpperCase() + role.slice(1), // Capitalize role name
    "Number of users ": count,
  }));

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
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full rounded-2xl shadow-xl bg-white mt-7 p-8 lg:col-span-2 sm:col-span-3">
      <h3 className="text-lg font-bold text-tremor-content-strong">
        Total Users
      </h3>
      <BarChart
        data={chartdata}
        index="name"
        categories={["Number of users "]}
        colors={["purple-400"]}
        valueFormatter={dataFormatter}
        yAxisWidth={100}
        onValueChange={(v) => console.log(v)}
        showAnimation={true}
        layout="vertical"
      />
    </div>
  );
};
