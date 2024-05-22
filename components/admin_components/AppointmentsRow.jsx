import { Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AppointmentsRow = ({ appointment, onDelete }) => {
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
      case "Completed":
        return "text-green-600 bg-green-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      case "Scheduled":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-slate-500";
    }
  };

  return (
    <tr className="border-b">
      <td className="flex gap-3 items-center pl-8 py-4">
        {appointment.appointmentDate}
      </td>
      <td>{appointment.appointmentPurpose}</td>
      <td>
        <span className={`${roleColor()} font-bold p-2 rounded-lg`}>
          {appointment.appointmentStatus}
        </span>
      </td>
      <td>{appointment.student.name}</td>
      <td>{appointment.counselor.name}</td>
      <td>
        <span className="hover:bg-red-200 p-2 rounded-md">
          <DeleteIcon sx={{ color: "red" }} />
          <button onClick={handleDelete}>Delete</button>
        </span>
      </td>
    </tr>
  );
};

export default AppointmentsRow;
