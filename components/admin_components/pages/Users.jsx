"use client";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "@/lib/api";
import UserTable from "@/components/admin_components/UserTable";
import Cookies from "js-cookie";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {

    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_VERIFIED_USERS}`,
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
      setUsers(
        data.filter(
          (user) => user.role !== "admin" && user.isVerified === false
        )
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.DELETE_USER}${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.ok) {
        alert("User deleted successfully");
        fetchUsers();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAcceptUser = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.VERIFY_USER}${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            isVerified: 1,
          }),
        }
      );

      if (response.ok) {
        alert("User verified successfully");
        fetchUsers();
      }
    } catch (err) {
      console.log(err);
    }
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
