import { Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UserRow = ({ user, onDelete }) => {
  const handleDelete = () => {
    onDelete(user.id);
  };

  const roleColor = () => {
    switch (user.role) {
      case "teacher":
        return "text-green-600 bg-green-100";
      case "student":
        return "text-blue-600 bg-blue-100";
      case "counselor":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-slate-500";
    }
  };

  return (
    <tr className="border-b">
      <td className="flex gap-3 items-center pl-8 py-4">
        <Avatar sx={{ bgcolor: "orange" }}>
          {user.name[0]}
          {user.name[1].toUpperCase()}
        </Avatar>
        {user.name}
      </td>
      <td>{user.email}</td>
      <td>{user.idNumber}</td>
      <td>
        <span className={`${roleColor()} font-bold p-2 rounded-lg`}>
          {user.role}
        </span>
      </td>
      <td>
        <span className="hover:bg-red-200 p-2 rounded-md">
          <DeleteIcon sx={{ color: "red" }} />
          <button onClick={handleDelete}>Delete</button>
        </span>
      </td>
    </tr>
  );
};

export default UserRow;
