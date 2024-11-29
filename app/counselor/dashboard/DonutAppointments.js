// Import required libraries
import { API_ENDPOINT } from "@/lib/api";
import Chart from "chart.js/auto";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const DonutAppointments = ({ counselorId }) => {
	const [appointments, setAppointments] = useState(null);
	const [pendingCount, setPendingCount] = useState(0);
	const [doneCount, setDoneCount] = useState(0);
	const [cancelledCount, setCancelledCount] = useState(0);

	useEffect(() => {
		const fetchCounselorAppointments = async () => {
			try {
				const response = await fetch(
					`${process.env.BASE_URL}${API_ENDPOINT.GET_APPOINTMENTS_BY_COUNSELOR_ID}${counselorId}`,
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
	}, [counselorId]);

	useEffect(() => {
		if (appointments) {
			let pending = 0;
			let done = 0;
			let cancelled = 0;

			appointments.forEach((appointment) => {
				switch (appointment.appointmentStatus) {
					case "Pending":
						pending += 1;
						break;
					case "Done":
						done += 1;
						break;
					case "Cancelled":
						cancelled += 1;
						break;
					default:
						break;
				}
			});

			setPendingCount(pending);
			setDoneCount(done);
			setCancelledCount(cancelled);
		}
	}, [appointments]);

	useEffect(() => {
		const chartContainer = document.getElementById("Appointments");

		if (chartContainer && chartContainer.chartInstance) {
			chartContainer.chartInstance.destroy();
		}

		const ctx = chartContainer.getContext("2d");

		chartContainer.chartInstance = new Chart(ctx, {
			type: "doughnut",
			data: {
				labels: ["Pending", "Completed", "Cancelled"],
				datasets: [
					{
						label: "Status",
						data: [pendingCount, doneCount, cancelledCount],
						backgroundColor: ["#FFA500", "#28A745", "#DC3545"],
						hoverOffset: 10,
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: "bottom",
						labels: {
							font: {
								size: 14,
								family: "Jaldi",
							},
							boxWidth: 18,
							boxHeight: 18,
							padding: 15,
							paddingTop: 20,
							usePointStyle: false,
						},
					},
					tooltip: {
						backgroundColor: "rgba(0, 0, 0, 0.7)",
						titleColor: "#ffffff",
						titleFont: {
							size: 16,
							weight: "bold",
						},
						bodyColor: "#ffffff",
						bodyFont: {
							size: 14,
						},
						padding: 10,
						displayColors: false,
						callbacks: {
							title: (tooltipItems) => {
								return tooltipItems[0].label;
							},
						},
					},
				},
				cutout: "50%",
			},
		});
	}, [pendingCount, doneCount, cancelledCount]);

	return (
		<div className="w-full h-full flex items-center justify-center">
			<canvas id="Appointments" style={{ width: "60%", height: "60%" }}></canvas>
		</div>
	);
};

export default DonutAppointments;
