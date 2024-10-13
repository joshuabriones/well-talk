import React from "react";

const GlobalContext = React.createContext({
	//event modal
	timeSlots: [],
	setTimeSlots: () => {},
	trackPosition: null,
	setTrackPosition: () => {},
	height: null,
	setHeight: () => {},
	title: "",
	setTrackTitle: () => {},
	title: null,
	setTitle: () => {},
	dayViewEventStartTime: 0,
	setDayViewEventStartTime: () => {},
	dayViewEventEndTime: 0,
	setDayViewEventEndTime: () => {},
	addTime: true,
	setAddTime: () => {},
	eventStartTime: () => {},
	setEventStartTime: () => {},
	startTimeComponent: false,
	setStartTimeComponent: () => {},
	endTimeComponent: false,
	setEndTimeComponent: () => {},
	date: true,
	setDate: () => {},
	monthIndex: 0,
	setMonthIndex: (index) => {},
	dateIndex: 0,
	setDateIndex: () => {},
	sideBarCalendarMonth: 0,
	setSideBarCalendarMonth: (index) => {},
	daySelected: 0,
	setDaySelected: () => {},
	defaultTitle: false,
	setDefaultTitle: () => {},
	defaultTimeWithTitle: false,
	setDefaultTimeWithTitle: () => {},
	showEventModal: false,
	setShowEventModal: () => {},
	showAppointmentModal: false,
	setShowAppointmentModal: () => {},
	dispatchCallEvent: ({ type, payload }) => {},
	savedEvents: [],
	selectedEvent: null,
	setSelectedEvent: () => {},
	labels: [],
	setLabels: () => {},
	updateLabel: () => {},
	filteredEvents: [],
	showMonthViewCalendar: true,
	setShowMonthViewCalendar: () => {},
	showDayViewCalendar: false, ///////////////////
	setShowDayViewCalendar: () => {},
	currentCalendarType: [],
	setCurrentCalendarType: () => {},
	showDropdownModal: false,
	setShowDropdownModal: () => {},
	//
	dropdown: false,
	setDropdown: () => {},
	test: false,
	setTest: () => {},
	///
	trackLabel: null,
	setTrackLabel: () => {},
	isToggle: false,
	setIsToggle: () => {},
	startDateTime: null,
	setStartDateTime: () => {},
	endDateTime: null,
	setEndDateTime: () => {},
	startTime: null,
	setStartTime: () => {},
	endTime: null,
	setEndTime: () => {},
	currentTime: null,
	setCurrentTime: () => {},
	viewEvents: false,
	setViewEvents: () => {},
	startDateCalendar: false,
	setStartDateCalendar: () => {},
	endDateCalendar: false,
	setEndDateCalendar: () => {},
	showNotifications: false,
	setShowNotifications: () => {},
	unreadCount: 0,
	setUnreadCount: () => {},

});

export default GlobalContext;
