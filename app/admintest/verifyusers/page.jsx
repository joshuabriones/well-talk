"use client";

import Header from "../_admincomponents/Header";

import { useState, useEffect } from "react";
import { API_ENDPOINT } from "@/lib/api";
import AccountTable from "../_admincomponents/AccountTable";
import Cookies from "js-cookie";

const VerifyUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_UNVERIFIED_USERS}`,
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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex-1 min-h-screen">
      <Header title="Verify User Accounts" />
      <div className="flex justify-center items-center mt-10">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <AccountTable
            users={users}
            handleAcceptUser={handleAcceptUser}
            handleDeleteUser={handleDeleteUser}
          />
        )}
      </div>
    </div>
  );
};

export default VerifyUserPage;
