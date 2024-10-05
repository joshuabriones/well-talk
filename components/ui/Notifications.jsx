"use client";

import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import { error } from "jquery";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Notifications() {
	const userSession = getUserSession();

	const [user, setUser] = useState(null);
	const [notifications, setNotifications] = useState([]);
	const [count, setCount] = useState(0);

	console.log("User Session:", userSession);
	console.log("User:", user);

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
				if (userSession.role === "student") {
					try {
						const response = await fetch(
							`${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_NOTIFICATIONS_FOR_STUDENTS}${userSession.id}`,
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
				} else if (userSession.role === "counselor") {
					try {
						const response = await fetch(
							`${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_NOTIFICATIONS_FOR_COUNSELORS}${userSession.id}`,
							{
								headers: {
									Authorization: `Bearer ${Cookies.get("token")}`,
								},
							}
						);

						if (!response.ok) {
							console.error("Error fetching notifications");
						}

						const data = await response.json();
						const sortedNotifications = data.sort(
							(a, b) => new Date(b.date) - new Date(a.date)
						);

						setNotifications(sortedNotifications);
					} catch (error) {
						console.error("Error fetching notifications:", error);
					}
				} else if (userSession.role === "teacher") {
					try {
						const response = await fetch(
							`${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_NOTIFICATIONS_FOR_TEACHERS}${userSession.id}`,
							{
								headers: {
									Authorization: `Bearer ${Cookies.get("token")}`,
								},
							}
						);

						if (!response.ok) {
							console.error("Error fetching notifications");
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
			}
		};

		fetchNotifications();
		setCount((prevCount) => prevCount + 1);
		console.log("It is fetching notifications.");
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
					if (notification?.sender?.id === notification?.receiver?.id) {
						text = `You have scheduled an appointment for ${date} at ${time}.`;
					} else {
						text = `Counselor ${senderName} has scheduled an appointment with you on ${date} at ${time}.`;
					}

					break;
			}
		}

		if (user?.role === "counselor") {
			switch (type) {
				case "appointment":
					if (notification?.sender?.id === user?.id) {
						text = `You have scheduled an appointment with ${receiverName} on ${date} at ${time}.`;
						break;
					} else if (notification?.receiver?.id === user?.id) {
						text = `${senderName} have scheduled an appointment with you on ${date} at ${time}.`;
						break;
					}
			}
		}

		if (user?.role === "teacher") {
			text = "Teacher notification";
		}

		return text;
	};

	const notifDateFormatter = (dateInput) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		const date = new Date(dateInput);
		return date.toLocaleDateString(undefined, options);
	};

	const notifTimeFormatter = (timeString) => {
		const [time] = timeString.split(":");
		const hour = Number(time);
		const period = hour < 12 ? "AM" : "PM";
		const formattedHour = hour % 12 || 12;
		return `${formattedHour}:00 ${period}`;
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
				{notifications?.map((notification, key) => (
					<div
						className="flex flex-row px-3 py-4 md:px-5 md:py-5 group hover:bg-zinc-100 "
						key={key}
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
						<div className="w-4/6 md:w-9/12 md:pl-4 flex flex-col justify-center text-xs md:text-sm text-gray-700">
							<div>{generateNotification(notification)}</div>
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
