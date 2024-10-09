import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { API_ENDPOINT } from "@/lib/api";

const NewUsersTab = () => {
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
    <div className="bg-bgDark2 p-5 rounded-3xl shadow-md  ">
      <h2 className="text-xl font-medium mb-5">New Users</h2>
      <div className="flex flex-col gap-8">
        {newUsers.map((user) => (
          <div key={user.id} className="flex gap-4">
            <div>
              <img src={user.image} className="w-12 h-12 rounded-full" />
            </div>
            <div>
              <h3 className="font-medium text-base">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-navgray">{user.institutionalEmail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewUsersTab;
