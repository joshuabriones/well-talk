import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./../../css/createblog.css";

function NavList({ userType }) {
	const router = useRouter();
	let navigationItems = [];

	switch (userType) {
		case "landing":
			navigationItems = [
				{ label: "Home", route: "/student/student-home" },
				{ label: "About Us", route: "/student//student-appointment" },
				{ label: "Contact", route: "/student//student-journal" },
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
					} nav-list-button`}>
					{item.label}
				</a>
			))}
		</ul>
	);
}

export function Navbar({ userType }) {
	const [isNavOpen, setIsNavOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const navbar = document.getElementById("navbar");
			if (navbar) {
				if (window.scrollY > navbar.offsetTop) {
					navbar.classList.add("fixed", "top-0", "z-50", "bg-white");
				} else {
					navbar.classList.remove(
						"fixed",
						"top-0",
						"z-50",
						"bg-white"
					);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			id="navbar"
			className="mx-auto max-w-screen-auto p-6 lg:pl-6 bg-blue-gray-900 w-full border-b border-gray-200">
			<div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
				<div className="ml-24 text-2xl text-[#6B9080] font-bold">
					WellTalk
				</div>
				<div className="hidden lg:block flex items-center gap-8 lg:ml-auto">
					<NavList userType={userType} />
				</div>
				<button
					onClick={() => setIsNavOpen((prev) => !prev)}
					className="ml-auto mr-2 lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 text-blue-gray-700"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16m-7 6h7"
						/>
					</svg>
				</button>
			</div>
			{isNavOpen && (
				<div className="bg-white lg:hidden">
					<NavList userType={userType} />
				</div>
			)}
		</nav>
	);
}
