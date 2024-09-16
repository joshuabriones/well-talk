"use client";

import { useState, useEffect } from "react";

import { Navbar } from "@/components/ui/Navbar";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";

const ClientJournal = () => {
  const userSession = getUserSession();
  const [students, setStudents] = useState([{}]);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStudents = async () => {
    const response = await fetch(
      `${process.env.BASE_URL}${API_ENDPOINT.GET_ALL_STUDENTS}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSelectedStudent = (studentId) => {
    router.push(`/counselor/clientjournal/${studentId}`);
  };

  const filteredUsers = students.filter((user) =>
    user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full pt-32 px-10 h-screen">
      <Navbar userType="counselor" />
      <h1 className="text-3xl lg:ml-20 md:ml-6 font-Merriweather">
        Client Journal
      </h1>

      <section className="w-3/4 mt-10 mx-auto divide-y font-Jaldi divide-slate-200 rounded border border-slate-200 bg-white">
        <div class="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            class="relative w-full h-12 px-4 transition-all mb-10 border rounded-xl text-slate-500 autofill:bg-white"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute w-6 h-6 cursor-pointer top-3 right-4 stroke-slate-400 peer-disabled:cursor-not-allowed"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            aria-labelledby="title-9 description-9"
            role="graphics-symbol"
          >
            <title id="title-9">Search icon</title>
            <desc id="description-9">Icon description here</desc>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        {filteredUsers.map((student, i) => {
          return (
            <details key={student.id} className="group p-4">
              <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                <div className="flex items-center gap-2">
                  <img
                    src={student.image}
                    alt="profile"
                    className="rounded-md"
                  />
                  <h2 className="text-xl font-medium">
                    {student.firstName + " " + student.lastName} {" · "}
                  </h2>
                  <p className="text-slate-500 text-sm">
                    {student.institutionalEmail}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-labelledby="title-ac21 desc-ac21"
                >
                  <title id="title-ac21">Open icon</title>
                  <desc id="desc-ac21">
                    icon that represents the state of the summary
                  </desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </summary>
              <p className="mt-4 text-slate-500">
                {student.idNumber +
                  " ⸺ " +
                  student.college +
                  " / " +
                  student.program +
                  "-" +
                  student.year}{" "}
              </p>

              <div className="flex justify-end mt-5">
                <button
                  onClick={() => handleSelectedStudent(student.id)}
                  className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-emerald-500 shadow-emerald-200 hover:bg-emerald-600 hover:shadow-sm hover:shadow-emerald-200 focus:bg-emerald-700 focus:shadow-sm focus:shadow-emerald-200 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
                >
                  <span>View notes</span>
                </button>
              </div>
            </details>
          );
        })}
      </section>
    </div>
  );
};

export default ClientJournal;
