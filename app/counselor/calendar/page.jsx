"use client";

// libraries
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";

//context
import GlobalContext from "@/context/GlobalContext";

// components
import { Navbar } from "@/components/ui/Navbar";
import Calendar from "@/components/ui/calendar/Calendar";
import CalendarNav from "@/components/ui/calendar/CalendarNav";
import { getDate } from "@/components/ui/calendar/Date";
import DayViewCalendar from "@/components/ui/calendar/DayViewCalendar";
import EventModal from "@/components/ui/calendar/EventModal";
import Events from "@/components/ui/calendar/Events";
import { getMonth } from "@/components/ui/calendar/Month";
import ViewEvents from "@/components/ui/calendar/ViewEvents";

export default function CalendarView() {
	// use useEffect to fetch events
	// const getCalendarEvents = async () => {
	// 	try {
	// 		console.log("before authentication");
	// 		const response = await axios.get(
	// 			"http://localhost:5108/api/CalendarEvents/GetCalendarEvents",
	// 			{ withCredentials: true }
	// 		);

	// 		response.data.map((event) => {
	// 			dispatchCallEvent({ type: "get", payload: event });
	// 			console.log("after success authentication");
	// 		});
	// 	} catch (err) {
	// 		if (err.response.status === 400) {
	// 			console.log("failed before navifate authentication");
	// 			navigate("/signin");
	// 			console.log("failed after navifate authentication");
	// 		}
	// 	}
	// };

	// useEffect(() => {
	// 	getCalendarEvents();
	// }, []);

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

	const [currentMonth, setCurrentMonth] = useState(getMonth());
	const [currentDate, setCurrentDate] = useState(getDate());

	const {
		monthIndex,
		showEventModal,
		viewEvents,
		showDayViewCalendar,
		showMonthViewCalendar,
		dateIndex,
		dispatchCallEvent,
	} = useContext(GlobalContext);

	useEffect(() => {
		showMonthViewCalendar && setCurrentMonth(getMonth(monthIndex, dayjs().year()));
		showDayViewCalendar && setCurrentDate(getDate(monthIndex, dateIndex));

		let month = dayjs(new Date(dayjs().year(), monthIndex, dateIndex)).month();
		let year = dayjs(new Date(dayjs().year(), monthIndex, dateIndex)).year();

		showDayViewCalendar && setCurrentMonth(getMonth(month, year));
	}, [monthIndex, dateIndex]);

	return (
		<div className="h-screen flex flex-row">
			<Navbar userType="counselor" />

			<section className="bg-gray-400 h-[90vh] w-full flex flex-row mt-20 p-6">
				<section className="bg-gray-100 w-1/2 h-full flex flex-col">
					<div className="h-fit">
						<CalendarNav date={currentDate} />
					</div>
					<div className="flex-grow overflow-auto">
						{showMonthViewCalendar && <Calendar month={currentMonth} />}
						{showDayViewCalendar && <DayViewCalendar date={currentDate} />}
					</div>
				</section>

				<Events events={events} />
			</section>

			{viewEvents && <ViewEvents />}
			{showEventModal && <EventModal />}
		</div>
	);
}
