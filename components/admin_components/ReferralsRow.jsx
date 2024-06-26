import { Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpIcon from "@mui/icons-material/Help";
import ConfirmationPopup from "../ui/modals/Confirmation";
import Cookies from "js-cookie";
import { useState } from "react";
import { API_ENDPOINT } from "@/lib/api";

const ReferralsRow = ({ referral, onDelete, fetchReferrals }) => {
  const [showConfirm, setShowConfirm] = useState(false); // State to control confirmation dialog

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete referral?`
    );
    if (isConfirmed) {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}${API_ENDPOINT.DELETE_REFERRAL}${referral.referralId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error deleting referral");
        }
        onDelete(referral.referralId);
        fetchReferrals();
        console.log("Deleted");
      } catch (error) {
        console.error("Error deleting referral", error);
      }
    }
  };

  const handleAccept = async () => {
    // Show confirmation dialog
    setShowConfirm(true);
  };

  const confirmAccept = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.ACCEPT_REFERRAL}${referral.referralId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error accepting referral");
      }
      const data = await response.json();
      console.log(data);
      fetchReferrals();
    } catch (error) {
      console.error("Error accepting referral", error);
    }
  };

  const roleColor = () => {
    switch (referral.status) {
      case "Resolved":
        return "text-green-600 bg-green-100";
      case "Reviewed":
        return "text-blue-600 bg-blue-100";
      case "Pending":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-red-600 bg-red-100";
    }
  };

  return (
    <tr className="border-b">
      <td className="flex gap-3 items-center pl-8 py-4">
        {referral.studentFirstName} {referral.studentLastName}
      </td>
      <td>{referral.studentId}</td>
      <td>
        {referral.teacher.firstName} {referral.teacher.lastName}
      </td>
      <td>{referral.reason}</td>
      <td>
        <span className={`${roleColor()} font-bold p-2 rounded-lg`}>
          {referral.status}
        </span>
      </td>
      <td>
        <span className="hover:bg-red-200 p-2 rounded-md">
          <DeleteIcon sx={{ color: "red" }} />
          <button onClick={handleDelete}>Delete</button>
        </span>
        <button
          className="bg-green-500 py-[5px] px-2 rounded-md text-white hover:bg-green-600"
          onClick={handleAccept}
        >
          Accept
        </button>
        {showConfirm && (
          <ConfirmationPopup
            icon={<HelpIcon />} // Example icon, replace with appropriate icon
            title="Confirm"
            message="Are you sure you want to accept this referral?"
            onConfirm={() => {
              confirmAccept();
              setShowConfirm(false); // Hide confirmation popup after accepting
            }}
            onCancel={() => setShowConfirm(false)} // Hide confirmation popup on cancel
          />
        )}
      </td>
    </tr>
  );
};

export default ReferralsRow;
