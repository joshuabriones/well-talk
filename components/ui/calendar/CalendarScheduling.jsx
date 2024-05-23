import Calendar from "@/components/ui/calendar/Calendar";
import CalendarNav from "@/components/ui/calendar/CalendarNav";
import { getDate } from "@/components/ui/calendar/Date";
import DayViewCalendar from "@/components/ui/calendar/DayViewCalendar";
import { getMonth } from "@/components/ui/calendar/Month";
import GlobalContext from "@/context/GlobalContext";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";

const CalendarScheduling = () => {
  const { monthIndex, showDayViewCalendar, showMonthViewCalendar, dateIndex } =
    useContext(GlobalContext);

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

  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [currentDate, setCurrentDate] = useState(getDate());

  useEffect(() => {
    showMonthViewCalendar &&
      setCurrentMonth(getMonth(monthIndex, dayjs().year()));
    showDayViewCalendar && setCurrentDate(getDate(monthIndex, dateIndex));

    let month = dayjs(new Date(dayjs().year(), monthIndex, dateIndex)).month();
    let year = dayjs(new Date(dayjs().year(), monthIndex, dateIndex)).year();

    showDayViewCalendar && setCurrentMonth(getMonth(month, year));
  }, [monthIndex, dateIndex]);

  return (
    <section className="bg-gray-100 w-1/2 h-full flex flex-col border-gray-400 border-t border-b border-l">
      <div className="h-fit">
        <CalendarNav date={currentDate} />
      </div>

      <div className="flex-grow overflow-auto">
        {showMonthViewCalendar && <Calendar month={currentMonth} />}
        {showDayViewCalendar && <DayViewCalendar date={currentDate} />}
      </div>
    </section>
  );
};

export default CalendarScheduling;
