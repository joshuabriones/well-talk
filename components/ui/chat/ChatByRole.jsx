"use client";
import { getUserSession } from "@/lib/helperFunctions";
import { useEffect, useState } from "react";
import FloatingChat from "./FloatingChat";

export default function ChatByRole() {
	const [userRole, setUserRole] = useState(null);

	useEffect(() => {
		const fetchSession = async () => {
			try {
				const session = await getUserSession();
				setUserRole(session?.role);
			} catch (error) {
				console.error("Error fetching session:", error);
			}
		};

		fetchSession();

		const intervalId = setInterval(() => {
			fetchSession();
		}, 5000);

		return () => clearInterval(intervalId);
	}, []);

	if (userRole === "student" || userRole === "teacher") {
		return <FloatingChat />;
	}

	return null;
}

// Hypothetical user session fetcher (client-side)
// async function getUserSession() {
// 	return {
// 		userID: 1,
// 		role: "student",
// 	};
// }
