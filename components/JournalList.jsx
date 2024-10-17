"use client";
import { formatDate } from "@/lib/helperFunctions";
import Image from "next/image";
// import ReactHtmlParser from 'react-html-parser';
import parse from "html-react-parser";

const JournalList = ({
	entries,
	isEditing,
	handleClickedEntry,
	handleDeleteEntry,
}) => {
	return (
		<div className="flex flex-col-reverse gap-y-6 lg:w-11/12 md:w-3/4 sm:w-full ">
			{entries.map((entry, i) => (
				<div
					key={i}
					className={`w-full p-8 pl-10 border-2 rounded-2xl shadow-lg border-r-maroon border-r-8 relative text-black ${
						!isEditing && "cursor-pointer"
					}`}
					onClick={() => handleClickedEntry(entry.journalId)}
					style={{ overflow: "hidden", wordWrap: "break-word" }}>
					<h1 className="text-xl mb-1 text-black">{entry.title}</h1>
					<h2 className="font-light text-xs mb-6 text-slate-400">
						{formatDate(entry.dateOfEntry)}
					</h2>
					<div className="font-light text-s">
						{entry?.entry?.split(" ").length > 12
							? parse(
									entry?.entry
										?.split(" ")
										.slice(0, 12)
										.join(" ") + "..."
							  )
							: parse(entry?.entry || "")}
					</div>
					<Image
						src={"/images/journal-spring.png"}
						height={38}
						width={22}
						className="absolute left-0 top-12"
						alt="Journal Spring"
					/>
					{isEditing && (
						<button
							className="absolute right-4 bottom-4"
							onClick={() => handleDeleteEntry(entry.journalId)}>
							<Image
								src={"/images/icons/delete.png"}
								width={28}
								height={28}
								alt="Delete icon"
							/>
						</button>
					)}
				</div>
			))}
		</div>
	);
};

export default JournalList;
