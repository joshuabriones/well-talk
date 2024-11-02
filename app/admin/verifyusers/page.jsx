"use client";

import Header from "../_admincomponents/Header";

import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AccountTable from "../_admincomponents/AccountTable";

const VerifyUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
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
        toast.success("User deleted successfully");
        fetchUsers();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptUser = async (userId) => {
    try {
      setIsLoading(true);
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
        toast.success("User verified successfully");
        fetchUsers();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex-1 min-h-screen ">
      <Header title="Verify User Accounts" />
      <div className="flex justify-center items-center mt-10 overflow-x-hidden">
        {loading ? (
          <div className="text-navgray flex items-center justify-center gap-3">
            Loading
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <>
            {users.length > 0 ? (
              <AccountTable
                users={users}
                handleDeleteUser={handleDeleteUser}
                handleAcceptUser={handleAcceptUser}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            ) : (
              <div className="text-navgray">No users found</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyUserPage;
