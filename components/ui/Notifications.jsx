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
		<div className="bg-white absolute z-10 w-[500px] h-[600px] top-14 right-44 rounded-lg drop-shadow-2xl flex flex-col ">
			<div className="flex justify-between text-sm border-b border-slate-200 p-5">
				<div>Bomba Ding's Notifications</div>
				<div className="text-blue-600">Mark All as Read</div>
			</div>

			{/* Notification List */}
			<div className="flex flex-grow flex-col">
				<div className="h-24 w-full flex flex-row px-2 group hover:bg-zinc-100">
					<div className="h-full w-2/12 flex justify-center items-center">
						<img
							src="https://avatar.iran.liara.run/public"
							alt=""
							className="rounded-full h-12 w-12"
						/>
					</div>

					<div className="h-full w-9/12 pl-1.5 flex items-center justify-center text-sm">
						{generateNotif(notifs[0])}
					</div>

					<div className="h-full w-1/12 flex items-center invisible group-hover:visible">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="black"
							className="size-6  rounded-full p-1 hover:bg-zinc-200"
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
