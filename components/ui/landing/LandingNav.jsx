import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function NavList({ userType }) {
	const router = useRouter();
	let navigationItems = [];

	switch (userType) {
		case "landing":
			navigationItems = [
				{ label: "Home", route: "/" },
				{ label: "About Us", route: "/" },
				{ label: "Contact", route: "/" },
			];
			break;
		default:
			navigationItems = [];
	}

	return (
		<ul className="mt-2 mb-4 flex flex-col gap-6 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center font-Merriweather font-bold text-lg lg:text-xl mr-8">
			{navigationItems.map((item, index) => (
				<li
					key={index}
					className="group">
					<a
						onClick={() => router.push(item.route)}
						className={`relative text-base font-medium text-maroon-gray-700 hover:text-maroon cursor-pointer transition-colors duration-300 ${
							router.asPath === item.route ? "text-maroon" : ""
						}`}>
						{item.label}
						<span
							className={`absolute bottom-[-6px] left-0 h-[2px] w-full bg-maroon scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-in-out ${
								router.asPath === item.route
									? "scale-x-100"
									: ""
							}`}></span>
					</a>
				</li>
			))}
		</ul>
	);
}

export function Navbar({ userType }) {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (typeof window !== "undefined") {
			const handleScroll = () => {
				setIsScrolled(window.scrollY > 0);
			};
			window.addEventListener("scroll", handleScroll);
			return () => window.removeEventListener("scroll", handleScroll);
		}
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
			className="mx-auto max-w-screen-auto px-6 py-2 lg:pl-6 w-full">
			<div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
				<div className="ml-4 md:ml-24 flex flex-row items-center">
					<img
						src="/images/loggoword.png"
						alt="WellTalk Logo"
						className="w-16 h-15 lg:w-20 lg:h-18"
					/>
					<h1 className="text-2xl sm:text-3xl font-bold font-Merriweather">
						<span
							className="text-maroon"
							style={{
								textShadow:
									"-0.25px -0.25px 0 #000, 0.25px -0.25px 0 #000, -0.25px 0.25px 0 #000, 0.25px 0.25px 0 #000",
							}}>
							Well
						</span>
						<span
							className="text-gold"
							style={{
								textShadow:
									"-0.25px -0.25px 0 #000, 0.25px -0.25px 0 #000, -0.25px 0.25px 0 #000, 0.25px 0.25px 0 #000",
							}}>
							Talk
						</span>
					</h1>
				</div>
				<div className="hidden lg:block flex items-center gap-8 lg:ml-auto">
					<NavList userType={userType} />
				</div>
				<button
					onClick={() => setIsNavOpen((prev) => !prev)}
					className="ml-auto mr-8 lg:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maroon transition duration-300"
					aria-label="Toggle navigation menu">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className={`h-8 w-8 text-blue-gray-900 transform transition-transform duration-300 ease-in-out ${
							isNavOpen ? "rotate-90" : "rotate-0"
						}`}>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
			</div>
			{isNavOpen && (
				<div className="bg-white lg:hidden transition-all duration-500 ease-in-out p-4">
					<NavList userType={userType} />
				</div>
			)}
		</nav>
	);
}
