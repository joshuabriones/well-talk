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
    try {
      // Fetch students from the first endpoint
      const response1 = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_COUNSELOR_ASSIGNED_STUDENTS}${userSession.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const data1 = await response1.json();
  
      if (!response1.ok) {
        throw new Error("Network response was not ok");
      }
  
      // Fetch appointments from the second endpoint
      const response2 = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_APPOINTMENTS_BY_COUNSELORID}${userSession.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const data2 = await response2.json();
  
      if (!response2.ok) {
        throw new Error("Network response was not ok");
      }
  
      const appointmentStudents = data2.map(appointment => appointment.student);
  
      const combinedStudents = [
        ...data1.filter(student => student.role === "student"),
        ...appointmentStudents
      ];
  
      const uniqueStudentsMap = new Map();
      combinedStudents.forEach(student => {
        if (!uniqueStudentsMap.has(student.id)) {
          uniqueStudentsMap.set(student.id, student);
        }
      });
  
      const uniqueStudents = Array.from(uniqueStudentsMap.values());
  
      setStudents(uniqueStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  
  useEffect(() => {
    fetchStudents();
  }, []);


  const handleSelectedStudent = (studentId) => {
    router.push(`/counselor/clientjournal/${studentId}`);
  };

  const handleViewStudentDetails = (studentId) => {
    router.push(`/counselor/clientjournal/s/${studentId}`);
  };

  const filteredUsers = students.filter((user) =>
    user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full pt-32 px-10 h-screen">
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

      <div className="flex flex-col gap-8 w-3/4 mx-auto mt-8">
        <div className="font-Merriweather">
          <h1 className="text-3xl">
            Welcome to your{" "}
            <span className="text-lightMaroon">Counselor's Journal!</span>
          </h1>
          <p className="mt-2 md:pr-12 pr-8">
            This is your central hub for managing and tracking your students'
            progress. Here, you can easily access detailed information about
            each student, view your notes and shared journals, and stay
            organized with your counseling activities.
          </p>
        </div>
        <div className="relative ">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="relative w-full h-12 px-4 transition-all mb-10 border-2 rounded-xl text-slate-500 autofill:bg-white focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute w-6 h-6 cursor-pointer top-3 right-4 stroke-maroon peer-disabled:cursor-not-allowed"
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
      </div>

      <section className="w-3/4 mx-auto divide-y font-Jaldi divide-slate-200 rounded border-2 border-slate-200 bg-white">
        {filteredUsers.length < 0 ? (
          <p className="text-slate-500 text-center">No students to show</p>
        ) : (
          <>
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

                  <div className="flex justify-end mt-5 gap-2">
                    <button
                      onClick={() => handleSelectedStudent(student.id)}
                      className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-maroon shadow-gold disabled:cursor-not-allowed disabled:border-maroon disabled:bg-white disabled:text-maroon disabled:shadow-none"
                    >
                      <span>View notes</span>
                    </button>
                    <button
                      onClick={() => handleViewStudentDetails(student.id)}
                      className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded shadow-md focus-visible:outline-none whitespace-nowrap bg-maroon shadow-gold disabled:cursor-not-allowed disabled:border-maroon disabled:bg-white disabled:text-maroon disabled:shadow-none"
                    >
                      <span>View Student Details</span>
                    </button>
                  </div>
                </details>
              );
            })}
          </>
        )}
      </section>
    </div>
  );
};

export default ClientJournal;
