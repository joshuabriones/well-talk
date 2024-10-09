"use client";

import PasswordModal from "@/components/ui/modals/counselor/journal/PasswordModal";
import { Navbar } from "@/components/ui/Navbar";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function JournalPage({ params }) {
	const [student, setStudent] = useState({});
	const [publicJournals, setPublicJournals] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [password, setPassword] = useState("");
	const userSession = getUserSession();
	const [showInvalidPassword, setShowInvalidPassword] = useState(false);

	const fetchStudent = async () => {
		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.GET_STUDENT_BY_ID}${params.id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				}
			);
			if (!response.ok) throw new Error("Failed to fetch student data");
			const data = await response.json();
			setStudent(data);
		} catch (error) {
			console.error("Error fetching student data:", error);
		}
	};

	const fetchPublicJournals = async () => {
		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.GET_PUBLIC_JOURNALS}${params.id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				}
			);
			if (!response.ok)
				throw new Error("Failed to fetch public journals");
			const data = await response.json();
			setPublicJournals(data);
		} catch (error) {
			console.error("Error fetching public journals:", error);
		}
	};

	const handlePasswordSubmit = async (enteredPassword) => {
		const data = {
			institutionalEmail: userSession.email,
			password: enteredPassword,
		};

		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.LOGIN}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			if (response.ok) {
				const data = await response.json();

				Cookies.set("token", data.token);
				setIsModalOpen(false);
				setShowInvalidPassword(false);
				setPassword("");
			} else {
				setShowInvalidPassword(true);
				setPassword("");
			}
		} catch (error) {
			console.error("Error verifying password:", error);
			setShowInvalidPassword(true);
		}
	};

	useEffect(() => {
		fetchStudent();
		fetchPublicJournals();
	}, []);

	return (
		<div className="w-full pt-32 px-4 md:px-10">
			<Navbar userType="counselor" />

			<div
          className="pattern-overlay pattern-left absolute -z-10"
          style={{ transform: "scaleY(-1)", top: "-50px" }}
        >
          <img src="/images/landing/lleft.png" alt="pattern" />
        </div>
        <div
          className="pattern-overlay pattern-right absolute bottom-0 right-0 -z-10"
          style={{ transform: "scaleY(-1)", top: "-15px" }}
        >
          <img
            src="/images/landing/lright.png"
            alt="pattern"
            className="w-full h-full object-contain"
          />
        </div>
			<div className="max-w-7xl mx-auto font-Jaldi">
				<PasswordModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onSubmit={handlePasswordSubmit}
					password={password}
					setPassword={setPassword}
					showInvalidPassword={showInvalidPassword}
				/>

				<>
					<div className="flex flex-col md:flex-row gap-5">
						<img
							src={student.image}
							alt="student"
							className="w-36 h-36 rounded-lg mx-auto md:mx-0"
						/>
						<div className="w-full flex flex-col md:flex-row justify-between items-start border-b-2">
							<div className="w-full flex flex-col justify-center mb-4 md:mt-5 lg:mt-5 md:mb-0 border-b-2 md:border-none lg:border-none">
								<h2 className="text-4xl md:text-5xl">
									{student.firstName} {student.lastName}
								</h2>
								<p className="text-xl md:text-2xl text-slate-500">
									{student.institutionalEmail}
								</p>
							</div>
							<div className="text-right flex flex-col items-start md:items-end w-full mt-0 md:mt-5 lg:mt-5 md:w-1/3">
								<div>{student.idNumber}</div>
								<div>
									{student.program} - {student.year}
								</div>
								<div className="mb-4 md:mb-0 lg:mb-0">
									{student.college}
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col md:flex-row gap-5 mt-10 w-full">
						<div className="flex-1 p-4 rounded-2xl border-b-2 md:border lg:border shadow-xl">
							<h2 className="text-2xl font-semibold">
								Shared Journal
							</h2>
							{publicJournals.length > 0 ? (
								publicJournals.map((journal) => (
									<details
										className="p-4 group"
										key={journal.id || journal.title}>
										<summary className="[&::-webkit-details-marker]:hidden relative pr-8 font-medium list-none cursor-pointer text-slate-700 focus-visible:outline-none transition-colors duration-300 group-hover:text-slate-900">
											<h2 className="text-xl">
												{journal.title}
											</h2>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="absolute right-0 w-4 h-4 transition duration-300 top-1 stroke-slate-700 shrink-0 group-open:rotate-45"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth="1.5"
												aria-labelledby="title-ac01 desc-ac01">
												<title id="title-ac01">
													Open icon
												</title>
												<desc id="desc-ac01">
													icon that represents the
													state of the summary
												</desc>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M12 4v16m8-8H4"
												/>
											</svg>
										</summary>
										<p className="mt-4 text-slate-500">
											{journal.entry}
										</p>
									</details>
								))
							) : (
								<p className="text-slate-500">
									No public journals available.
								</p>
							)}
						</div>

						<div className="flex-1 p-4 rounded-2xl border-b-2 md:border lg:border shadow-xl">
							<h2 className="text-2xl font-semibold">
								Your Notes
							</h2>
							{/* Your Notes content */}
						</div>
					</div>
				</>
			</div>
		</div>
	);
}
