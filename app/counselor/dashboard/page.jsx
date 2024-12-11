"use client";

import { Navbar } from "@/components/ui/Navbar";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import { toPng } from "html-to-image";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import BarAppointmentsReferrals from "./BarAppRef";
import DonutAppointments from "./DonutAppointments";
import DonutPosts from "./DonutPosts";
import DonutReferrals from "./DonutReferrals";
import HelloCounselor from "./HelloCounselor";
import LineChartAppointmentsReferrals from "./LineApptRefs";
import StatsCount from "./StatsCount";
import TodaysAppointments from "./TodaysAppointments";

export default function Dashboard() {
	const userSession = getUserSession();
	const [counselor, setCounselor] = useState(null);
	const [studentCount, setStudentCount] = useState(null);
	const [teacherCount, setTeacherCount] = useState(null);

	const chartRef = useRef();

	const handleExport = async () => {
		if (!chartRef.current || !counselor) {
			console.error("Chart reference or counselor is null.");
			return;
		}

		try {
			const currentDate = new Date().toLocaleDateString('fil-PH');

			const fileName = `${counselor.firstName} ${counselor.lastName} - ${counselor.college} - ${currentDate}.pdf`;

			const imgData = await toPng(chartRef.current, { cacheBust: true });
			const pdf = new jsPDF();
			pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
			pdf.save(fileName);
		} catch (error) {
			console.error("Error exporting chart:", error);
		}
	};

	useEffect(() => {
		const fetchCounselorProfile = async () => {
			try {
				const response = await fetch(
					`${process.env.BASE_URL}${API_ENDPOINT.GET_COUNSELOR_BY_ID}${userSession?.id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${Cookies.get("token")}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error("Failed to fetch counselor");
				}
				const data = await response.json();
				setCounselor(data);
			} catch (error) {
				console.error("Error fetching counselor:", error);
			}
		};

		fetchCounselorProfile();
	}, []);

	useEffect(() => {
		if (counselor) {
			const fetchStudentCount = async () => {
				try {
					const response = await fetch(
						`${process.env.BASE_URL}${API_ENDPOINT.GET_STUDENT_COUNT}${userSession?.id}`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${Cookies.get("token")}`,
							},
						}
					);
					if (!response.ok) {
						throw new Error("Failed to fetch Student Count");
					}
					const data = await response.json();
					setStudentCount(data);
				} catch (error) {
					console.error("Error fetching Student Count:", error);
				}
			};

			const fetchTeacherCount = async () => {
				try {
					const response = await fetch(
						`${process.env.BASE_URL}${API_ENDPOINT.GET_TEACHER_COUNT}${userSession?.id}`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${Cookies.get("token")}`,
							},
						}
					);
					if (!response.ok) {
						throw new Error("Failed to fetch Teacher Count");
					}
					const data = await response.json();
					setTeacherCount(data);
				} catch (error) {
					console.error("Error fetching Teacher Count:", error);
				}
			};

			fetchStudentCount();
			fetchTeacherCount();
		}
	}, [counselor]);

	return (
		<div className="min-h-screen w-full px-28 pt-24 flex flex-col gap-y-4 overflow-y-scroll">
			<Navbar userType="counselor" />
			<div ref={chartRef} className="mb-8 flex flex-col gap-7">
				<div className="w-full h-36 flex flex-row mt-4 tracking-wider gap-4">
					<HelloCounselor counselor={counselor} />
					<StatsCount studentCount={studentCount} teacherCount={teacherCount} />
				</div>

				<div className="w-full flex flex-col gap-6">
					<div className="w-full flex flex-row gap-6">
						<div className="w-8/12 h-96 p-2 flex flex-row border border-zinc-200 rounded-lg shadow-sm font-Merriweather text-lg">
							<div className="w-1/3 py-8 flex flex-col justify-center items-center gap-1.5">
								<p className="mb-2 text-base text-zinc-500">Appointments</p>
								<DonutAppointments counselorId={counselor?.id} />
							</div>
							<div className="w-1/3 py-8 flex flex-col justify-center items-center gap-1.5">
								<p className="mb-2 text-base text-zinc-500">Referrals</p>
								<DonutReferrals counselorId={counselor?.id} />
							</div>
							<div className="w-1/3 py-8 flex flex-col justify-center items-center gap-1.5">
								<p className="mb-2 text-base text-zinc-500">Posts</p>
								<DonutPosts counselorId={counselor?.id} />
							</div>
						</div>
						<div className="w-4/12 h-96 p-4 pb-6 flex flex-col border border-zinc-200 rounded-lg shadow-sm font-Merriweather text-lg">
							<p className="mb-2 text-base text-zinc-500">Today's Appointments</p>
							<TodaysAppointments counselorId={counselor?.id} />
						</div>
					</div>
					<div className="w-full h-[30rem] flex flex-row gap-6">
						<div className="w-8/12 p-4 flex flex-col border border-zinc-200 rounded-lg shadow-sm font-Merriweather text-lg">
							<LineChartAppointmentsReferrals />
						</div>

						<div className="w-4/12 p-4 flex flex-col border border-zinc-200 rounded-lg shadow-sm font-Merriweather text-lg">
							<p className="mb-2 text-base text-zinc-500">Appointments and Referrals</p>
							<BarAppointmentsReferrals />
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center">
				<button
					onClick={handleExport}
					className="text-xl bg-white text-lightMaroon font-bold flex items-center gap-2 p-3 hover:bg-gold dark:hover:bg-bgDark1 rounded-lg transition-all duration-300"
				>
					Export to PDF
				</button>
			</div>
		</div>
	);
}
