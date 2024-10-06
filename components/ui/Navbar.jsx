import GlobalContext from "@/context/GlobalContext";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession, logout } from "@/lib/helperFunctions";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import "./../../css/navbar.css";
import Notifications from "./Notifications";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track when the component is mounted
  const userSession = getUserSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userSession) {
      // Ensure this only runs on the client
      const fetchUserData = async () => {
        let endpoint;
        switch (userSession.role) {
          case "student":
            endpoint = API_ENDPOINT.GET_STUDENT_BY_ID;
            break;
          case "teacher":
            endpoint = API_ENDPOINT.GET_TEACHER_BY_ID;
            break;
          case "counselor":
            endpoint = API_ENDPOINT.GET_COUNSELOR_BY_ID;
            break;
          default:
            return;
        }

        const response = await fetch(
          `${process.env.BASE_URL}${endpoint}${userSession.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to fetch user data");
          return;
        }

        const data = await response.json();
        setUserData(data);
      };

      fetchUserData();
    }
  }, []);

  const handleSignOut = () => {
    logout();
    router.push("/login"); // Redirect after sign-out
  };

  const handleProfile = () => {
    if (userSession) {
      router.push(`/${userSession.role}/profile`);
    }
  };

  // if (!isMounted) {
  //   return null; // Prevent rendering on the server to avoid hydration errors
  // }

  const profileMenuItems = [
    {
      label: "My Profile",
      action: handleProfile,
    },
    {
      label: "Sign Out",
      action: handleSignOut,
    },
  ];

  return (
    <div>
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full py-3  mr-4  md:mr-20 pl-0.5 lg:ml-auto"
      >
        <img
          src={userData?.image}
          alt="Profile"
          className="h-10 w-10 rounded-full ring ring-maroon ring-offset-base-100 ring-offset-2"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${
            isMenuOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isMenuOpen && (
        <div className="absolute right-12 w-36 bg-white border border-gray-300 rounded-lg shadow-lg font-Jaldi ">
          {profileMenuItems.map(({ label, action }, index) => (
            <button
              key={index}
              onClick={action || (() => setIsMenuOpen(false))}
              className={`block px-4 py-2 text-sm  ${
                index === profileMenuItems.length - 1 ? "rounded-b-lg" : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function NavList({ userType }) {
  const router = useRouter();
  let navigationItems = [];

  switch (userType) {
    case "student":
      navigationItems = [
        { label: "Home", route: "/student" },
        { label: "Appointment", route: "/student/appointment" },
        { label: "Journal", route: "/student/journal" },
      ];
      break;
    case "teacher":
      navigationItems = [
        { label: "Home", route: "/teacher" },
        { label: "Referral", route: "/teacher/referral" },
      ];
      break;
    case "counselor":
      navigationItems = [
        { label: "Home", route: "/counselor" },
        {
          label: "Appointments",
          route: "/counselor/counselor-appointment",
        },
        { label: "Journal", route: "/counselor/clientjournal" },
        { label: "Chat", route: "/counselor/chat" },
      ];
      break;
    default:
      navigationItems = [];
  }

  return (
    <ul className="mt-2 mb-4 flex flex-col gap-6 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center font-Merriweather font-bold text-lg lg:text-xl mr-8">
      {navigationItems.map((item, index) => (
        <li key={index} className="group">
          <a
            onClick={() => router.push(item.route)}
            className={`relative text-base font-medium text-gray hover:text-maroon cursor-pointer transition-colors duration-300 ${
              router.asPath === item.route ? "text-maroon" : ""
            }`}
            style={{ textDecoration: "none" }}
          >
            {item.label}
            <span
              className={`absolute bottom-[-6px] left-0 h-[2px] w-full bg-maroon scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-in-out ${
                router.asPath === item.route ? "scale-x-100" : ""
              }`}
            ></span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Navbar({ userType }) {
  const { showNotifications, setShowNotifications } = useContext(GlobalContext);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarStyles = {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		backgroundColor: isScrolled
			? "rgba(255, 255, 255, 0.95)"
			: "transparent",
		boxShadow: isScrolled ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "none",
		zIndex: 50,
		transition: "background-color 0.3s ease, box-shadow 0.3s ease",
	};

  return (
    <nav
      id="navbar"
      style={navbarStyles}
      className="mx-auto max-w-screen-auto p-2 lg:pl-6 w-full"
    >
      <div className="relative mx-auto flex items-center justify-between text-gray">
        <button
          onClick={() => {
            setIsNavOpen((prev) => !prev);
            toggleVisibility();
          }}
          className="ml-8 lg:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maroon transition duration-300"
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
        <div className="md:ml-24 flex flex-row items-center">
          <img
            src="/images/loggoword.png" // Replace with your actual logo path
            alt="WellTalk Logo"
            className="w-18 h-14 hidden md:block" // Hidden on mobile, shown on md and larger
          />
          <h1 className="hidden md:block text-3xl font-bold font-Merriweather">
            <span
              className="text-maroon"
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

        <div className="hidden lg:block flex items-center gap-8 lg:ml-auto ">
          <NavList userType={userType} router={useRouter()} />
        </div>
        <div
          className="ml-44 md:ml-0 lg:ml-0 md:mr-6 lg:mr-6 hover:animate-bell flex justify-end items-end"
          onClick={() => {
            setShowNotifications(!showNotifications);
          }}
        >
          <motion.img
            src="/images/bellll.png"
            className="w-9 h-9 md:w-9 md:h-9 rounded-2xl cursor-pointer mx-4"
            alt="notiffs"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>

        {userType !== "landing" && <ProfileMenu />}

        {showNotifications && <Notifications />}
      </div>

      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            className={`bg-white bg-opacity-50 lg:hidden backdrop-blur-lg p-4`}
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -20 }}
            transition={{ duration: 0.5 }}
          >
            <NavList userType={userType} />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
