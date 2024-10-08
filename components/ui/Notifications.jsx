"use client";

import GlobalContext from "@/context/GlobalContext";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import { error } from "jquery";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Notifications() {
	const router = useRouter();
	const userSession = getUserSession();
	const { setShowNotifications } = useContext(GlobalContext);

	const [user, setUser] = useState(null);
	const [notifications, setNotifications] = useState([]);
	// console.log("notifications:", notifications);

	useEffect(() => {
		const fetchProfile = async () => {
			if (userSession && !user) {
				if (userSession.role === "student") {
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
							const errorMessage = await response.text();
							console.error("Error fetching student profile:", errorMessage);
							return;
						}
						const data = await response.json();
						setUser(data);
					} catch (error) {
						console.error("Error fetching student profile:", error);
					}
				} else if (userSession.role === "counselor") {
					try {
						const response = await fetch(
							`${process.env.BASE_URL}${API_ENDPOINT.GET_COUNSELOR_BY_ID}${userSession.id}`,
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
				} else if (userSession.role === "teacher") {
					try {
						const response = await fetch(
							`${process.env.BASE_URL}${API_ENDPOINT.GET_TEACHER_BY_ID}${userSession.id}`,
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
				}
			}
		};

		if (userSession && !user) {
			fetchProfile();
		}
	}, []);

	useEffect(() => {
		const fetchNotifications = async () => {
			if (userSession) {
				try {
					const response = await fetch(
						`${process.env.BASE_URL}${API_ENDPOINT.GET_NOTIFICATIONS_BY_RECEIVER}${userSession.id}`,
						{
							headers: {
								Authorization: `Bearer ${Cookies.get("token")}`,
							},
						}
					);

					if (!response.ok) {
						console.error("Error fetching student notifications", error);
					}

					const data = await response.json();
					const sortedNotifications = data.sort(
						(a, b) => new Date(b.date) - new Date(a.date)
					);

					setNotifications(sortedNotifications);
				} catch (error) {
					console.error("Error fetching notifications:", error);
				}
			}
		};

		fetchNotifications();
	}, []);

	const notifDateFormatter = (dateInput) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		const date = new Date(dateInput);
		return date.toLocaleDateString(undefined, options);
	};

	const notifTimeFormatter = (timeString) => {
		if (!timeString || typeof timeString !== "string") {
			return "";
		}

		const [time] = timeString.split(":");
		const hour = Number(time);

		if (isNaN(hour)) {
			return "";
		}

		const period = hour < 12 ? "AM" : "PM";
		const formattedHour = hour % 12 || 12;
		return `${formattedHour}:00 ${period}`;
	};

	const handleNotifClick = async (notification) => {
		console.log("Notification clicked: ", notification);

		if (!notification?.read) {
			try {
				const response = await fetch(
					`${process.env.BASE_URL}${API_ENDPOINT.MARK_AS_READ}${notification.notificationId}`,
					{
						method: "PUT",
						headers: {
							Authorization: `Bearer ${Cookies.get("token")}`,
							"Content-Type": "application/json",
						},
					}
				);

				if (!response.ok) {
					console.error("Error: ", error);
				}
			} catch (error) {
				console.error("Error marking notiication as read:", error);
			}
		}

		switch (notification?.type) {
			case "appointment":
				if (user?.role === "student") {
					router.push(`/student/appointment`);
				}
				if (user?.role === "counselor") {
					router.push(`/counselor/counselor-appointment`);
				}
				break;
		}

		setShowNotifications(false);
	};

	const renderNotifText = (notification) => {
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

		const readStyle =
			notification?.receiver?.id === user?.id && notification.read
				? "text-zinc-500"
				: "text-zinc-700 font-semibold";

		return (
			<div>
				<div className={readStyle}>{generateNotification(notification)}</div>

				<div className="text-xs text-zinc-400 italic mt-1">
					{dateFormatter(notification?.date)}
				</div>
			</div>
		);
	};

	const generateNotification = (notification) => {
		let text = "";
		const type = notification?.type;
		const senderName = notification?.sender?.firstName + " " + notification?.sender?.lastName;
		const receiverName =
			notification?.receiver?.firstName + " " + notification?.receiver?.lastName;
		const date = notifDateFormatter(notification?.appointment?.appointmentDate);
		const time = notifTimeFormatter(notification?.appointment?.appointmentStartTime);

		if (user?.role === "student") {
			switch (type) {
				case "appointment":
					if (
						notification?.sender?.id === user?.id &&
						notification?.receiver?.id === user?.id
					) {
						text = `You have scheduled an appointment for ${date} at ${time}.`;
					} else if (notification?.receiver?.id === user?.id) {
						text = `Counselor ${senderName} has scheduled an appointment with you on ${date} at ${time}.`;
					}
					break;
				case "referral":
					if (notification?.receiver?.id === user?.id) {
						text = `Prof. ${senderName} has referred you for an appointment for reason: ${notification?.referral?.reason}.`;
					}
					break;
			}
		}

		if (user?.role === "counselor") {
			switch (type) {
				case "appointment":
					if (
						notification?.sender?.id === user?.id &&
						notification?.receiver?.id === user?.id
					) {
						text = `You have scheduled an appointment with ${notification?.appointment?.student?.firstName} ${notification?.appointment?.student?.lastName} on ${date} at ${time}.`;
						break;
					} else if (notification?.receiver?.id === user?.id) {
						text = `${senderName} have scheduled an appointment with you on ${date} at ${time}.`;
						break;
					}
			}
		}

		if (user?.role === "teacher") {
			switch (type) {
				case "referral":
					if (notification?.sender?.id === user?.id) {
						text = `You have referred student ${receiverName} (${notification?.receiver?.id}) for an appointment for reason: ${notification?.referral?.reason}.`;
					}
					break;
			}
		}

		return text;
	};

	return (
		<div className="bg-white absolute z-10 w-full max-w-lg md:max-w-xl h-[50vh] top-16 right-0 md:right-44 md:top-14 rounded-lg drop-shadow-2xl flex flex-col">
			{/* Header */}
			<div className="flex justify-between text-sm border-b border-slate-200 p-3 md:p-5">
				<div className="font-semibold">{user?.firstName}'s Notifications</div>
			</div>

			{/* Notification List */}
			<div className="flex flex-grow flex-col overflow-y-auto">
				{notifications?.map((notification, key) => (
					<div
						className={`${
							notification?.read ? "" : null
						} flex flex-row px-3 py-4 md:px-5 md:py-5 group hover:bg-zinc-100 cursor-pointer transition duration-300 ease-in-out`}
						key={key}
						onClick={() => handleNotifClick(notification)}
					>
						{/* Avatar */}
						<div className="w-1/6 md:w-2/12 flex justify-center items-center">
							<img
								src={notification?.sender?.image}
								alt="Avatar"
								className="rounded-full h-10 w-10 md:h-12 md:w-12"
							/>
						</div>

						{/* Notification Text */}
						<div className="w-4/6 md:w-9/12 md:pl-4 flex flex-col justify-center text-xs md:text-sm">
							{renderNotifText(notification)}
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
