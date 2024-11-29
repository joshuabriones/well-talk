import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const TodaysAppointments = ({ counselorId }) => {
	const [appointments, setAppointments] = useState(null);
	const [filteredAppointments, setFilteredAppointments] = useState([]);

	console.log("appointments", appointments);

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
			const today = new Date().toISOString().split("T")[0];

			const filtered = appointments.filter((appointment) => {
				const appointmentDate = appointment.appointmentDate.split("T")[0];
				return appointmentDate === today;
			});

			setFilteredAppointments(filtered);
		}
	}, [appointments]);

	return (
		<div className="w-full flex flex-col">
			<div className="overflow-x-auto max-w-full py-1 flex flex-col items-center">
				<div className="max-h-80 overflow-y-auto w-full">
					{" "}
					{/* Scrollable wrapper */}
					<table className="table bg-gray-100 rounded-xl px-2">
						{/* Table head */}
						<thead className="bg-silver px-2 border-b-2 border-maroon rounded-t-2xl">
							<tr className="font-bold text-center py-4 rounded-t-2xl">
								<th className="py-4">ID Number</th>
								<th className="py-4 w-md">Student Name</th>
								<th className="py-4 hidden lg:table-cell">Reason</th>
								<th className="py-4">Status</th>
							</tr>
						</thead>
						<tbody>
							{filteredAppointments.map((appointment) => (
								<tr
									key={appointment.appointmentId}
									className="border-slate-100 border-b-2 hover:bg-slate-100 cursor-pointer transition duration-300 ease-in-out"
								>
									<td className="text-center py-2">
										<div className="text-xs">
											{appointment.student?.idNumber}
										</div>
									</td>
									<td className="h-full">
										<div className="flex items-center justify-start gap-3">
											<div>
												<div className="text-xs">
													{appointment.student?.firstName}{" "}
													{appointment.student?.lastName}
												</div>
											</div>
										</div>
									</td>
									<td className="text-center hidden lg:table-cell">
										<p className="text-xs">
											{appointment?.appointmentPurpose?.length > 15
												? `${appointment?.appointmentPurpose?.substring(
														0,
														15
												  )}...`
												: appointment?.appointmentPurpose}
										</p>
									</td>
									<td className="h-full">
										<div className="flex items-center justify-center">
											<div
												className={`w-20 lg:w-28 h-6 rounded-lg border border-zinc-700 text-center`}
											>
												{appointment?.appointmentStatus === "Pending" &&
													"🟡"}
												{appointment?.appointmentStatus === "Done" && "🟢"}
												{appointment?.appointmentStatus === "Cancelled" &&
													"🔴"}
												<span className="ml-2 text-bold text-xs">
													{appointment?.appointmentStatus}
												</span>
											</div>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default TodaysAppointments;
