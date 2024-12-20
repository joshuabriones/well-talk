"use client";
import JournalList from "@/components/JournalList";
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import { Navbar } from "@/components/ui/Navbar";
import Toggle from "@/components/ui/toggle/Toggle";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import "@/styles/globals.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import JournalModal from "./_modal/JournalModal";

const StudentJournal = () => {
	const userSession = typeof window !== "undefined" ? getUserSession() : null;

	const [title, setTitle] = useState("");
	const [entry, setEntry] = useState("");
	const [editTitle, setEditTitle] = useState("");
	const [editEntry, setEditEntry] = useState("");
	const [journalEntries, setJournalEntries] = useState([{}]);
	const [highlightEntry, setHighlightEntry] = useState({});
	const [isEditing, setIsEditing] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showEntry, setShowEntry] = useState(false);

	const [isPublic, setIsPublic] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteEntryId, setDeleteEntryId] = useState(null);

	const handleEntryClick = () => {
		setShowEntry(true);
	};

	const fetchEntries = async () => {
		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.GET_JOURNAL_BY_STUDENT_ID}${userSession.id}`,
				{
					headers: {
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				}
			);

			const data = await response.json();
			setJournalEntries(data);

			if (data.length > 0) {
				setHighlightEntry(data[0]);
			} else {
				setHighlightEntry(null);
			}
		} catch (error) {
			toast.error("Error fetching entries");
			throw new Error("Error fetching entries");
		}
	};

	const handleClickedEntry = (journalId) => {
		if (!isEditing) {
			const selectedEntry = journalEntries.find(
				(entry) => entry.journalId === journalId
			);

			if (selectedEntry) {
				setHighlightEntry(selectedEntry);
				setShowEntry(true);
			}
		}
	};

	useEffect(() => {
		setIsPublic(highlightEntry?.isPublic);
	}, [highlightEntry]);

	const handleSaveEntry = async (e) => {
		e.preventDefault();

		try {
			if (!title.trim() || !entry.trim()) {
				alert("Empty fields");
				return;
			}

			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.STUDENT_CREATE_JOURNAL}${userSession.id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
					body: JSON.stringify({
						title: title,
						entry: entry,
						isPublic: isPublic,
					}),
				}
			);
			const data = await response.json();

			if (data) {
				toast.success("Added entry successfully");
				setShowModal(false);
			}

			setTitle("");
			setEntry("");

			fetchEntries();
		} catch (error) {
			toast.error("Failed adding entry");
		}
	};

	const handleDeleteEntry = async (journalId) => {
		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.STUDENT_DELETE_JOURNAL}${journalId}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
				}
			);

			if (response.ok) {
				const deletedEntry = journalEntries.find(
					(entry) => entry.journalId === journalId
				);
				toast.success(
					`Journal entry with title "${deletedEntry.title}" deleted successfully.`
				);
				fetchEntries();
				setIsEditing(false);
				setShowEntry(false);
			} else {
				toast.error(
					`Failed to delete journal entry with title "${deletedEntry.title}".`
				);
			}
		} catch (error) {
			console.error(
				"Error occurred while deleting journal entry:",
				error
			);
		}
	};

	const handleEditEntry = async () => {
		try {
			const response = await fetch(
				`${process.env.BASE_URL}${API_ENDPOINT.STUDENT_UPDATE_JOURNAL}${highlightEntry.journalId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("token")}`,
					},
					body: JSON.stringify({
						title: editTitle,
						entry: editEntry,
						isPublic: isPublic,
					}),
				}
			);

			if (response.ok) {
				const updatedEntry = await response.json();
				toast.success("Journal entry updated successfully!");

				// Update the state with the updated entry
				setJournalEntries(
					journalEntries.map((entry) =>
						entry.journalId === updatedEntry.journalId
							? updatedEntry
							: entry
					)
				);
				setHighlightEntry(updatedEntry);
				setIsEditing(false);
			} else {
				toast.error("Failed to update journal entry!");
			}
		} catch (error) {
			console.error("Error updating journal entry:", error);
			toast.error("Internal Server Error");
		}
	};

	useEffect(() => {
		fetchEntries();
	}, []);

	useEffect(() => {
		setEditTitle(highlightEntry?.title || "");
		setEditEntry(highlightEntry?.entry || "");
	}, [isEditing]);

	const dateFormatter = (date) => {
		const dateObject = new Date(date);
		const options = { year: "numeric", month: "long", day: "numeric" };
		const formattedDate = dateObject.toLocaleDateString("en-US", options);

		return formattedDate;
	};

	const timeFormatter = (time) => {
		const timeObject = new Date(`1970-01-01T${time}`);
		const options = {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true, // Use 12-hour clock with AM/PM
		};
		const formattedTime = timeObject.toLocaleTimeString("en-US", options);

		return formattedTime;
	};

	console.log(highlightEntry);

	return (
		<div className="min-h-screen">
			<Navbar userType="student" />
			<div className="h-screen w-full font-Merriweather">
				<div className="w-full h-full pt-24 pb-14 px-4 md:px-8 lg:px-32 flex flex-col lg:flex-row">
					{/* List */}
					<section className="w-full lg:w-1/3 h-full py-3 px-1 overflow-y-auto relative">
						<button
							className=" tooltip tooltip-success w-full md:w-11/12 lg:w-11/12 mb-4 py-2 rounded-2xl bg-maroon flex items-center justify-center gap-2 relative overflow-y-auto"
							onClick={() => setShowModal(true)} // Assuming setShowModal exists
						>
							{/* Add Icon */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="#FFFFFF"
								className="w-7 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
								/>
							</svg>
							{/* Add Text */}
							<span className="text-white">Add Entry</span>
						</button>

						<JournalList
							entries={journalEntries}
							isEditing={isEditing}
							handleClickedEntry={handleClickedEntry}
							handleDeleteEntry={(journalId) => {
								setDeleteEntryId(journalId);
								setShowDeleteModal(true);
							}}
						/>
					</section>

					{/* Journal Highlight */}
					{showEntry && ( // Render the section only if showEntry is true
						<section className="w-11/12 lg:w-2/3 h-full pt-4 lg:right-0 lg:left-auto md:px-8 transform translate-x-[-5px] ml-2 lg:ml-0 lg:px-16 rounded-2xl lg:border-2 bg-white lg:shadow-2xl absolute lg:relative">
							{/* Buttons */}
							<div className="flex justify-between items-center mb-4">
								{/* Toggle placed on the left side */}
								<div className="w-fit flex flex-col items-start justify-start gap-y-1.5">
									{isEditing && (
										<>
											<Toggle
												isPublic={isPublic}
												setIsPublic={setIsPublic}
											/>
											<div className="font-Jaldi text-s italic text-gray-600">
												Toggle to provide access for
												counselor.
											</div>
										</>
									)}
								</div>

								{/* Button container on the right side */}
								<div className="flex gap-3 mx-4 items-center">
									{isEditing ? (
										<>
											<button
												className="z-10 tooltip tooltip-success text-maroon"
												data-tip={`${
													isEditing
														? "Cancel"
														: "Edit"
												}`}
												onClick={() =>
													setIsEditing(
														(prevState) =>
															!prevState
													)
												}>
												{/* Edit Icon */}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="#8A252C"
													className="w-7 h-7">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
													/>
												</svg>
											</button>

											<button
												className="z-10 tooltip tooltip-success"
												data-tip="Save Changes"
												onClick={handleEditEntry}>
												{/* Save Icon */}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="#8A252C"
													className="w-7 h-7">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
													/>
												</svg>
											</button>
										</>
									) : (
										<>
											<button
												className="z-10 tooltip tooltip-success"
												data-tip="Edit"
												onClick={() =>
													setIsEditing(
														(prevState) =>
															!prevState
													)
												}
												disabled={
													journalEntries.length === 0
												}>
												{/* Edit Icon */}
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="#8A252C"
													className="w-7 h-7">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
													/>
												</svg>
											</button>
											<button
												className="z-10 tooltip tooltip-error"
												data-tip="Close"
												onClick={() =>
													setShowEntry(null)
												}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={2}
													stroke="#8A252C"
													className="w-7 h-7">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M6 18L18 6M6 6l12 12"
													/>
												</svg>
											</button>
										</>
									)}
								</div>
							</div>

							<div className="w-full h-full flex flex-col overflow-y-auto p-5">
								{/* Title Section */}
								<div className="flex-none">
									{isEditing ? (
										<input
											type="text"
											className="text-3xl md:text-4xl lg:text-5xl text-maroon w-full bg-white border"
											value={editTitle}
											onChange={(e) =>
												setEditTitle(e.target.value)
											}
										/>
									) : (
										<h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-maroon">
											{highlightEntry?.title}
										</h1>
									)}
								</div>
								<div className="flex-none mb-8 font-Jaldi text-xs italic text-gray-600">
									{highlightEntry === null ? null : (
										<div>
											Date of Entry:{" "}
											{`${dateFormatter(
												highlightEntry?.dateOfEntry
											)}, ${timeFormatter(
												highlightEntry?.timeOfEntry
											)}`}
										</div>
									)}
								</div>

								{/* Entry Section */}
								<div className="">
									{isEditing ? (
										<div className="">
											<textarea
												type="text"
												className="text-lg text-maroon w-full h-full bg-white border"
												value={editEntry}
												onChange={(e) =>
													setEditEntry(e.target.value)
												}
												rows="8"
												style={{
													whiteSpace: "pre-wrap",
												}}
											/>
										</div>
									) : (
										<div
											className="text-md font-light text-gray"
											style={{ whiteSpace: "pre-wrap" }}>
											{highlightEntry?.entry}
										</div>
									)}
								</div>

								{/* Dates Section */}
							</div>
						</section>
					)}
				</div>

				{showModal && (
					<JournalModal
						setShowModal={setShowModal}
						title={title}
						setTitle={setTitle}
						entry={entry}
						setEntry={setEntry}
						handleSaveEntry={handleSaveEntry}
					/>
				)}
				{showDeleteModal && (
					<ModalDelete
						setDeleteModal={setShowDeleteModal}
						handleDelete={() => {
							handleDeleteEntry(deleteEntryId);
							setShowDeleteModal(false);
						}}
						prompt="delete"
						description="journal entry"
					/>
				)}
			</div>
		</div>
	);
};

export default StudentJournal;
// export default dynamic(() => Promise.resolve(StudentJournal), { ssr: false });
