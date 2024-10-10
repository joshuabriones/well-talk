import { useEffect, useState } from "react";

import FullButton from "@/components/ui/buttons/FullButton";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import "@/styles/counselor.css";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const ModalAppointmentInfo = ({
  setAppointmentModal,
  selectedID,
  appointments,
  setAppointments,
  fetchAppointments,
  role,
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const [appointment, setAppointment] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const userSession = getUserSession();
  const [isLoading, setIsLoading] = useState(false);

  // for dialog
  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

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

  const handleDone = async () => {
    if (notes.trim() === "" || additionalNotes.trim() === "") {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      setIsLoading(true);
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
        toast.success("Appointment status updated!");
        setIsLoading(false);
        await fetchAppointments();
      } else {
        toast.error("Failed to update appointment status");
      }
    } catch (error) {
      console.error(error);
    }
    setOpenModal(false);
  };

  const handleModalClose = () => {
    setIsChecked(false); // Close the modal
    setAppointmentModal(false); // Close the parent modal
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
          <label
            className="fixed top-0 left-0 w-full p-8 h-full bg-black bg-opacity-50 z-0 flex items-center justify-center"
            htmlFor="my_modal_7"
            onClick={handleModalClose}
          >
            Close
          </label>
          <div className="bg-white dark:bg-slate-800 shadow-xl border border-gray border-2 rounded-xl hover:-translate-y-1 duration-500 w-full lg:w-3/12 p-2 lg:p-4 relative">
            <section className="items-center md:gap-4 mb-8 justify-center w-full">
              <div className="w-full flex justify-center avatar absolute -top-16 md:-top-24">
                <div className="w-32 md:w-40 rounded-full ring ring-maroon ring-offset-base-100 ring-offset-1">
                  <img
                    src={appointment?.student?.image}
                    alt="appointee avatar"
                  />
                </div>
              </div>

              <div className="flex justify-center flex-col gap-y-2 px-12 ">
                <table className="mb-4 mt-20 w-full ml-8">
                  <tbody>
                    {/* <tr>
        <th>ID Number:</th>
        <td>
          {appointment ? appointment.student?.id : ""}
        </td>
      </tr> */}
                    <tr className="py-4">
                      <th className="text-left py-2 pr-4">Name:</th>
                      <td className="py-2">
                        {appointment
                          ? `${appointment.student?.firstName} ${appointment.student?.lastName}`
                          : ""}
                      </td>
                    </tr>
                    <tr className="py-4">
                      <th className="text-left py-2 pr-4">Purpose:</th>
                      <td className="py-2">
                        {appointment ? appointment.appointmentPurpose : ""}
                      </td>
                    </tr>
                    <tr className="py-4">
                      <th className="text-left py-2 pr-4">Feedback:</th>
                      <td className="py-2">
                        {appointment ? appointment.appointmentNotes : ""}
                      </td>
                    </tr>
                    <tr className="py-4">
                      <th className="text-left py-2 pr-4">Date:</th>
                      <td className="py-2">
                        {appointment
                          ? formatDate(appointment.appointmentDate)
                          : ""}
                      </td>
                    </tr>
                    <tr className="py-4">
                      <th className="text-left py-2 pr-4">Time:</th>
                      <td className="py-2">
                        {appointment
                          ? `${appointment.appointmentStartTime}`
                          : ""}
                      </td>
                    </tr>
                    <tr className="py-4">
                      <th className="text-left py-2 pr-4">Status:</th>
                      <td className="py-2">
                        <div className="w-28 h-6 rounded-lg border border-black flex items-center justify-center">
                          {appointment &&
                            appointment.appointmentStatus === "Pending" &&
                            "🟡"}
                          {appointment &&
                            appointment.appointmentStatus === "Done" &&
                            "🟢"}
                          {appointment &&
                            appointment.appointmentStatus === "Assigned" &&
                            "🔵"}
                          <span className="ml-2 font-bold text-sm">
                            {appointment ? appointment.appointmentStatus : ""}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {role === "counselor" && (
                <div className="flex gap-x-4 gap-y-4 mt-3 px-10">
                  <FullButton onClick={() => setOpenModal(true)}>
                    Update Status
                  </FullButton>
                </div>
              )}
            </section>
          </div>
        </div>

        {openModal && (
          <div className="font-Merriweather fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-slate-950 rounded-2xl flex flex-col lg:gap-6 xs:gap-4 p-16 md:w-1/2 xs:w-4/5 h-2/3 relative">
              <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 lg:text-4xl md:text-3xl xs:text-2xl">
                ⭐️ ⭐️ ⭐️ ⭐️ ⭐️
              </span>

              <div>
                <h1 className="font-bold text-slate-700 text-2xl mb-1">
                  Give feedback
                </h1>
                <p className="text-slate-500 md:text-base xs:text-sm font-Jaldi">
                  Share your invaluable feedback and provide any additional
                  notes you deem necessary.
                </p>
              </div>

              <div className="flex flex-col gap-6 overflow-y-scroll">
                <textarea
                  className="textarea textarea-lg textarea-accent lg:text-lg md:text-base xs:text-xs"
                  placeholder="Share your feedback here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
                <textarea
                  className="textarea textarea-lg textarea-accent lg:text-lg md:text-base xs:text-xs"
                  placeholder="Additional notes..."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  rows="8"
                ></textarea>
              </div>
              <FullButton onClick={handleDone}>
                {isLoading ? (
                  <span className="flex gap-2 items-center justify-center">
                    Submitting <img src="/images/loading.svg" />
                  </span>
                ) : (
                  "Submit"
                )}
              </FullButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ModalAppointmentInfo;
