"use client";
import { Navbar } from "@/components/ui/Navbar";
import Load from "@/components/Load";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "@/lib/api";
import Image from "next/image";
import Cookies from "js-cookie";
import { getUserSession } from "@/lib/helperFunctions";
import JournalModal from "./_modal/JournalModal";

import JournalList from "@/components/JournalList";

const StudentJournal = () => {
  const userSession = getUserSession();
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editEntry, setEditEntry] = useState("");
  const [journalEntries, setJournalEntries] = useState([{}]);
  const [highlightEntry, setHighlightEntry] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (Cookies.get("token") === undefined || Cookies.get("token") === null) {
    return <Load route="login" />;
  }

  if (userSession.role !== "student") {
    return <Load role={userSession.role} />;
  }

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
      }
    }
  };

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
        toast.success(
          `Journal entry with ID ${journalId} deleted successfully.`
        );
        fetchEntries();
        setIsEditing(false);
      } else {
        toast.error(`Failed to delete journal entry with ID ${journalId}.`);
      }
    } catch (error) {
      console.error("Error occurred while deleting journal entry:", error);
    }
  };

  const handleEditEntry = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.STUDENT_UPDATE_JOURNAL}${highlightEntry?.journalId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            title: editTitle,
            entry: editEntry,
          }),
        }
      );

      if (response.ok) {
        const updatedEntry = await response.json();
        toast.success("Journal entry updated successfully!");

        // Update the state with the updated entry
        setJournalEntries(
          journalEntries.map((entry) =>
            entry.journalId === updatedEntry.journalId ? updatedEntry : entry
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

  return (
    <div className="w-full flex flex-col justify-center items-center bg-white font-Merriweather">
      <Navbar userType="student" />
      <div className="flex w-full h-screen mt-[104px] px-20 pb-5 lg:flex-row sm:flex-col">
        <div className="flex-1 overflow-y-auto ">
          <JournalList
            entries={journalEntries}
            isEditing={isEditing}
            handleClickedEntry={handleClickedEntry}
            handleDeleteEntry={handleDeleteEntry}
          />
        </div>
        <div className="flex-1 w-full h-[86%] p-16 rounded-2xl shadow-2xl relative md:w-3/4 sm:w-full">
          <div className="w-full h-full overflow-y-auto p-5">
            {isEditing ? (
              <input
                type="text"
                className="text-4xl text-[#6B9080] w-full bg-white border"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <h1 className="text-4xl text-[#6B9080]">
                {highlightEntry?.title}
              </h1>
            )}
            {isEditing ? (
              <textarea
                type="text"
                className="mt-9 text-lg font-light text-black w-full h-full bg-white border"
                value={editEntry}
                onChange={(e) => setEditEntry(e.target.value)}
              ></textarea>
            ) : (
              <p className="mt-9 text-lg font-light text-black">
                {highlightEntry?.entry}
              </p>
            )}
            <Image
              src={"/images/journal-spring.png"}
              height={38}
              width={22}
              className="absolute -left-2 top-12"
              alt="Journal Spring"
            />
            <Image
              src={"/images/journal-spring.png"}
              height={38}
              width={22}
              className="absolute -left-2 bottom-12"
              alt="Journal Spring"
            />
          </div>
          <div className="flex gap-6 items-center justify-end">
            {isEditing ? (
              <>
                <button
                  className="z-10 tooltip tooltip-success"
                  data-tip={`${isEditing ? "Cancel" : "Edit"}`}
                  onClick={() => setIsEditing((prevState) => !prevState)}
                >
                  <Image
                    src={"/images/icons/edit.png"}
                    width={30}
                    height={30}
                    alt="Edit Icon"
                  />
                </button>
                <button
                  className="z-10 tooltip tooltip-success"
                  data-tip="Save Changes"
                  onClick={handleEditEntry}
                >
                  <Image
                    src={"/images/icons/saveEdit.png"}
                    width={30}
                    height={30}
                    alt="Save Changes Icon"
                  />
                </button>
              </>
            ) : (
              <>
                <button
                  className="z-10 tooltip tooltip-success"
                  data-tip="Edit"
                  onClick={() => setIsEditing((prevState) => !prevState)}
                >
                  <Image
                    src={"/images/icons/edit.png"}
                    width={30}
                    height={30}
                    alt="Edit Icon"
                  />
                </button>

                <button
                  className="z-10 tooltip tooltip-success"
                  data-tip="New Entry"
                  onClick={() => setShowModal(true)}
                >
                  <Image
                    src={"/images/icons/addjournal.png"}
                    width={30}
                    height={30}
                    alt="Add Journal Icon"
                  />
                </button>
              </>
            )}
          </div>
        </div>
        {showModal && (
          <JournalModal
            title={title}
            entry={entry}
            setTitle={setTitle}
            setEntry={setEntry}
            setShowModal={setShowModal}
            handleSaveEntry={handleSaveEntry}
          />
        )}
      </div>
    </div>
  );
};

export default StudentJournal;
