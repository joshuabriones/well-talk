"use client";
import Image from "next/image";
import { formatDate } from "@/lib/helperFunctions";

const JournalList = ({
  entries,
  isEditing,
  handleClickedEntry,
  handleDeleteEntry,
}) => {
  return (
    <div className="w-[500px] ">
      {entries.map((entry, i) => (
        <div
          key={entry.journalId}
          className={`w-full p-8 rounded-2xl shadow-md border-r-[#6B9080] border-r-8 mb-10 relative text-black cursor-pointer`}
          onClick={() => handleClickedEntry(entry.journalId)}
        >
          <h2 className="text-2xl mb-1 text-black">{entry.title}</h2>
          <p className="font-light text-xs mb-6 text-slate-400">
            {formatDate(entry.dateOfEntry)}
          </p>
          <p className="font-light text-s">
            {entry?.entry?.split(" ").length > 26
              ? entry?.entry?.split(" ").slice(0, 26).join(" ") + "..."
              : entry?.entry}
          </p>
          <Image
            src={"/images/journal-spring.png"}
            height={38}
            width={22}
            className="absolute left-0 top-12"
          />
          {isEditing && (
            <button
              className="absolute right-4 bottom-4"
              onClick={() => handleDeleteEntry(entry.journalId)}
            >
              <Image src={"/images/icons/delete.png"} width={28} height={28} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default JournalList;
