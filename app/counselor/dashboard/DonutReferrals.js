// Import required libraries
import { API_ENDPOINT } from "@/lib/api";
import Chart from "chart.js/auto";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const DonutReferrals = ({ counselorId }) => {
	const [referrals, setReferrals] = useState(null);
	const [pendingCount, setPendingCount] = useState(0);
	const [acceptedCount, setAcceptedCount] = useState(0);
	const [appointedCount, setAppointedCount] = useState(0);

	console.log("referrals", referrals);

	useEffect(() => {
		const fetchCounselorReferrals = async () => {
			try {
				const response = await fetch(
					`${process.env.BASE_URL}${API_ENDPOINT.GET_REFERRAL_BY_COUNSELOR_ID}${counselorId}`,
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
	}, [counselorId]);

	useEffect(() => {
		if (referrals) {
			let pending = 0;
			let appointed = 0;

			referrals.forEach((referral) => {
				switch (referral.status) {
					case "Pending":
						pending += 1;
						break;
					case "Accepted":
						accepted += 1;
						break;
					case "Appointed":
						appointed += 1;
						break;
					default:
						break;
				}
			});

			setPendingCount(pending);
			setAppointedCount(appointed);
		}
	}, [referrals]);

	useEffect(() => {
		const chartContainer = document.getElementById("Referrals");

		if (chartContainer && chartContainer.chartInstance) {
			chartContainer.chartInstance.destroy();
		}

		const ctx = chartContainer.getContext("2d");

		chartContainer.chartInstance = new Chart(ctx, {
			type: "doughnut",
			data: {
				labels: ["Pending", "Accepted", "Appointed"],
				datasets: [
					{
						label: "Status",
						data: [pendingCount, acceptedCount, appointedCount],
						backgroundColor: ["#FFA500", "#007BFF", "#28A745"],
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
	}, [pendingCount, appointedCount]);

	return (
		<div className="w-full h-full flex items-center justify-center">
			<canvas id="Referrals" style={{ width: "70%", height: "70%" }}></canvas>
		</div>
	);
};

export default DonutReferrals;
