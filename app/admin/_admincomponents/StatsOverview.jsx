"use client";

import { useState, useEffect } from "react";
import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";

const StatsOverview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState([
    {
      title: "Students",
      value: 0,
      icon: "/images/icons/studenticon.svg",
      color: "bg-[#BFE54E]",
    },
    {
      title: "Counselors",
      value: 0,
      icon: "/images/icons/counslricon.svg",
      color: "bg-blue-500",
    },
    {
      title: "Appointments",
      value: 0,
      icon: "/images/icons/activeappt.svg",
      color: "bg-[#F4C522]",
    },
    {
      title: "New Users",
      value: 0,
      icon: "/images/icons/newuser.svg",
      color: "bg-[#F54F5F]",
    },
  ]);

  const loadingData = [
    {
      title: "Students",
      value: 0,
      icon: "/images/icons/studenticon.svg",
      color: "bg-[#BFE54E]",
    },
    {
      title: "Counselors",
      value: 0,
      icon: "/images/icons/counslricon.svg",
      color: "bg-blue-500",
    },
    {
      title: "Appointments",
      value: 0,
      icon: "/images/icons/activeappt.svg",
      color: "bg-[#F4C522]",
    },
    {
      title: "New Users",
      value: 0,
      icon: "/images/icons/newuser.svg",
      color: "bg-[#F54F5F]",
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
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

        setStats((prevStats) =>
          prevStats.map((stat) => {
            if (stat.title === "Students") {
              return {
                ...stat,
                value: data.filter((user) => user.role === "student").length,
              };
            }
            if (stat.title === "Counselors") {
              return {
                ...stat,
                value: data.filter((user) => user.role === "counselor").length,
              };
            }
            return stat; // Always return stat
          })
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}${API_ENDPOINT.STUDENT_GET_ALL_APPOINTMENTS}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        const appointmentData = await response.json();

        setStats((prevStats) =>
          prevStats.map((stat) => {
            if (stat.title === "Appointments") {
              return {
                ...stat,
                value: appointmentData.length,
              };
            }
            return stat; // Always return stat
          })
        );
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    const fetchNewUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_UNVERIFIED_USERS}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        const data = await response.json();

        setStats((prevStats) =>
          prevStats.map((stat) => {
            if (stat.title === "New Users") {
              return {
                ...stat,
                value: data.length,
              };
            }
            return stat; // Always return stat
          })
        );
      } catch (error) {
        console.error("Error fetching new users:", error);
      }
    };

    const fetchAllData = async () => {
      setIsLoading(true);
      await Promise.all([fetchUsers(), fetchAppointments(), fetchNewUsers()]);
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {isLoading ? (
        <>
          {loadingData.map((stat) => (
            <div
              key={stat?.title}
              className="bg-white dark:bg-bgDark2 p-5 rounded-3xl shadow-md flex gap-5"
            >
              <div
                className={`${stat?.color} p-3 rounded-3xl flex items-center justify-center`}
              >
                <img
                  src={stat?.icon || null}
                  alt={stat?.title}
                  className={`w-12 h-12`}
                />
              </div>
              <div className="">
                <h3 className="text-base font-medium text-slate-700 dark:text-navgray">
                  {stat?.title || " "}
                </h3>
                <p className="text-3xl text-navlight dark:text-navgray mt-2">
                  {stat?.value || 0}{" "}
                  {stat?.value > 0 && (
                    <span>
                      <img
                        src={"/images/icons/increase.svg"}
                        alt="increase"
                        className="inline w-5 h-5"
                      />
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {stats.map((stat) => (
            <div
              key={stat?.title}
              className="bg-white dark:bg-bgDark2 p-5 rounded-3xl shadow-md flex gap-5"
            >
              <div
                className={`${stat?.color} p-3 rounded-3xl flex items-center justify-center`}
              >
                <img
                  src={stat?.icon || null}
                  alt={stat?.title}
                  className={`w-12 h-12`}
                />
              </div>
              <div className="">
                <h3 className="text-base font-medium text-slate-700 dark:text-navgray">
                  {stat?.title || " "}
                </h3>
                <p className="text-3xl text-navlight dark:text-navgray mt-2">
                  {stat?.value || 0}{" "}
                  {stat?.value > 0 && (
                    <span>
                      <img
                        src={"/images/icons/increase.svg"}
                        alt="increase"
                        className="inline w-5 h-5"
                      />
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default StatsOverview;
