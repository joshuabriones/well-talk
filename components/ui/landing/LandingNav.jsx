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
		<ul className="mt-2 mb-4 flex flex-col gap-12 lg:mb-0 lg:mt-0 lg:flex-row lg:items-right font-Merriweather font-bold text-xl mr-8">
			{navigationItems.map((item, index) => (
				<li key={index}>
					<a
						onClick={() => router.push(item.route)}
						className={`text-base font-medium text-blue-gray-500 hover:text-blue-gray-700 cursor-pointer${
							router.pathname === item.route
								? " text-blue-900"
								: ""
						} nav-list-button`}>
						{item.label}
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
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navbarStyles = {
		position: "fixed",
		top: 0,
		left: 0,
		width: "100%",
		backgroundColor: isScrolled
			? "rgba(255, 255, 255, 0.9)"
			: "transparent",
		zIndex: 50,
		transition: "background-color 0.3s ease",
	};

	return (
		<nav
			id="navbar"
			style={navbarStyles}
			className="mx-auto max-w-screen-auto p-6 lg:pl-6 bg-blue-gray-900 w-full">
			<div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
				<div className="ml-4 md:ml-24 flex flex-row items-center">
					<img
						src="/images/loggoword.png" // Replace with your actual logo path
						alt="WellTalk Logo"
						className="w-18 h-14" // Adjust width and height as needed
					/>
					<h1 className="text-3xl font-bold font-Merriweather">
						<span className="text-maroon" style={{
        textShadow: '-0.25px -0.25px 0 #000, 0.25px -0.25px 0 #000, -0.25px 0.25px 0 #000, 0.25px 0.25px 0 #000',
    }}>Well</span>
						<span className="text-gold" style={{
        textShadow: '-0.25px -0.25px 0 #000, 0.25px -0.25px 0 #000, -0.25px 0.25px 0 #000, 0.25px 0.25px 0 #000',
    }}>Talk</span>
					</h1>
				</div>
				<div className="hidden lg:block flex items-center gap-8 lg:ml-auto">
					<NavList userType={userType} />
				</div>
				<button
					onClick={() => setIsNavOpen((prev) => !prev)}
					className="ml-auto mr-8 lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="size-8">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
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
