import { getUserSession, logout } from "@/lib/helperFunctions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./../../css/navbar.css";
import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userSession = getUserSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const closeMenu = () => setIsMenuOpen(false);



  useEffect(() => {
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
  }, [userSession]);

  const handleSignOut = () => {
    logout();
  };

  const handleProfile = () => {
    if (userSession) {
      // Redirect to the user's profile based on their role
      router.push(`/${userSession.role}/profile`);
    }
  };

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
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full py-3 pr-2 mr-8  md:mr-20 pl-0.5 lg:ml-auto"
      >
        <img
          src={userData?.image}
          alt="Profile"
          className="h-10 w-10 rounded-full ring ring-[#6B9080] ring-offset-base-100 ring-offset-2"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${isMenuOpen ? "rotate-180" : ""
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
              onClick={action || closeMenu}
              className={`block px-4 py-2 text-sm  ${index === profileMenuItems.length - 1 ? "rounded-b-lg" : ""
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
        { label: "Inquiry", route: "/student/inquiry" },
      ];
      break;
    case "teacher":
      navigationItems = [
        { label: "Home", route: "/teacher" },
        { label: "Referral", route: "/teacher/referral" },
        { label: "Inquiry", route: "/teacher/inquiry" },
      ];
      break;
    case "counselor":
      navigationItems = [
        { label: "Home", route: "/counselor" },
        // { label: "Calendar", route: "/counselor/calendar" },
        // { label: "Blogs", route: "/counselor/counselor-blog" },AA
        {
          label: "Appointments",
          route: "/counselor/counselor-appointment",
        },
        // { label: "Referral", route: "/counselor/counselor-referral" },
        // { label: "Events", route: "/counselor/counselor-events" },
        { label: "Inquiry", route: "/counselor/counselor-inquiry" },
      ];
      break;
    default:
      navigationItems = [];
  }

  return (
    <ul className="mt-2 mb-4 flex flex-col gap-12 lg:mb-0 lg:mt-0 lg:flex-row lg:items-right font-Merriweather font-bold text-xl mx-10">
      {navigationItems.map((item, index) => (
        <a
          key={index}
          onClick={() => router.push(item.route)}
          className={`text-base font-bold text-slate-800 hover:text-slate-800 cursor-pointer${router.pathname === item.route ? "text-slate-800" : ""
            } nav-list-button`}
        >
          {item.label}
        </a>
      ))}
    </ul>
  );
}

export function Navbar({ userType }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

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
    backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.9)" : "transparent",
    zIndex: 50,
    transition: "background-color 0.3s ease",
  };

  return (
    <nav
      id="navbar"
      style={navbarStyles}
      className="mx-auto max-w-screen-auto p-2 lg:pl-6 w-full"
    >
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <button
          onClick={() => setIsNavOpen((prev) => !prev)}
          className={`ml-8 lg:hidden flex justify-start ${isNavOpen ? 'open' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>

        </button>
        <div className="ml-4 md:ml-24 text-2xl text-[#6B9080] font-bold flex flex-row">
          WellTalk
        </div>
        <div className="hidden lg:block flex items-center gap-8 lg:ml-auto">
          <NavList userType={userType} router={router} />
        </div>
        {userType !== "landing" && <ProfileMenu />}
      </div>
      {isNavOpen && (
        <div className="bg-white lg:hidden absolute top-18 left-0 right-0">
          <NavList userType={userType} router={router} />
        </div>
      )}
    </nav>
  );
}