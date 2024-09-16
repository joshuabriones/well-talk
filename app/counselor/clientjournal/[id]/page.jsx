"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import Cookies from "js-cookie";
import { API_ENDPOINT } from "@/lib/api";

export default function JournalPage({ params }) {
  const [student, setStudent] = useState({});

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

  useEffect(() => {
    fetchStudent();
  }, []);

  console.log(student);

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
    <div className="w-full pt-32 md:px-10 sm:px-4">
      <Navbar userType="counselor" />
      <div className="w-3/4 mx-auto font-Jaldi">
        <div className="flex gap-5">
          <img
            src={student.image}
            alt="student"
            className="w-36 h-36 rounded-lg"
          />
          <div className="flex w-full justify-between items-center border-b-2">
            <div className="flex flex-col justify-center ">
              <h2 className="text-5xl">
                {student.firstName + " " + student.lastName}
              </h2>
              <p className="text-2xl text-slate-500">
                {student.institutionalEmail}
              </p>
            </div>
            <div className="text-right">
              <div>{student.idNumber}</div>
              <div>
                {student.program} - {student.year}
              </div>
              <div>{student.college}</div>
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-10 w-full">
          <div className="flex-1 p-4">
            <h2 className="text-2xl font-semibold">Shared Journal</h2>
            {dummyJournals.map((journal, index) => (
              <details class="p-4 group">
                <summary class="[&::-webkit-details-marker]:hidden relative pr-8 font-medium list-none cursor-pointer text-slate-700 focus-visible:outline-none transition-colors duration-300 group-hover:text-slate-900 ">
                  <h2 className="text-xl">{journal.title}</h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute right-0 w-4 h-4 transition duration-300 top-1 stroke-slate-700 shrink-0 group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.5"
                    aria-labelledby="title-ac01 desc-ac01"
                  >
                    <title id="title-ac01">Open icon</title>
                    <desc id="desc-ac01">
                      icon that represents the state of the summary
                    </desc>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </summary>
                <p class="mt-4 text-slate-500">
                  <p className="text-slate-500">{journal.date}</p>
                  <p className="text-slate-500">{journal.content}</p>
                </p>
              </details>
            ))}
          </div>
          <div className="flex-1 p-4">
            <h2 className="text-2xl font-semibold">Your Notes</h2>
            {dummyNotes.map((note, index) => (
              <div key={index} className="border-b-2 p-4">
                <h3 className="text-xl font-semibold">{note.title}</h3>
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
