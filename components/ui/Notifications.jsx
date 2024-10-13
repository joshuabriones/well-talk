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
	const [notificationToDelete, setNotificationToDelete] = useState(null);
	// console.log("notifications:", notifications);
	// console.log("User Session Id: ", userSession.id);

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
					console.error("Error fetching notifications", error);
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

	useEffect(() => {
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

			fetchNotifications();
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

		// setShowNotifications(false);
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
				case "post":
					if (notification?.receiver?.id === user?.id) {
						text = `Counselor ${senderName} has posted a new announcement.`;
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
				case "referral":
					if (
						notification?.receiver?.id === user?.id &&
						notification?.sender?.role == "teacher"
					) {
						text = `Prof. ${senderName} has referred student ${notification?.referral?.studentFirstName} ${notification?.referral?.studentLastName} (${notification?.referral?.studentId}) for an appointment.`;
					}
			}
		}

		if (user?.role === "teacher") {
			switch (type) {
				case "referral":
					if (
						notification?.sender?.id === user?.id &&
						notification?.receiver?.id === user?.id
					) {
						text = `You have referred student ${notification?.referral?.studentFirstName} ${notification?.referral?.studentLastName} (${notification?.referral?.studentId}) for an appointment for reason: ${notification?.referral?.reason}.`;
					}
					break;
			}
		}

		return text;
	};

	const handleShowConfirmDelete = (notification) => {
		setNotificationToDelete(notification?.notificationId);
	};

	const handleCancelDelete = () => {
		setNotificationToDelete(null);
	};

	const handleDeleteNotification = async () => {
		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.DELETE_NOTIFICATION}${notificationToDelete}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				}
			);

			if (!response.ok) {
				console.error("Error deleting notification", response.statusText);
				return;
			}

			fetchNotifications();
			document.getElementById("confirm_delete").close();
		} catch (error) {
			console.error("Error deleting notification:", error);
		}
	};

	return (
		<div className="bg-white absolute z-10 w-full max-w-lg md:max-w-xl h-[50vh] top-16 right-0 md:right-44 md:top-14 rounded-lg drop-shadow-2xl flex flex-col">
			<div className="flex justify-between text-sm border-b border-slate-200 p-3 md:p-5">
				<div className="font-semibold">{user?.firstName}'s Notifications</div>
			</div>

			{/* Notifications*/}
			<div className="flex flex-grow flex-col overflow-y-auto">
				{notifications?.map((notification, key) => (
					<div className="relative">
						<div
							className={` absolute z-10 ${
								notificationToDelete === notification?.notificationId
									? "visible bg-zinc-50 w-full h-full flex items-center justify-center gap-x-2"
									: "invisible"
							} `}
						>
							<button
								className="bg-zinc-200 hover:bg-zinc-300 h-7 w-7 rounded-full flex items-center justify-center"
								onClick={() => handleCancelDelete()}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18 18 6M6 6l12 12"
									/>
								</svg>
							</button>

							<button
								className="bg-zinc-200 hover:bg-zinc-300 h-8 w-fit rounded-full px-4 py-1 text-xs flex items-center justify-center"
								onClick={() => handleDeleteNotification()}
							>
								<div className="pr-1">Delete Notification?</div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-3.5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
									/>
								</svg>
							</button>
						</div>

						<div
							className={`${
								notification?.read ? "" : null
							} flex flex-row px-3 py-4 md:px-5 md:py-5 group  
							${
								notificationToDelete === notification?.notificationId
									? ""
									: "hover:bg-zinc-100 transition duration-300 ease-in-out"
							}`}
							key={key}
							onClick={() => handleNotifClick(notification)}
						>
							<div className="w-1/6 md:w-2/12 flex justify-center items-center">
								<img
									src={notification?.sender?.image}
									alt="Avatar"
									className="rounded-full h-10 w-10 md:h-12 md:w-12"
								/>
							</div>

							<div className="w-4/6 md:w-9/12 md:pl-4 flex flex-col justify-center text-xs md:text-sm">
								{renderNotifText(notification)}
							</div>

							<div
								className="w-1/6 md:w-1/12 flex items-center justify-end invisible group-hover:visible"
								onClick={() => handleShowConfirmDelete(notification)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-5 h-5 md:w-6 md:h-6 rounded-full p-1 hover:bg-zinc-200 text-zinc-300 hover:text-zinc-500 transition duration-300 ease-in-out"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
									/>
								</svg>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
