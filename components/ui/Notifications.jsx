const user = {
	id: 99,
	name: "France Gieb S. Mier",
	img: "https://avatar.iran.liara.run/public",
};

const notifs = [
	{
		id: 1,
		receiver: {
			id: 10,
			name: "Bomba Ding",
			img: "https://avatar.iran.liara.run/public",
		},
		sender: {
			id: 99,
			name: "France Gieb S. Mier",
			img: "https://avatar.iran.liara.run/public",
		},
		// title,
		type: "Appointment",
		isRead: "false",
		timestamp: "2024-08-12T12:45:00.000Z",

		appointment: {
			id: 20,
			date: "2024-08-12",
		},
	},
];

export default function Notifications() {
	const generateNotif = (notif) => {
		let text = "";

		switch (notif.type) {
			case "Appointment":
				if (user.id === notif.sender.id) {
					text = `You have set an appointment with Counselor ${notif.receiver.name} on ${notif.appointment.date}.`;
				}
				break;
		}

		return text;
	};

	return (
		<div className="bg-white absolute z-10 w-full max-w-lg md:max-w-xl h-[50vh] top-16 right-0 md:right-44 md:top-14 rounded-lg drop-shadow-2xl flex flex-col">
			{/* Header */}
			<div className="flex justify-between text-sm border-b border-slate-200 p-3 md:p-5">
				<div className="font-semibold">Bomba Ding's Notifications</div>
				<div className="text-blue-600 cursor-pointer text-xs md:text-sm">
					Mark All as Read
				</div>
			</div>

			{/* Notification List */}
			<div className="flex flex-grow flex-col overflow-y-auto">
				<div className="flex flex-row px-3 py-4 md:px-5 md:py-5 group hover:bg-zinc-100 ">
					{/* Avatar */}
					<div className="w-1/6 md:w-2/12 flex justify-center items-center">
						<img
							src="https://avatar.iran.liara.run/public"
							alt="Avatar"
							className="rounded-full h-10 w-10 md:h-12 md:w-12"
						/>
					</div>

					{/* Notification Text */}
					<div className="w-4/6 md:w-9/12 md:pl-4 flex items-center text-xs md:text-sm text-gray-700">
						{generateNotif(notifs[0])}
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
			</div>
		</div>
	);
}
