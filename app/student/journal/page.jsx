"use client";
import { Navbar } from "@/components/ui/Navbar";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { getUserSession } from "@/lib/helperFunctions";

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

  if (Cookies.get("token") === undefined) {
    router.push("/login");
  }

  if (userSession.role !== "student") {
    return <Load role={userSession.role} />;
  }

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/users/student/viewallentries");
      const data = await response.json();
      const myEntries = data.filter(
        (item) => item.userId === parseInt(session?.user.id)
      );
      setJournalEntries(myEntries);

      if (highlightEntry) {
        const updatedHighlightEntry = myEntries.find(
          (entry) => entry.journalId === highlightEntry.journalId
        );
        if (updatedHighlightEntry) {
          setHighlightEntry(updatedHighlightEntry);
        } else {
          setHighlightEntry(null);
        }
      }
    } catch (error) {
      console.log("Error fetching entries");
    }
  };

  useEffect(() => {
    setEditTitle(highlightEntry?.title);
    setEditEntry(highlightEntry?.entry);
  }, [isEditing]);

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

      const response = await fetch("/api/users/student/addentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: parseInt(session?.user?.id),
          title: title,
          entry: entry,
        }),
      });
      const data = await response.json();

      if (data) {
        toast.success("Added entry successfully");
        document.getElementById("new-entry").close();
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
        `/api/users/student/deleteentry/${journalId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success(
          `Journal entry with ID ${journalId} deleted successfully.`
        );
        fetchEntries();
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
        `/api/users/student/updateentry/${highlightEntry.journalId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    fetchEntries();

    if (!highlightEntry) setHighlightEntry(journalEntries[0]);
  }, [session?.user]);

  console.log(journalEntries[0]);

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

  return (
    <div className="w-full flex flex-col justify-center items-center bg-white font-Merriweather">
      <Navbar userType="student" />
      <div className="flex w-[90%] h-screen mt-[104px]">
        <div className="w-1/2 overflow-y-auto ">
          <JournalList
            entries={journalEntries}
            isEditing={isEditing}
            handleClickedEntry={handleClickedEntry}
            handleDeleteEntry={handleDeleteEntry}
          />
        </div>
        <div className="w-1/2 h-[86%] p-16 rounded-2xl shadow-xl relative">
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
            />
            <Image
              src={"/images/journal-spring.png"}
              height={38}
              width={22}
              className="absolute -left-2 bottom-12"
            />
          </div>
          <div className="flex gap-6 items-center justify-end">
            {isEditing && (
              <>
                <button
                  className="z-10 tooltip tooltip-accent"
                  data-tip="Save Changes"
                  onClick={handleEditEntry}
                >
                  <Image
                    src={"/images/icons/saveEdit.png"}
                    width={30}
                    height={30}
                  />
                </button>
                <button className="btn btn-outline" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </>
            )}
            {!isEditing && (
              <>
                <button
                  className="z-10 tooltip tooltip-accent"
                  data-tip="Edit"
                  onClick={() => setIsEditing((prevState) => !prevState)}
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
              </>
            )}

            <dialog id="new-entry" className="modal">
              <div className="modal-box w-1/3 bg-white max-w-4xl flex flex-col">
                <h3 className="p-5 border-b-2 font-light text-black text-2xl text-center">
                  Create new entry
                </h3>
                <input
                  type="text"
                  placeholder="Journal title..."
                  className="input input-bordered input-md w-full max-w-4xl bg-white mt-10"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder="Share your thoughts..."
                  className="textarea textarea-bordered textarea-md w-full max-w-4xl bg-white mt-5"
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                ></textarea>

                <div className="modal-action mt-10">
                  <form method="dialog" className="flex gap-2">
                    {/* if there is a button, it will close the modal */}
                    <button className="btn btn-outline">Cancel</button>
                    <button className="btn" onClick={handleSaveEntry}>
                      Save
                    </button>
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
