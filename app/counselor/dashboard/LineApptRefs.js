import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import Chart from "chart.js/auto";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const LineChartAppointmentsReferrals = ({}) => {
	const userSession = getUserSession();
	const [appointments, setAppointments] = useState([]);
	const [appointmentsByYear, setAppointmentsByYear] = useState([]);
	const [appointmentsByMonth, setAppointmentsByMonth] = useState(new Array(12).fill(0));

	console.log("appointments by month", appointmentsByMonth);

	const [referrals, setReferrals] = useState([]);
	const [referralsByYear, setReferralsByYear] = useState([]);
	const [referralsByMonth, setReferralsByMonth] = useState(new Array(12).fill(0));
	console.log("referrals by month", referralsByMonth);

	const [displayedYear, setDisplayedYear] = useState(new Date().getFullYear());

	useEffect(() => {
		const fetchCounselorAppointments = async () => {
			try {
				const response = await fetch(
					`${process.env.BASE_URL}${API_ENDPOINT.GET_APPOINTMENTS_BY_COUNSELOR_ID}${userSession.id}`,
					{
						headers: {
							Authorization: `Bearer ${Cookies.get("token")}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch appointments");
				}
				const data = await response.json();
				setAppointments(data); // Store the raw data
			} catch (error) {
				console.error("Error fetching appointments:", error);
			}
		};

		fetchCounselorAppointments();
	}, []);

	useEffect(() => {
		const fetchCounselorReferrals = async () => {
			try {
				const response = await fetch(
					`${process.env.BASE_URL}${API_ENDPOINT.GET_REFERRAL_BY_COUNSELOR_ID}${userSession.id}`,
					{
						headers: {
							Authorization: `Bearer ${Cookies.get("token")}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to fetch referrals");
				}
				const data = await response.json();
				setReferrals(data); // Store the raw data
			} catch (error) {
				console.error("Error fetching referrals:", error);
			}
		};
		fetchCounselorReferrals();
	}, []);

	// Filter appointments by the displayedYear
	useEffect(() => {
		// appointments
		const filteredAppointments = appointments.filter((appointment) => {
			const appointmentYear = new Date(appointment.appointmentDate).getFullYear();
			return appointmentYear === displayedYear;
		});
		setAppointmentsByYear(filteredAppointments);
	}, [appointments, displayedYear]);

	useEffect(() => {
		// referrals
		const filteredReferrals = referrals.filter((referral) => {
			const referralYear = new Date(referral.dateOfRefferal).getFullYear();
			return referralYear === displayedYear;
		});
		setReferralsByYear(filteredReferrals);
	}, [referrals, displayedYear]);

	// Filter yearly appointments by months
	useEffect(() => {
		const monthCounts = new Array(12).fill(0);

		appointmentsByYear.forEach((appointment) => {
			const month = new Date(appointment.appointmentDate).getMonth();
			monthCounts[month] += 1;
		});

		setAppointmentsByMonth(monthCounts);
	}, [appointmentsByYear]);

	useEffect(() => {
		// referrals
		const monthCounts = new Array(12).fill(0);

		referralsByYear.forEach((referral) => {
			const month = new Date(referral.dateOfRefferal).getMonth();
			console.log("month", month);
			monthCounts[month] += 1;
		});

		setReferralsByMonth(monthCounts);
	}, [referralsByYear]);

	const handlePrevious = () => {
		setDisplayedYear(displayedYear - 1);
	};

	const handleNext = () => {
		setDisplayedYear(displayedYear + 1);
	};

	// Set up the chart once data is available
	useEffect(() => {
		const chartContainer = document.getElementById("appointmentsReferralsChart");

		if (chartContainer && chartContainer.chartInstance) {
			chartContainer.chartInstance.destroy();
		}

		const ctx = chartContainer.getContext("2d");

		const chartInstance = new Chart(ctx, {
			type: "line",
			data: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				], // x-axis (months)
				datasets: [
					{
						label: "Appointments",
						data: [
							appointmentsByMonth[0],
							appointmentsByMonth[1],
							appointmentsByMonth[2],
							appointmentsByMonth[3],
							appointmentsByMonth[4],
							appointmentsByMonth[5],
							appointmentsByMonth[6],
							appointmentsByMonth[7],
							appointmentsByMonth[8],
							appointmentsByMonth[9],
							appointmentsByMonth[10],
							appointmentsByMonth[11],
						],
						fill: false,
						borderColor: "#007BFF",
						tension: 0.1,
						borderWidth: 2,
					},
					{
						label: "Referrals",
						data: [
							referralsByMonth[0],
							referralsByMonth[1],
							referralsByMonth[2],
							referralsByMonth[3],
							referralsByMonth[4],
							referralsByMonth[5],
							referralsByMonth[6],
							referralsByMonth[7],
							referralsByMonth[8],
							referralsByMonth[9],
							referralsByMonth[10],
							referralsByMonth[11],
						],
						fill: false,
						borderColor: "#28A745",
						tension: 0.1,
						borderWidth: 2,
					},
				],
			},
			options: {
				responsive: true,
				scales: {
					x: {
						title: {
							display: true,
							text: "Months",
						},
					},
					y: {
						title: {
							display: true,
							text: "Count",
						},
						beginAtZero: true,
						ticks: {
							stepSize: 1,
							callback: function (value) {
								return Number.isInteger(value) ? value : "";
							},
						},
					},
				},
				plugins: {
					legend: {
						position: "bottom",
						labels: {
							font: {
								size: 14,
								family: "Jaldi",
							},
							padding: 15,
							paddingTop: 20,
						},
					},
					tooltip: {
						callbacks: {
							title: (tooltipItems) => tooltipItems[0].label,
							label: (tooltipItem) =>
								`${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
						},
					},
				},
			},
		});

		chartContainer.chartInstance = chartInstance;

		return () => {
			if (chartContainer.chartInstance) {
				chartContainer.chartInstance.destroy();
			}
		};
	}, [appointmentsByYear, appointmentsByMonth, referralsByYear, referralsByMonth]); // Re-render the chart when counts change

	return (
		<div>
			<div className="w-full  flex flex-row justify-between">
				<p className="mb-4 text-base text-zinc-500">Appointments and Referrals over Time</p>
				<div className="flex flex-row items-center justify-center gap-2">
					<div className="hover:scale-75" onClick={handlePrevious}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 19.5 8.25 12l7.5-7.5"
							/>
						</svg>
					</div>
					<p className="text-sm text-zinc-500">{displayedYear}</p>
					<div className="hover:scale-75" onClick={handleNext}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m8.25 4.5 7.5 7.5-7.5 7.5"
							/>
						</svg>
					</div>
				</div>
			</div>
			<div className="w-full h-full flex items-center justify-center">
				<canvas
					id="appointmentsReferralsChart"
					style={{ width: "50%", height: "35%" }}
				></canvas>
			</div>
		</div>
	);
};

export default LineChartAppointmentsReferrals;
