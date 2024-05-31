import { useEffect, useState } from "react";
import iconDelete from "@/public/images/icons/iconDelete.png";
import HollowButton from "@/components/ui/buttons/HollowButton";
import ModalConfirmResponse from "./ModalConfirmResponse";
import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";
import { getUserSession } from "@/lib/helperFunctions";

const ModalInquiryInfo = ({ setInquiryModal, selectedID, inquiries }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [inquiry, setInquiry] = useState(null);

  const [respondable, setRespondable] = useState("");
  const [response, setResponse] = useState("");

  const [confirmResponse, setConfirmResponse] = useState(false);

  const userSession = getUserSession();

  console.log("Inquiry", inquiries);
  // for dialog
  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  // Fetch inquiry details based on selectedID
  useEffect(() => {
    const handleFindInquiry = async () => {
      if (selectedID) {
        const selected = inquiries.find(
          (inquiry) => inquiry.inquiryId === selectedID
        );
        setInquiry(selected);
      }
    };

    handleFindInquiry();
  }, [selectedID, inquiries]);

  // Update respondable based on inquiry status
  useEffect(() => {
    if (inquiry && inquiry.status) {
      setRespondable(inquiry.status === "open" ? "Pending" : "Responded");
    }
  }, [inquiry]);

  const handleResponse = async () => {
    const currentResponse = response;

    try {
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.REPLY_INQUIRY}${inquiry.inquiryId}?counselorId=${userSession.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            counselorReply: currentResponse,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to respond to inquiry");
      }
      const data = await response.json();
      console.log(data);
      // Update inquiry status to "Responded" here if needed
    } catch (error) {
      console.error("Error responding to inquiry:", error.message);
    }
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
            src={iconDelete.src} // Change to inquirer avatar
            alt="inquirer avatar"
            className="w-24 h-24 flex justify-center mx-auto"
          />

          <table className="my-4">
            <tbody>
              <tr>
                <th>ID Number:</th>
                <td>{inquiry ? inquiry.sender.idNumber : ""}</td>
              </tr>
              <tr>
                <th>Name:</th>
                <td>
                  {inquiry
                    ? `${inquiry.sender.firstName} ${inquiry.sender.lastName}`
                    : ""}
                </td>
              </tr>
              <tr>
                <th>Subject of Inquiry:</th>
                <td>{inquiry ? inquiry.subject : ""}</td>
              </tr>
              <tr>
                <th>Inquiry:</th>
                <td>{inquiry ? inquiry.messageInquiry : ""}</td>
              </tr>
              <tr>
                <th>Date and Time:</th>
                <td>{inquiry ? inquiry.date : ""}</td>
              </tr>
              <tr>
                <th>Status:</th>
                <td
                  className={`h-fit badge badge-md ${
                    inquiry?.status === false
                      ? "badge-warning"
                      : "badge-success"
                  }`}
                  style={{ width: "30%" }}
                >
                  {inquiry?.status ? "Replied" : "Pending"}
                </td>
              </tr>
            </tbody>
          </table>

          <div>
            <div className="font-Merriweather font-bold">Response:</div>
            <textarea
              placeholder="Type your response here..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className={`textarea textarea-bordered textarea-md w-full max-w-full font-Jaldi mt-2 text-lg overflow-auto resize-none ${
                respondable === 1 ? "pointer-events-none opacity-50" : ""
              }`}
              readOnly={respondable === 1}
            ></textarea>
          </div>

          <div className="gap-x-4 mt-3 px-44">
            <HollowButton onClick={() => setConfirmResponse(true)}>
              Respond
            </HollowButton>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="my_modal_7"
          onClick={() => setInquiryModal(false)}
        >
          Close
        </label>
      </div>

      {confirmResponse && (
        <ModalConfirmResponse
          response={response}
          setConfirmResponse={setConfirmResponse}
          setInquiryModal={setInquiryModal}
          handleResponse={handleResponse}
        />
      )}
    </>
  );
};

export default ModalInquiryInfo;
