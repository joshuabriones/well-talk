import { Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import AppointmentModal from "../ui/calendar/AppointmentModal";

const AppointmentsRow = ({
  appointment,
  onDelete,
  openModal,
  setOpenModal,
  handleApproveAppointment,
}) => {
  const handleDelete = () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this appointment?`
    );
    if (isConfirmed) {
      onDelete(appointment.appointmentId);
    }
  };

  const roleColor = () => {
    switch (appointment.appointmentStatus) {
      case "Done":
        return "text-green-600 bg-green-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      case "Pending":
        return "text-orange-600 bg-orange-100";
      case "Approved":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-slate-500";
    }
  };

  return (
    <tr className="border-b">
      <td className="py-4 text-center">
        {formatDate(appointment.appointmentDate)}
      </td>
      <td>{appointment.appointmentStartTime}</td>
      <td>{appointment.appointmentPurpose}</td>
      <td className="py-4 text-center">
        <span className={`${roleColor()} font-bold p-2 rounded-lg`}>
          {appointment.appointmentStatus}
        </span>
      </td>
      <td className="py-4 text-center">{appointment.student.firstName}</td>
      <td className="py-4 text-center">
        <span className="hover:bg-red-200 p-2 rounded-md cursor-pointer">
          <button onClick={handleDelete}>
            <DeleteIcon sx={{ color: "red" }} />
          </button>
        </span>
        <span className="hover:bg-blue-200 p-2 rounded-md cursor-pointer">
          <button onClick={() => setOpenModal(true)}>
            <BorderColorIcon sx={{ color: "blue" }} />
          </button>
        </span>
      </td>
      {openModal && (
        <AppointmentModal
          setOpenModal={setOpenModal}
          openModal={openModal}
          appointmentID={appointment.appointmentId}
          handleApproveAppointment={handleApproveAppointment}
        />
      )}
    </tr>
  );
};

export default AppointmentsRow;

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
