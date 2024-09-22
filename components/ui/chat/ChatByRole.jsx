"use client";
import FloatingChat from "@/components/ui/chat/FloatingChat";
import { useEffect, useState } from "react";

export default function ChatByRole() {
	const [userRole, setUserRole] = useState(null);

	useEffect(() => {
		const fetchSession = async () => {
			const session = await getUserSession();

			setUserRole(session?.role);
		};

		fetchSession();
	}, []);

	if (userRole === "student") {
		return <FloatingChat />;
	}

	return null;
}

// Hypothetical user session fetcher (client-side)
async function getUserSession() {
	return {
		userID: 1,
		role: "student",
	};
}
