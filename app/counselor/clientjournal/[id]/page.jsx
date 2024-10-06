"use client";

import { Navbar } from "@/components/ui/Navbar";
import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function JournalPage({ params }) {
	const [student, setStudent] = useState({});
	const [publicJournals, setPublicJournals] = useState([]);

	const fetchStudent = async () => {
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
		const data = await response.json();
		setStudent(data);
	};

	const fetchPublicJournals = async () => {
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
		const data = await response.json();
		setPublicJournals(data);
	};

	useEffect(() => {
		fetchStudent();
		fetchPublicJournals();
	}, []);

	console.log(publicJournals);

	const dummyJournals = [
		{
			title: "Journal 1",
			date: "Spetember 1, 2021",
			content: "This is the content of journal 1",
		},
		{
			title: "Journal 2",
			date: "Spetember 2, 2021",
			content: "This is the content of journal 2",
		},
		{
			title: "Journal 3",
			date: "Spetember 3, 2021",
			content: "This is the content of journal 3",
		},
	];

	const dummyNotes = [
		{
			title: "Note 1",
			date: "Spetember 1, 2021",
			content: "This is the content of note 1",
		},
		{
			title: "Note 2",
			date: "Spetember 2, 2021",
			content: "This is the content of note 2",
		},
		{
			title: "Note 3",
			date: "Spetember 3, 2021",
			content: "This is the content of note 3",
		},
	];

	return (
		<div className="w-full pt-32 px-4 md:px-10">
			<Navbar userType="counselor" />
			<div className="max-w-7xl mx-auto font-Jaldi">
				<div className="flex flex-col md:flex-row gap-5">
					<img
						src={student.image}
						alt="student"
						className="w-36 h-36 rounded-lg mx-auto md:mx-0"
					/>
					<div className="w-full flex flex-col md:flex-row justify-between items-start border-b-2">
						<div className="w-full flex flex-col justify-center mb-4 md:mt-5 lg:mt-5 md:mb-0 border-b-2 md:border-none lg:border-none">
							<h2 className="text-4xl md:text-5xl">
								{student.firstName + " " + student.lastName}
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
					<div className="flex-1 p-4">
						<h2 className="text-2xl font-semibold">
							Shared Journal
						</h2>
						{publicJournals.map((journal) => (
							<details
								className="p-4 group"
								key={journal.id}>
								<summary className="[&::-webkit-details-marker]:hidden relative pr-8 font-medium list-none cursor-pointer text-slate-700 focus-visible:outline-none transition-colors duration-300 group-hover:text-slate-900">
									<h2 className="text-xl">{journal.title}</h2>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="absolute right-0 w-4 h-4 transition duration-300 top-1 stroke-slate-700 shrink-0 group-open:rotate-45"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="1.5"
										aria-labelledby="title-ac01 desc-ac01">
										<title id="title-ac01">Open icon</title>
										<desc id="desc-ac01">
											icon that represents the state of
											the summary
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
						))}
					</div>
					<div className="flex-1 p-4">
						<h2 className="text-2xl font-semibold">Your Notes</h2>
						{dummyNotes.map((note, index) => (
							<div
								key={index}
								className="border-b-2 p-4">
								<h3 className="text-xl font-semibold">
									{note.title}
								</h3>
								<p className="text-slate-500">{note.date}</p>
								<p className="text-slate-500">{note.content}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
