// Import required libraries
import { API_ENDPOINT } from "@/lib/api";
import Chart from "chart.js/auto";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const DonutPosts = ({ counselorId }) => {
	const [posts, setPosts] = useState(null);
	const [yours, setYours] = useState(0);
	const [others, setOthers] = useState(0);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch(
					`${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_POSTS}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${Cookies.get("token")}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error("Failed to fetch posts");
				}
				const data = await response.json();
				setPosts(data);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		fetchPosts();
	}, [counselorId]);

	useEffect(() => {
		if (posts) {
			let yours = 0;
			let others = 0;

			posts.forEach((post) => {
				if (counselorId === post.author.id) {
					yours += 1;
				} else {
					others += 1;
				}
			});

			setYours(yours);
			setOthers(others);
		}
	}, [posts]);

	useEffect(() => {
		const chartContainer = document.getElementById("Posts");

		if (chartContainer && chartContainer.chartInstance) {
			chartContainer.chartInstance.destroy();
		}

		const ctx = chartContainer.getContext("2d");

		chartContainer.chartInstance = new Chart(ctx, {
			type: "doughnut",
			data: {
				labels: ["Yours", "Other Counselors'"],
				datasets: [
					{
						label: "Status",
						data: [yours, others],
						backgroundColor: ["#007BFF ", "#28A745"],
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
	}, [yours, others]);

	return (
		<div className="w-full h-full flex items-center justify-center">
			<canvas id="Posts" style={{ width: "70%", height: "70%" }}></canvas>
		</div>
	);
};

export default DonutPosts;
