"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import Cookies from "js-cookie";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";

const StudentDetailsPage = ({ params }) => {
  const userSession = getUserSession();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.GET_STUDENT_BY_ID}${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStudent(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <div className="w-full pt-20 px-10 h-screen bg-gray-100">
      <Navbar userType="counselor" />
      {/* <div className=" bg-white shadow-lg rounded-lg p-6 mt-14"> */}
      <div className="max-w-4xl mx-auto mt-14 gallery fixed-size border-2 border-gray-400 rounded-xl bg-gray-100 shadow-lg overflow-hidden">
        <div className="window-bar border-b-2 text-gray px-4 py-4 flex justify-between items-center rounded-t-xl">
          <div className="window-title font-bold">Student Details</div>
          <div className="window-controls flex space-x-2">
            <div className="w-4 h-4 border-2 bg-yellow-400 rounded-full"></div>
            <div className="w-4 h-4 border-2 bg-green-400 rounded-full"></div>
            <div className="w-4 h-4 border-2 bg-red-400 rounded-full"></div>
          </div>
        </div>
        {loading ? (
          <div className="text-center text-lightMaroon">Loading...</div>
        ) : (
          <div className="flex flex-col gap-5 bg-gold p-5">
            <div className="flex items-center space-x-6 bg-gold">
              <img
                className="w-24 h-24 rounded-full"
                src={student?.image}
                alt={`${student?.firstName} ${student?.lastName}`}
              />
              <div>
                <h1 className="text-3xl font-bold text-lightMaroon">
                  {student?.firstName} {student?.lastName}
                </h1>
                <p className="text-sm text-gray-600">
                  {student?.institutionalEmail}
                </p>
                <p className="text-sm text-gray-600">ID: {student?.idNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 bg-gold">
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-3">
                  Personal Information
                </h2>
                <ul className="text-gray-600">
                  <li>
                    <strong>Gender:</strong> {student?.gender}
                  </li>
                  <li>
                    <strong>Birth Date:</strong> {student?.birthDate}
                  </li>
                  <li>
                    <strong>Current Address:</strong> {student?.currentAddress}
                  </li>
                  <li>
                    <strong>Permanent Address:</strong>{" "}
                    {student?.permanentAddress}
                  </li>
                  <li>
                    <strong>Contact Number:</strong> {student?.contactNumber}
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-3">
                  Academic Information
                </h2>
                <ul className="text-gray-600">
                  <li>
                    <strong>College:</strong> {student?.college}
                  </li>
                  <li>
                    <strong>Program:</strong> {student?.program}
                  </li>
                  <li>
                    <strong>Year Level:</strong> {student?.year}
                  </li>
                  <li>
                    <strong>Verified:</strong>{" "}
                    {student?.isVerified ? "Yes" : "No"}
                  </li>
                  <li>
                    <strong>Date Joined:</strong>{" "}
                    {new Date(student?.dateOfCreation).toLocaleDateString()}
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-3">
                  Guardian Information
                </h2>
                <ul className="text-gray-600">
                  <li>
                    <strong>Name:</strong> {student?.parentGuardianName}
                  </li>
                  <li>
                    <strong>Relationship:</strong>{" "}
                    {student?.guardianRelationship}
                  </li>
                  <li>
                    <strong>Contact Number:</strong>{" "}
                    {student?.parentGuardianContactNumber}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetailsPage;
