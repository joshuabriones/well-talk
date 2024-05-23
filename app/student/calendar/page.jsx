"use client";

import { Navbar } from "@/components/ui/Navbar";
import CalendarScheduling from "@/components/ui/calendar/CalendarScheduling";
import Events from "@/components/ui/calendar/Events";
import ViewEvents from "@/components/ui/calendar/ViewEvents";
import GlobalContext from "@/context/GlobalContext";
import { useContext } from "react";

export default function CalendarView() {
	const { showEventModal, viewEvents } = useContext(GlobalContext);

	const events = [
		{
			id: 1,
			tag: "Event",
			date: "2024-05-04",
			time: "10:00 AM",
			user: {
				idNumber: "2024-0001",
				firstName: "John",
				lastName: "Doe",
				institutionalEmail: "jdoe@gmail.com",
				image: "/path/to/image.jpg",
			},
			name: "PA-MIST-TEH: Sale on Mists and Teas",
			type: "Event 1 Type",
			location: "Location 1",
			additional_notes:
				"This event is a sale on mists and teas. Get your mists and teas here! Enjoy up to 50% off on selected items that is curated by the people behind always sunny in philadelphia, pamistteh!",
			status: "Upcoming",
		},
		{
			id: 2,
			tag: "Event",
			date: "2024-05-04",
			time: "10:00 AM",
			user: {
				idNumber: "2024-0001",
				firstName: "John",
				lastName: "Doe",
				institutionalEmail: "jdoe@gmail.com",
				image: "/path/to/image.jpg",
			},
			name: "BALIKWAS: Refusing to be Silenced",
			type: "Event 1 Type",
			location: "Location 1",
			additional_notes:
				"BALIKWAS is a webinar held by the Institute of Balikwas University to mitigate the risks of Baliwasing the demons by Doja Cat.",
			status: "Upcoming",
		},
		{
			id: 3,
			tag: "Event",
			date: "2024-05-04",
			time: "10:00 AM",
			user: {
				idNumber: "2024-0001",
				firstName: "John",
				lastName: "Doe",
				institutionalEmail: "jdoe@gmail.com",
				image: "/path/to/image.jpg",
			},
			name: "GI-ATAY: Liver and Kidney Failure Awareness Campaign",
			type: "Event 1 Type",
			location: "Location 1",
			additional_notes:
				"GI-ATAY, which is a pretty vulgar word, actually aims to educate young people on the importance of their liver health. Expresso martini on a Tuesday night? Well Goddamn, you're gonna need this event.",
			status: "Upcoming",
		},
		{
			id: 4,
			tag: "Event",
			date: "2024-05-04",
			time: "10:00 AM",
			user: {
				idNumber: "2024-0001",
				firstName: "John",
				lastName: "Doe",
				institutionalEmail: "jdoe@gmail.com",
				image: "/path/to/image.jpg",
			},
			name: "BRO-ANGG: The Adventures of Angg and His BROS",
			type: "Event 1 Type",
			location: "Location 1",
			additional_notes:
				"Bro-Angg is wordplay on a classic Bisaya curse word Boang, which means crazy. I'm not crazy, maybe Angg is. Is Angg crazy?",
			status: "Upcoming",
		},
	];

	const appointments = [
		{
			id: 1,
			tag: "Event",
			date: "March 15, 2024",
			time: "11:00 AM",
			user: {
				idNumber: "2024-0001",
				firstName: "John",
				lastName: "Doe",
				institutionalEmail: "jdoe@gmail.com",
				image: "/path/to/image.jpg",
			},
			name: "PA-MIST-TEH: Sale on Mists and Teas",
			type: "Event 1 Type",
			location: "Location 1",
			additional_notes:
				"This event is a sale on mists and teas. Get your mists and teas here! Enjoy up to 50% off on selected items that is curated by the people behind always sunny in philadelphia, pamistteh!",
			status: "Upcoming",
		},
	];

	return (
		<div className="h-screen flex flex-row">
			<Navbar userType="counselor" />

			<section className="bg-gray-200 h-[90vh] w-full flex flex-row mt-20 p-6">
				<CalendarScheduling />
				<Events events={events} />
			</section>

			{viewEvents && <ViewEvents />}
		</div>
	);
}
