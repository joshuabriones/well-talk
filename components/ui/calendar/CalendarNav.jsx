import GlobalContext from "@/context/GlobalContext";
import "@/css/calendar/CalendarNav.css";
import {
  faChevronLeft,
  faChevronRight,
  faD,
  faEye,
  faM,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useContext, useEffect, useRef } from "react";
import { getDate } from "./Date";

function NavBar(props) {
  const {
    monthIndex,
    setMonthIndex,
    dateIndex,
    setDateIndex,
    showMonthViewCalendar,
    showDayViewCalendar,
    setShowDropdownModal,
    showDropdownModal,

    setDaySelected,
  } = useContext(GlobalContext);

  function handlePrevMonth() {
    showMonthViewCalendar && setMonthIndex(monthIndex - 1);
    showDayViewCalendar && setDateIndex(dateIndex - 1);
  }

  function handleNextMonth() {
    showMonthViewCalendar && setMonthIndex(monthIndex + 1);
    showDayViewCalendar && setDateIndex(dateIndex + 1);
  }

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
    setDateIndex(
      dateIndex === dayjs().date() ? dateIndex + Math.random() : dayjs().date()
    );
    setDaySelected(dayjs());
  }

  let dropdownRef = useRef();
  useEffect(() => {
    let handler = (event) => {
      if (!dropdownRef.current.contains(event.target))
        setShowDropdownModal(false);
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <header className="w-full h-20 flex">
      <div className="bg-[#becfc7] w-full flex flex-row items-center justify-between px-10">
        <div className="flex flex-row justify-center items-center gap-x-5">
          <div>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="chevron-left"
              onClick={handlePrevMonth}
            ></FontAwesomeIcon>
          </div>
          <div className="month-details">
            {showMonthViewCalendar &&
              dayjs(new Date(dayjs().year(), monthIndex, dateIndex)).format(
                "MMMM YYYY"
              )}
            {showDayViewCalendar &&
              dayjs(new Date(dayjs().year(), monthIndex, dateIndex)).format(
                "MMMM D, YYYY"
              )}
          </div>
          <div>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="chevron-right"
              onClick={handleNextMonth}
            ></FontAwesomeIcon>
          </div>
        </div>

        <div className="w-fit flex flex-row items-center justify-between gap-x-4">
          <div>
            <FontAwesomeIcon
              icon={faRotateLeft}
              onClick={handleReset}
              className="text-gray-700 hover:text-black hover:scale-125 cursor-pointer"
            />
          </div>
          <div className="flex flex-row">
            <div
              onClick={() => {
                setShowDropdownModal(!showDropdownModal);
              }}
              ref={dropdownRef}
              className="flex flex-row justify-center items-center"
            >
              <FontAwesomeIcon
                icon={faEye}
                className="text-gray-700 text-lg hover:scale-125 cursor-pointer"
              />

              {showDropdownModal && <ViewChoices />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;

const ViewChoices = () => {
  const {
    setShowMonthViewCalendar,
    setShowDayViewCalendar,
    setShowDropdownModal,
    setDateIndex,
    monthIndex,
    dateIndex,
  } = useContext(GlobalContext);

  return (
    <div className="flex gap-x-4 items-center pl-4">
      <FontAwesomeIcon
        icon={faM}
        onClick={() => {
          setShowMonthViewCalendar(true);
          setShowDayViewCalendar(false);
          setShowDropdownModal(false);
        }}
        className="text-gray-400 text-xs hover:text-gray-800 hover:scale-125 cursor-pointer"
      />

      <FontAwesomeIcon
        icon={faD}
        onClick={() => {
          setShowDayViewCalendar(true);
          setShowMonthViewCalendar(false);
          setShowDropdownModal(false);
          if (monthIndex !== dayjs().month()) {
            setDateIndex(1);
          }
          getDate(dateIndex);
        }}
        className="text-gray-400 text-xs hover:text-gray-800 hover:scale-125 cursor-pointer"
      />
    </div>
  );
};
