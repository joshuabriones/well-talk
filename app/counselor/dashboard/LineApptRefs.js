import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import Chart from "chart.js/auto";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const LineChartAppointmentsReferrals = ({ }) => {
	const userSession = getUserSession();
	const [appointments, setAppointments] = useState([]);
	const [appointmentsByYearMonth, setAppointmentsByYearMonth] = useState([]);
	const [referrals, setReferrals] = useState([]);
	const [referralsByYearMonth, setReferralsByYearMonth] = useState([]);
	const [appointmentsByMonth, setAppointmentsByMonth] = useState(new Array(12).fill(0));
	const [referralsByMonth, setReferralsByMonth] = useState(new Array(12).fill(0));

	const currentDate = new Date();
	const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
	const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

	const months = [
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
	];

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
				setAppointments(data);
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
				setReferrals(data);
			} catch (error) {
				console.error("Error fetching referrals:", error);
			}
		};

		fetchCounselorReferrals();
	}, []);

	// Filter data by selected year and month
	useEffect(() => {
		const filteredAppointments = appointments.filter((appointment) => {
			const date = new Date(appointment.appointmentDate);
			return (
				date.getFullYear() === selectedYear &&
				(selectedMonth === -1 || date.getMonth() === selectedMonth)
			);
		});
		setAppointmentsByYearMonth(filteredAppointments);

		const filteredReferrals = referrals.filter((referral) => {
			const date = new Date(referral.dateOfRefferal);
			return (
				date.getFullYear() === selectedYear &&
				(selectedMonth === -1 || date.getMonth() === selectedMonth)
			);
		});
		setReferralsByYearMonth(filteredReferrals);
	}, [appointments, referrals, selectedYear, selectedMonth]);

	// Update monthly data
	useEffect(() => {
		const monthCounts = new Array(12).fill(0);
		appointmentsByYearMonth.forEach((appointment) => {
			const month = new Date(appointment.appointmentDate).getMonth();
			monthCounts[month] += 1;
		});
		setAppointmentsByMonth(monthCounts);

		const referralCounts = new Array(12).fill(0);
		referralsByYearMonth.forEach((referral) => {
			const month = new Date(referral.dateOfRefferal).getMonth();
			referralCounts[month] += 1;
		});
		setReferralsByMonth(referralCounts);
	}, [appointmentsByYearMonth, referralsByYearMonth]);

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
				labels: months, // x-axis (months)
				datasets: [
					{
						label: "Appointments",
						data: appointmentsByMonth,
						fill: false,
						borderColor: "#007BFF",
						tension: 0.1,
						borderWidth: 2,
					},
					{
						label: "Referrals",
						data: referralsByMonth,
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
	}, [appointmentsByMonth, referralsByMonth]);

	return (
		<div>
			<div className="w-full flex flex-row justify-between">
				<p className="mb-4 text-base text-zinc-500">
					Appointments and Referrals over Time
				</p>
				<div className="flex flex-row items-center gap-2">
					<select
						className="form-select text-sm"
						value={selectedMonth}
						onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
					>
						<option value={-1}>All Months</option>
						{months.map((month, index) => (
							<option key={index} value={index}>
								{month}
							</option>
						))}
					</select>
					<input
						className="form-input text-sm"
						type="number"
						value={selectedYear}
						onChange={(e) => setSelectedYear(parseInt(e.target.value))}
					/>
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
