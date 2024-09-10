import { ProgressCircle } from "@tremor/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { API_ENDPOINT } from "@/lib/api";

const colors = [
  "bg-indigo-100 text-indigo-500",
  "bg-violet-100 text-violet-500",
  "bg-fuchsia-100 text-fuchsia-500",
  "bg-pink-100 text-pink-500",
  "bg-rose-100 text-rose-500",
];

const base = ["indigo", "violet", "fuchsia", "pink", "rose"];

const NewAddedUsers = ({ userSession }) => {
  const [newUsers, setNewUsers] = useState([{}]);

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
    const newUsers = data.reverse().slice(0, 5);

    setNewUsers(newUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full flex flex-col shadow-2xl rounded-2xl bg-white mt-7 p-8 lg:col-span-1 xs:col-span-3 overflow-y-scroll">
      <h3 className="text-lg font-bold text-tremor-content-strong relative">
        🤗 New Users
      </h3>
      {newUsers.map((user, index) => (
        <div className="flex flex-col mt-5">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <ProgressCircle value={75} color={`${base[index]}`}>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-md font-bold font-Jaldi ${colors[index]}`}
                >
                  {user?.firstName?.charAt(0)} {user?.lastName?.charAt(0)}
                </span>
              </ProgressCircle>

              <div className={`text-lg font-bold text-${base[index]}-500`}>
                {user.firstName} {user.lastName}
              </div>
            </div>

            <div className={`p-2 ${colors[index]} rounded-md`}>{user.role}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewAddedUsers;
