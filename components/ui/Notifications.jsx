import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Notifications() {
	const userSession = getUserSession();

	const [user, setUser] = useState(null);
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		const fetchStudentProfile = async () => {
			try {
				const response = await fetch(
					`${process.env.BASE_URL}${API_ENDPOINT.GET_STUDENT_BY_ID}${userSession.id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${Cookies.get("token")}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch posts");
				}
				const data = await response.json();

				setUser(data);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		fetchStudentProfile();
	});

	const fetchNotifications = async () => {
		const response = await fetch(
			`${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_NOTIFICATIONS}`,
			{
				headers: {
					Authorization: `Bearer ${Cookies.get("token")}`,
				},
			}
		);

		if (!response.ok) {
			console.error("Error fetching notifications");
			return;
		}

		const data = await response.json();

		const sortedNotifications = data.sort((a, b) => new Date(b.date) - new Date(a.date));
		setNotifications(sortedNotifications);
	};

	useEffect(() => {
		if (userSession) {
			try {
				fetchNotifications();
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	const dateFormatter = (dateString) => {
		const givenDate = new Date(dateString);
		const now = new Date();

		const diffInMs = now - givenDate;

		const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
		const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
		const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

		if (diffInMinutes < 60) {
			return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
		} else if (diffInHours < 24) {
			return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
		} else {
			return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
		}
	};

	return (
		<div className="bg-white absolute z-10 w-full max-w-lg md:max-w-xl h-[50vh] top-16 right-0 md:right-44 md:top-14 rounded-lg drop-shadow-2xl flex flex-col">
			{/* Header */}
			<div className="flex justify-between text-sm border-b border-slate-200 p-3 md:p-5">
				<div className="font-semibold">{user?.firstName}'s Notifications</div>
				<div className="text-blue-600 cursor-pointer text-xs md:text-sm">
					Mark All as Read
				</div>
			</div>

			{/* Notification List */}
			<div className="flex flex-grow flex-col overflow-y-auto">
				{notifications.map((notification, key) => (
					<div className="flex flex-row px-3 py-4 md:px-5 md:py-5 group hover:bg-zinc-100 ">
						{/* Avatar */}
						<div className="w-1/6 md:w-2/12 flex justify-center items-center">
							<img
								src={user?.image}
								alt="Avatar"
								className="rounded-full h-10 w-10 md:h-12 md:w-12"
							/>
						</div>

						{/* Notification Text */}
						<div className="w-4/6 md:w-9/12 md:pl-4 flex flex-col justify-center text-xs md:text-sm text-gray-700">
							<div>{notification?.message}</div>
							<div className="text-xs text-zinc-400 italic mt-1">
								{dateFormatter(notification?.date)}
							</div>
						</div>

						{/* Action Icon */}
						<div className="w-1/6 md:w-1/12 flex items-center justify-end invisible group-hover:visible">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="black"
								className="w-5 h-5 md:w-6 md:h-6 rounded-full p-1 hover:bg-zinc-200"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
								/>
							</svg>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
