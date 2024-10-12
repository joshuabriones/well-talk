import { API_ENDPOINT } from "@/lib/api";
import { BarChart } from "@tremor/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

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

export const TotalUsersGraph = ({ userSession }) => {
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

  return (
    <div className="col-span-2 bg-white dark:bg-bgDark2 p-7 rounded-3xl shadow-md">
      <h2 className="text-xl font-medium mb-4 text-textDark dark:text-white">
        Total Users
      </h2>
      <BarChart
        className="h-80 w-full bg-white dark:bg-bgDark2"
        data={chartdata}
        index="name"
        categories={["Number of users "]}
        colors={["red"]}
        valueFormatter={dataFormatter}
        onValueChange={(v) => console.log(v)}
        showAnimation={true}
        layout="horizontal"
      />
    </div>
  );
};
