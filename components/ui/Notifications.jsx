import { getUserSession } from "@/lib/helperFunctions";
import { useEffect, useState } from "react";

const notifs = [
	{
		id: 1,
		rptId: 99,
		rptName: "France Gieb S. Mier",
		rptImg: "https://avatar.iran.liara.run/public",
		type: "Appointment",
		timestamp: "2024-08-12T12:45:00.000Z",
	},
];

export default function Notifications() {
	const userSession = getUserSession();

	const [user, setUser] = useState(null);

	useEffect(() => {
		setUser(userSession);
	}, []);

	console.log(user);

	return (
		<div className="bg-white absolute z-10 w-1/4 h-[600px] top-14 right-44 rounded-lg drop-shadow-2xl flex flex-col ">
			<div className="flex justify-between text-sm border-b border-slate-200 p-5">
				<div>Bomba Ding's Notifications</div>
				<div className="text-blue-600">Mark All as Read</div>
			</div>

			{/* Notification List */}
			<div className="bg-amber-400 h-32 w-full flex flex-row">
				<div className="bg-pink-400 h-full w-1/5"></div>
				<div className="bg-pink-700 h-full flex-grow"></div>
				<div className="bg-pink-400 h-full w-1/12"></div>
			</div>
		</div>
	);
}
