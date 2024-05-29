import { useEffect, useState } from "react";

import FullButton from "@/components/ui/buttons/FullButton";
import iconDelete from "@/public/images/icons/iconDelete.png";
import { useSession } from "next-auth/react";

import StudentHistory from "@/components/ui/modals/counselor/appointments/StudentHistory";

import "@/styles/counselor.css";
import Cookies from "js-cookie";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";

const ModalAppointmentInfo = ({
  setAppointmentModal,
  selectedID,
  appointments,
  setAppointments,
  fetchAppointments,
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const [appointment, setAppointment] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const userSession = getUserSession();

  const [studentHistoryModal, setStudentHistoryModal] = useState(false);

  const [sampleHistory, setSampleHistory] = useState([
    {
      date: "May 18, 2024 11:00 AM",
      reason: "Consultation for Grades",
      status: "Approved",
    },
    {
      date: "May 18, 2024 11:00 AM",
      reason: "Consultation for Grades",
      status: "Approved",
    },
    {
      date: "May 18, 2024 11:00 AM",
      reason: "Consultation for Grades",
      status: "Approved",
    },
  ]);

  // for dialog
  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  console.log(appointments);
  // find appointments
  useEffect(() => {
    const handleFindAppointment = () => {
      const foundAppointment = appointments.find(
        (appointment) => appointment.appointmentId === selectedID
      );
      setAppointment(foundAppointment);
    };

    handleFindAppointment();
  }, [selectedID, appointments]);

  const formatDate = (date) => {
    const dateObject = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return dateObject.toLocaleDateString("en-US", options);
  };

  // handle response
  const handleResponse = () => {
    console.log(response);

    // logic to update appointment response, mollaeyo

    // set appointment.status to "Responded", "Pending", "Appointed"
  };

  const handleAcceptAppointment = async () => {
    try {
      const response = await fetch(
        "/api/appointment/mark-appointment-as-approved",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appointmentId: selectedID,
            counselorId: session.user.id,
          }),
        }
      );
    } catch (error) {
      console.error(error);
    }
    alert("Appointment accepted!");
    setAppointmentModal(false);
  };

  const handleDone = async () => {
    if (notes.trim() === "" || additionalNotes.trim() === "") {
      alert("Please fill out all fields");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.SET_APPOINTMENT_DONE}${selectedID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            appointmentNotes: notes,
            appointmentAdditionalNotes: additionalNotes,
          }),
        }
      );

      if (response.ok) {
        alert("Appointment status updated!");
        await fetchAppointments();
      }
    } catch (error) {
      console.error(error);
    }
    setOpenModal(false);
  };

  return (
    <>
      <input
        type="checkbox"
        id="my_modal_7"
        className="modal-toggle"
        checked={isChecked}
        onChange={toggleChecked}
      />
      <div className="modal" role="dialog">
        <div className="modal-box p-9 text-left max-w-2xl max-h-fit">
          <img
            src={iconDelete.src} // change to setter avatar
            alt="setter avatar"
            className="w-24 h-24 flex justify-center mx-auto"
          />

          <table className="my-4">
            <tbody>
              <tr>
                <th>ID Number:</th>
                <td>{appointment ? appointment.student?.id : ""}</td>
              </tr>
              <tr>
                <th>Name:</th>
                <td>
                  {appointment
                    ? `${appointment.student?.firstName} ${appointment.student?.lastName}`
                    : ""}
                </td>
              </tr>
              <tr>
                <th>Purpose:</th>
                <td>{appointment ? appointment.appointmentPurpose : ""}</td>
              </tr>
              <tr>
                <th>Addtional Notes:</th>
                <td>{appointment ? appointment.appointmentNotes : ""}</td>
              </tr>
              <tr>
                <th>Date:</th>
                <td>
                  {appointment ? formatDate(appointment.appointmentDate) : ""}
                </td>
              </tr>
              <tr>
                <th>Time:</th>
                <td>
                  {appointment ? `${appointment.appointmentStartTime}` : ""}
                </td>
              </tr>
              <tr>
                <th>Status:</th>
                <td
                  className={`w-24 h-5 badge badge-xs ${
                    appointment && appointment.appointmentStatus === "Pending"
                      ? "badge-warning"
                      : appointment && appointment.appointmentStatus === "Done"
                      ? "badge-success"
                      : appointment &&
                        appointment.appointmentStatus === "Assigned"
                      ? "badge-info"
                      : ""
                  }`}
                  style={{ width: "30%" }}
                >
                  {appointment ? `${appointment.appointmentStatus}` : ""}
                </td>
              </tr>
            </tbody>
          </table>

          <section
            className="text-sm italic font-Jaldi hover:text-[#6B9080] cursor-pointer"
            onClick={() => setStudentHistoryModal(true)}
          >
            See student's appointment history...
          </section>

          <div className="flex flex-row gap-x-4 mt-6 px-14">
            <FullButton onClick={() => setOpenModal(true)}>
              Update Status
            </FullButton>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="my_modal_7"
          onClick={() => setAppointmentModal(false)}
        >
          Close
        </label>

        {/* ------------------------------------------------------------ */}
        {openModal && (
          <div className="w-2/5 h-2/3 absolute bg-white rounded-2xl flex flex-col p-16 justify-between dark:bg-slate-950">
            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-5xl">
              ⭐️ ⭐️ ⭐️ ⭐️ ⭐️
            </span>

            <div>
              <h1 className="font-bold text-slate-700 text-2xl mb-1">
                Give feedback
              </h1>
              <p className="text-slate-500">
                Share your invaluable feedback and provide any additional notes
                you deem necessary. Your insights are crucial in our continuous
                effort to enhance our services and better support those in need.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <textarea
                className="textarea textarea-lg textarea-accent"
                placeholder="Share your feedback here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
              <textarea
                className="textarea textarea-lg textarea-accent"
                placeholder="Additional notes..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
              ></textarea>
            </div>
            <button
              className="w-1/3 p-2 bg-green-500 text-black dark:text-white rounded-lg self-end"
              onClick={handleDone}
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {studentHistoryModal && (
        <div>
          <StudentHistory
            onOpen={setStudentHistoryModal}
            details={sampleHistory}
          ></StudentHistory>
        </div>
      )}
    </>
  );
};

export default ModalAppointmentInfo;
