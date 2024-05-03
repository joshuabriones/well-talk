import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./../../css/createblog.css";
import { useSession } from "next-auth/react";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login", redirect: true });
  };

  const handleProfile = () => {
    if (session) {
      // Redirect to the user's profile based on their role
      router.push(`/${session.user.role}/profile`);
    }
  };

  const profileMenuItems = [
    {
      label: "My Profile",
      action: handleProfile,
    },
    {
      label: "Edit Profile",
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
        className="flex items-center gap-1 rounded-full py-3 pr-2 mr-20 pl-0.5 lg:ml-auto text-blue-gray-700"
      >
        <img
          src={session?.user.image}
          alt="Profile"
          className="h-10 w-10 rounded-full border border-gray-900"
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
        <div className="absolute right-0 w-48 bg-white border border-gray-300 rounded-lg shadow-lg font-Jaldi ">
          {profileMenuItems.map(({ label, action }, index) => (
            <button
              key={index}
              onClick={action || closeMenu}
              className={`block px-4 py-2 text-sm text-blue-gray-700 hover:bg-blue-gray-100 ${
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
        { label: "Appointment", route: "/student/student-appointment" },
        { label: "Journal", route: "/student/student-journal" },
        { label: "Inquiry", route: "/student/student-inquiry" },
      ];
      break;
    case "teacher":
      navigationItems = [
        { label: "Home", route: "/resident-home" },
        { label: "Referral", route: "/resident-account" },
      ];
      break;
    case "counselor":
      navigationItems = [
        { label: "Home", route: "/counselor/counselor-dashboard" },
        { label: "Blogs", route: "/counselor/counselor-blog" },
        {
          label: "Appointment",
          route: "/counselor/counselor-appointment",
        },
        { label: "Referral", route: "/counselor/counselor-referral" },
        { label: "Events", route: "/counselor/counselor-events" },
        { label: "Inquiry", route: "/counselor/counselor-inquiry" },
      ];
      break;
    default:
      navigationItems = [];
  }

  return (
    <ul className="mt-2 mb-4 flex flex-col gap-12 lg:mb-0 lg:mt-0 lg:flex-row lg:items-right font-Merriweather font-bold text-xl mr-8">
      {navigationItems.map((item, index) => (
        <a
          key={index}
          onClick={() => router.push(item.route)}
          className={`text-base font-medium text-blue-gray-500 hover:text-blue-gray-700 cursor-pointer${
            router.pathname === item.route ? "text-blue-900" : ""
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
      className="mx-auto max-w-screen-auto p-2 lg:pl-6 w-full "
    >
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="ml-24 text-2xl text-[#6B9080] font-bold flex flex-row">
          WellTalk
        </div>
        <div className="hidden lg:block flex items-center gap-8 lg:ml-auto">
          <NavList userType={userType} router={router} />
        </div>
        <button
          onClick={() => setIsNavOpen((prev) => !prev)}
          className="ml-auto mr-2 lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        {userType !== "landing" && <ProfileMenu />}
      </div>
      {isNavOpen && (
        <div className="bg-white lg:hidden">
          <NavList userType={userType} router={router} />
        </div>
      )}
    </nav>
  );
}
