import "@/styles/history.css";

import iconDelete from "@/public/images/icons/iconDelete.png";

const ModalTermsUnchecked = ({ onOpen, details }) => {
	return (
		<>
			<input type="checkbox" id="my_modal_7" className="modal-toggle" checked={true} />
			<div className="min-h-screen modal" role="dialog">
				<div
					className="modal-box px-10 flex flex-col items-center justify-center"
					style={{
						minHeight: "60vh",
						maxHeight: "60vh",
						minWidth: "35vw",
					}}
				>
					<div className="flex flex-col py-5" style={{ height: "calc(60vh - 20px)" }}>
						<div className="flex-grow-0 h-3/12 flex flex-col text-center">
							<img
								src={iconDelete.src}
								alt="setter avatar"
								className="w-20 h-20 flex justify-center mx-auto"
							/>
							<h3 className="text-xl font-bold">France Gieb S. Mier</h3>
							<p className="text-sm">21-2724-328</p>
						</div>

						<div className="py-8 flex flex-col gap-y-1">
							<h1 className="font-Merriweather text-sm">Appointment History</h1>
							<div className="h-min overflow-auto">
								<table className="table bg-gray-100">
									<thead>
										<tr className="bg-gray-200 font-bold">
											<th style={{ width: "30%" }}>Date and Time</th>
											<th style={{ width: "45%" }}>Reason</th>
											<th style={{ width: "25%", textAlign: "center" }}>
												Status
											</th>
										</tr>
									</thead>
									<tbody>
										{details.map((appointment, index) => (
											<tr key={index}>
												<td>{appointment.date}</td>
												<td>{appointment.reason}</td>
												<td className="text-center">
													<div
														className={`text-center w-24 h-5 badge badge-xs ${
															appointment &&
															appointment.status === "Pending"
																? "badge-warning"
																: appointment &&
																  appointment.status === "Done"
																? "badge-info"
																: appointment &&
																  appointment.status === "Approved"
																? "badge-success"
																: ""
														}`}
													>
														{appointment.status}
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

				<label
					className="modal-backdrop"
					htmlFor="my_modal_7"
					onClick={() => onOpen(false)}
				>
					Close
				</label>
			</div>
		</>
	);
};

export default ModalTermsUnchecked;
