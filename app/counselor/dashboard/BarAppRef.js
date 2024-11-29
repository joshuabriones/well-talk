import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import Chart from "chart.js/auto";
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";

const BarAppointmentsReferrals = () => {
	const userSession = getUserSession();
	const [appointments, setAppointments] = useState([]);
	const [referrals, setReferrals] = useState([]);

	console.log(referrals);

	const [appointmentCount, setAppointmentCount] = useState(0);
	const [referralCount, setReferralCount] = useState(0);

	const chartRef = useRef(null);

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
	}, [userSession.id]);

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
	}, [userSession.id]);

	useEffect(() => {
		setAppointmentCount(appointments.length);
	}, [appointments]);

	useEffect(() => {
		setReferralCount(referrals.length);
	}, [referrals]);

	useEffect(() => {
		if (chartRef.current) {
			chartRef.current.destroy(); // Destroy the previous chart if it exists
		}

		const ctx = document.getElementById("appointmentsReferralsBarChart").getContext("2d");

		chartRef.current = new Chart(ctx, {
			type: "bar",
			data: {
				labels: ["Appointments", "Referrals"],
				datasets: [
					{
						data: [appointmentCount, referralCount],
						backgroundColor: ["#007BFF", "#28A745"],
						borderWidth: 1,
					},
				],
			},
			options: {
				responsive: true,
				scales: {
					x: {
						title: {
							display: true,
							text: "Categories",
						},
						grid: {
							display: false,
						},
					},
					y: {
						title: {
							display: true,
							text: "Count",
						},
						beginAtZero: true,
					},
				},
				plugins: {
					legend: {
						position: "bottom",
						display: false,
					},
				},
			},
		});

		return () => {
			if (chartRef.current) {
				chartRef.current.destroy(); // Cleanup chart on component unmount
			}
		};
	}, [appointmentCount, referralCount]); // Re-render chart when data changes

	return (
		<div className="w-full h-full flex items-center justify-center">
			<canvas
				id="appointmentsReferralsBarChart"
				style={{ width: "30%", height: "55%" }}
			></canvas>
		</div>
	);
};

export default BarAppointmentsReferrals;
