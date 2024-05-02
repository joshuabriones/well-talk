"use client";
import { Navbar } from "@/components/ui/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import JournalList from "@/components/JournalList";

const StudentJournal = () => {
	const { data: session, status } = useSession();
	const [journalData, setJournalData] = useState({
		title: "",
		entry: "",
	});
	const [isEditing, setIsEditing] = useState(false);

	// const router = useRouter();

	// if (status === "unauthenticated") router.push("/login");

	// if (status === "loading" || !session) {
	//   return <div>Loading...</div>;
	// }

	// if (session?.user?.role !== "student") {
	//   router.push("/login");
	//   return null;
	// }

	// PLEASE ILISI LANG NI SA FETCHED DATA FROM DATABASE
	const dummyData = [
		{
			title: "First Entry",
			entry: "Lorem ipsum dolor sit amet. Aut pariatur dolores eum quod dolores est molestias earum. Qui quasi Quis sit voluptas accusamus id iure sequi. Nam maiores explicabo cum sunt sint sed officiis voluptatum ut galisum cupiditate ea sint...",
			date: "July 2nd, 2022",
		},
		{
			title: "Second Entry",
			entry: "Lorem ipsum dolor sit amet. Aut pariatur dolores eum quod dolores est molestias earum. Qui quasi Quis sit voluptas accusamus id iure sequi. Nam maiores explicabo cum sunt sint sed officiis voluptatum ut galisum cupiditate ea sint...",
			date: "July 2nd, 2022",
		},
		{
			title: "Third Entry",
			entry: "Lorem ipsum dolor sit amet. Aut pariatur dolores eum quod dolores est molestias earum. Qui quasi Quis sit voluptas accusamus id iure sequi. Nam maiores explicabo cum sunt sint sed officiis voluptatum ut galisum cupiditate ea sint...",
			date: "July 2nd, 2022",
		},
		{
			title: "Fourth Entry",
			entry: "Lorem ipsum dolor sit amet. Aut pariatur dolores eum quod dolores est molestias earum. Qui quasi Quis sit voluptas accusamus id iure sequi. Nam maiores explicabo cum sunt sint sed officiis voluptatum ut galisum cupiditate ea sint...",
			date: "July 2nd, 2022",
		},
	];

	const currentClickedEntry = {
		title: "First Entry",
		entry: "Lorem ipsum dolor sit amet. Aut pariatur dolores eum quod dolores est molestias earum. Qui quasi Quis sit voluptas accusamus id iure sequi. Nam maiores explicabo cum sunt sint sed officiis voluptatum ut galisum cupiditate ea sint.Aut nemo rerum et inventore labore vel corporis voluptas in consequuntur voluptas. Et saepe voluptate sed commodi magni qui voluptatem delectus et odio dolor aut soluta molestiae. Aut pariatur expedita quo reprehenderit similique qui placeat itaque. Qui consequatur cupiditate ut galisum maxime non consectetur mollitia et quia consequuntur ksdkd eprehenderit similique qui placeat itaque. Qui consequatur cupiditate ut galisum maxime non consectetur mollitia et quia consequuntur ksdkdll eprehenderit similique qui placeat itaque. Qui consequatur cupiditate ut galisum maxime non consectetur mollitia et quia consequuntur ksdkdl  ",
		date: "July 2nd, 2022",
	};

	return (
		<div className="w-full flex flex-col justify-center items-center bg-white font-Merriweather">
			<Navbar userType="student" />
			<div className="flex w-[90%] h-screen mt-[104px]">
				<div className="w-1/2 overflow-y-auto ">
					<JournalList entries={dummyData} isEditing={isEditing} />
				</div>
				<div className="w-1/2 h-[86%] p-16 rounded-2xl shadow-xl relative">
					<div className="w-full h-full overflow-y-auto p-5">
						<h1 className="text-4xl text-[#6B9080]">
							{currentClickedEntry.title}
						</h1>
						<p className="mt-9 tet-lg font-light text-black">
							{currentClickedEntry.entry}
						</p>
						<Image
							src={"/images/line.png"}
							layout="fill"
							className="absolute"
						/>
					</div>
					<div className="flex gap-6 items-center justify-end">
						<button
							className="z-10 tooltip tooltip-accent"
							data-tip="Edit"
							onClick={() =>
								setIsEditing((prevState) => !prevState)
							}
						>
							<Image
								src={"/images/icons/edit.png"}
								width={30}
								height={30}
							/>
						</button>
						<button
							className="z-10 tooltip tooltip-accent"
							data-tip="New Entry"
							onClick={() =>
								document.getElementById("new-entry").showModal()
							}
						>
							<Image
								src={"/images/icons/addjournal.png"}
								width={30}
								height={30}
							/>
						</button>
						<dialog id="new-entry" className="modal">
							<div className="modal-box w-1/3 bg-white max-w-4xl flex flex-col">
								<h3 className="p-5 border-b-2 font-light text-black text-2xl text-center">
									Create new entry
								</h3>
								<input
									type="text"
									placeholder="Journal title..."
									className="input input-bordered input-md w-full max-w-4xl bg-white mt-10"
								/>
								<textarea
									placeholder="Share your thoughts..."
									className="textarea textarea-bordered textarea-md w-full max-w-4xl bg-white mt-5"
								></textarea>

								<div className="modal-action mt-10">
									<form
										method="dialog"
										className="flex gap-2"
									>
										{/* if there is a button, it will close the modal */}
										<button className="btn btn-outline">
											Cancel
										</button>
										<button className="btn">Save</button>
									</form>
								</div>
							</div>
						</dialog>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentJournal;
