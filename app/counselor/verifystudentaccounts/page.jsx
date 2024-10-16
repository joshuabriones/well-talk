"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import Cookies from "js-cookie";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";

import Header from "../../admin/_admincomponents/Header";
import StudentAccountTable from "./_components/StudentAccountTable";

const VerifyStudentAccounts = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userSession = getUserSession();

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_UNVERIFIED_STUDENTS}${userSession.id}`,
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
    <div className="w-full pt-32 px-4 md:px-24">
      <Navbar userType="counselor" />

      <div
        className="pattern-overlay pattern-left absolute -z-10"
        style={{ transform: "scaleY(-1)", top: "-50px" }}
      >
        <img src="/images/landing/lleft.png" alt="pattern" />
      </div>
      <div
        className="pattern-overlay pattern-right absolute bottom-0 right-0 -z-10"
        style={{ transform: "scaleY(-1)", top: "-15px" }}
      >
        <img
          src="/images/landing/lright.png"
          alt="pattern"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex justify-center items-center mt-4 overflow-x-hidden">
        {loading ? (
          <div className="text-navgray flex items-center justify-center gap-3">
            Loading
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <>
            {users.length > 0 ? (
              <StudentAccountTable
                users={users}
                handleDeleteUser={handleDeleteUser}
                handleAcceptUser={handleAcceptUser}
              />
            ) : (
              <div className="text-lightMaroon">
                No students to verify at the moment 😮‍💨
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyStudentAccounts;
