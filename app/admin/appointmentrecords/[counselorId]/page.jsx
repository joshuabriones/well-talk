"use client";

import { useState, useEffect } from "react";

import Header from "../../_admincomponents/Header";
import { getUserSession } from "@/lib/helperFunctions";
import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";

const CounselorDetails = ({ params }) => {
  const userSession = getUserSession();

  const [counselor, setCounselor] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [assignedStudents, setAssignedStudents] = useState([]);

  const fetchCounselor = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_COUNSELOR_BY_ID}${params.counselorId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const data = await response.json();
      setCounselor(data);
    } catch (error) {
      console.error("Error fetching counselor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAssignedStudents = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_COUNSELOR_ASSIGNED_STUDENTS}${params.counselorId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const data = await response.json();
      setAssignedStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchCounselor();
    fetchAssignedStudents();
  }, []);

  return (
    <div className="min-h-screen flex-1">
      <Header title="Counselor Details" />

      {isLoading ? (
        <div className="text-navgray flex items-center justify-center gap-3">
          Loading
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <>
          <section className="flex flex-col items-center md:flex-row gap-5 text-white px-4">
            <img
              src={counselor.image}
              alt="counselor profile"
              className="w-36 h-36 rounded-lg mx-auto md:mx-0"
            />
            <div className="w-full flex flex-col md:flex-row justify-between items-start pb-2 border-b-2">
              <div className="flex flex-col justify-center mb-4 md:mt-5 lg:mt-5 md:mb-0 ">
                <h2 className="text-2xl md:text-4xl text-gold">
                  {counselor.firstName} {counselor.lastName}
                </h2>
                <p className="text-lg md:text-xl text-slate-300">
                  {counselor.institutionalEmail}
                </p>

                <p className="mt-2">
                  <span className="text-gold">Department:</span>{" "}
                  {counselor.college}
                </p>
                <p>
                  <span className="text-gold">Program/s:</span>{" "}
                  {counselor.program}
                </p>
                <p>
                  <span className="text-gold">Assigned Year/s:</span>{" "}
                  {counselor.assignedYear}
                </p>
              </div>
              <div className="text-right flex flex-col items-start md:items-end w-full mt-0 md:mt-5 lg:mt-5 md:w-1/3">
                <p>
                  <span className="text-gold">ID:</span> {counselor.idNumber}
                </p>
                <p>
                  <span className="text-gold">Joined:</span>{" "}
                  {new Date(counselor.dateOfCreation).toLocaleDateString()}
                </p>
              </div>
            </div>
          </section>

          <section className="px-4 pt-10">
            <h2 className="font-medium text-xl text-white mb-6">
              Students Assigned
            </h2>
            <div>
              {assignedStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex md:flex-row xs:flex-col items-center justify-between bg-transparent border border-white px-4 py-2 rounded-lg mt-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={student.image}
                      alt="student profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg text-gold">
                        {student.firstName} {student.lastName}
                      </h3>
                      <p className="text-sm text-slate-300">
                        {student.institutionalEmail}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-center md:text-right mt-2 md:mt-0 text-sm text-slate-300">
                      {student.college}
                    </p>
                    <p className="text-sm text-slate-300">
                      {student.program} - {student.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default CounselorDetails;
