"use client";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "@/lib/api";
import UserTable from "@/components/admin_components/UserTable";
import Cookies from "js-cookie";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_USERS}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data.filter((user) => user.role !== "admin"));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleAcceptUser = (userId) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, status: "active" };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <div className="w-full bg-white font-Merriweather">
      <div>
        <h1 className="font-bold text-3xl mb-10">Users</h1>
        <UserTable
          users={users}
          onDelete={handleDeleteUser}
          onAccept={handleAcceptUser}
        />
      </div>
    </div>
  );
};

export default Users;
