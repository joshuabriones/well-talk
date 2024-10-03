"use client";

import hdrAppointment from "@/public/images/headers/hdrAppointment.png";
import { useState, useEffect } from "react";

// css
import "@/styles/counselor.css";

// modals
import ModalDelete from "@/components/ui/modals/counselor/inquiries/ModalDelete";
import ModalAppointmentInfo from "@/components/ui/modals/counselor/appointments/ModalAppointmentInfo";
import { Navbar } from "@/components/ui/Navbar";

export default function Appointment() {
  const StudentsPerPage = 10;

  const [selectedID, setSelectedID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [studentModal, setStudentModal] = useState(null);

  // student sample data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      idNumber: "123456789",
      program: "Computer Science",
      year: "4th Year",
      contactNo: "123-456-7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      idNumber: "987654321",
      program: "Engineering",
      year: "3rd Year",
      contactNo: "987-654-3210",
    },
    // Add more student data here as needed
  ]);

  const handleRowClick = (id) => {
    setSelectedID(id);
    setStudentModal(true);
  };

  const showDeleteModal = (id) => {
    setSelectedID(id);
    setDeleteModal(true);
  };

  const handleDelete = () => {
    // Find
    const selected = students.find((student) => student.id === selectedID);

    // Delete
    const newStudents = students.filter((student) => student.id !== selectedID);
    setStudents(newStudents);

    // Reset
    setDeleteModal(false);
    setSelectedID(null);
  };

  // handle reschedule // TO BE ADDED AFTER CALENDAR IMPLEMENTATION
  // const handleReschedule = () => {
  // 	// Find
  // 	const selected = appointments.find(
  // 		(appointment) => appointment.id === selectedID
  // 	);

  // Calculate the index range of appointment to display for the current page
  const indexOfLastInquiry = currentPage * StudentsPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - StudentsPerPage;
  const currentStudents = students?.slice(
    indexOfFirstInquiry,
    indexOfLastInquiry
  );

  return (
    <div className="min-h-screen w-full">
      {/* navigation bar */}
      <Navbar userType="counselor" />
    </div>
  );
}
