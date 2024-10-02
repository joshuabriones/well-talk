"use client";

import Header from "../_admincomponents/Header";

import { useState, useEffect } from "react";
import { API_ENDPOINT } from "@/lib/api";
import UsersTable from "../_admincomponents/UsersTable";
import Cookies from "js-cookie";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setUsers(data.filter((user) => user.role !== "admin"));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex-1 min-h-screen">
      <Header title="Active Users" />
      <div className="flex justify-center items-center mt-10">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {users.length > 0 ? (
              <UsersTable users={users} handleDeleteUser={handleDeleteUser} />
            ) : (
              <div className="text-navgray">No users found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
