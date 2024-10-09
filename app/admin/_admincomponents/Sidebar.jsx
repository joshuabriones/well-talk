"use client";

import { useState } from "react";
import Link from "next/link";
import AppointmentIcon from "./icons/AppointmentIcon";
import AccountIcon from "./icons/AccountIcon";
import DashboardIcon from "./icons/DashboardIcon";
import LogoutIcon from "./icons/LogoutIcon";
import UsersIcon from "./icons/UsersIcon";
import { logout } from "@/lib/helperFunctions";

const Sidebar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navLinks = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <DashboardIcon />,
    },
    {
      name: "Accounts",
      href: "/admin/verifyusers",
      icon: <AccountIcon />,
    },
    {
      name: "Appointments",
      href: "/admin/appointmentrecords",
      icon: <AppointmentIcon />,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: <UsersIcon />,
    },
  ];
  return (
    <>
      <div className="w-1/5 min-w-56 bg-bgDark2 h-auto md:flex xs:hidden flex-col justify-between py-10 px-5 rounded-[20px] shadow-sm ">
        <div>
          <div className="flex flex-row gap-1 items-center justify-center">
            <img
              src="/images/loggoword.png" // Replace with your actual logo path
              alt="WellTalk Logo"
              className="w-10 h-10" // Hidden on mobile, shown on md and larger
            />
            <h1 className="text-2xl font-bold font-Merriweather lg:text-3xl">
              <span
                className="text-lightMaroon"
                style={{
                  textShadow:
                    "-0.25px -0.25px 0 #000, 0.25px -0.25px 0 #000, -0.25px 0.25px 0 #000, 0.25px 0.25px 0 #000",
                }}
              >
                Well
              </span>
              <span
                className="text-gold"
                style={{
                  textShadow:
                    "-0.25px -0.25px 0 #000, 0.25px -0.25px 0 #000, -0.25px 0.25px 0 #000, 0.25px 0.25px 0 #000",
                }}
              >
                Talk
              </span>
            </h1>
          </div>
          <nav className="mt-12">
            <ul className="flex flex-col gap-4 text-base text-navgray">
              {navLinks.map((link) => (
                <li>
                  <Link
                    href={link.href}
                    className="p-3 group hover:bg-lightMaroon hover:text-white transition-all duration-300 ease-in-out flex items-center gap-2 rounded-lg"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <button
          onClick={() => logout()}
          className="text-lightMaroon font-bold flex items-center gap-2 p-3 hover:bg-bgDark1 rounded-lg transition-all duration-300"
        >
          <LogoutIcon color="#B24045" />
          Logout
        </button>
      </div>

      <div className="md:hidden absolute">
        <button
          onClick={() => {
            setIsNavOpen((prev) => !prev);
          }}
          className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition duration-300"
          aria-label="Toggle navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`h-8 w-8 text-blue-gray-900 transform transition-transform duration-300 ease-in-out ${
              isNavOpen ? "rotate-90" : "rotate-0"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {isNavOpen && (
          <div className="absolute bg-bgDark2 p-4 top-16 rounded-lg z-10">
            <ul className="flex flex-col gap-2 text-base text-navgray">
              {navLinks.map((link) => (
                <li>
                  <Link
                    href={link.href}
                    className="p-3 group hover:bg-lightMaroon hover:text-white transition-all duration-300 ease-in-out flex items-center gap-2 rounded-lg"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              ))}
              <button
                onClick={() => logout()}
                className="text-lightMaroon font-bold flex items-center gap-2 p-3 hover:bg-bgDark1 rounded-lg transition-all duration-300"
              >
                <LogoutIcon color="#B24045" />
                Logout
              </button>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
