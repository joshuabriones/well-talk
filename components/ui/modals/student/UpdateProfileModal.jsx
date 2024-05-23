import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FullButton from "../../buttons/FullButton";
import TextInput from "../../inputs/TextInput";
import Birthdate from "../../student/Birthdate";
import TextDisplay from "../../student/TextDisplay";
import HollowButton from "../../buttons/HollowButton";

const UpdateProfileModal = ({ onClose, student }) => {
  const { data: session } = useSession();

  const [tabSelected, setTabSelected] = useState("Account Settings");

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showInvalidPassword, setShowInvalidPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleTabSelection = (tab) => {
    setTabSelected(tab);
  };

  // password validation function
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (label) => (e) => {
    const pw = e.target.value;

    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [label]: pw,
    }));

    setShowInvalidPassword((prevShowInvalidPassword) => ({
      ...prevShowInvalidPassword,
      [label]: pw && !validatePassword(pw),
    }));
  };

  const handleSelectPhoto = () => {
    console.log("Select Photo");
  };

  const handleSave = () => {
    console.log(passwords);
  };

  const handleCancel = () => {
    onClose(); // Call the onClose function when Cancel button is clicked
  };
  return (
    <>
      <input
        type="checkbox"
        id="my_modal_7"
        className="modal-toggle"
        checked={true}
      />
      <div className="modal" role="dialog">
        <div
          className="w-full modal-box p-8"
          style={{ maxWidth: "65vw", minHeight: "90vh" }}
        >
          <TabSelection handleTabSelection={handleTabSelection} />

          <section className="flex flex-col items-center">
            <AvatarDisplay
              student={student}
              handleSelectPhoto={handleSelectPhoto}
            />

            {tabSelected === "Account Settings" && (
              <AccountTab student={student} />
            )}

            {tabSelected === "Security Settings" && (
              <SecurityTab
                passwords={passwords}
                handlePasswordChange={handlePasswordChange}
                showInvalidPassword={showInvalidPassword}
              />
            )}

            <Save onClick={handleSave} />
          </section>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="my_modal_7"
          onClick={() => onClose()}
        >
          Close
        </label>
      </div>
    </>
  );
};

export default UpdateProfileModal;

const TabSelection = ({ handleTabSelection }) => {
  return (
    <section className="flex flex-row gap-x-3">
      <div
        className="outline-0 bg-gray-200 w-1/4 h-12 rounded-xl flex items-center justify-center font-semibold hover:scale-95"
        onClick={() => handleTabSelection("Account Settings")}
      >
        Account Settings
      </div>
      <div
        className="outline-0 bg-gray-200 w-1/4 h-12 rounded-xl flex items-center justify-center font-semibold hover:scale-95"
        onClick={() => handleTabSelection("Security Settings")}
      >
        Security Settings
      </div>
    </section>
  );
};

const AvatarDisplay = ({ student, handleSelectPhoto }) => {
  return (
    <section className="py-8 flex flex-col justify-center items-center gap-y-5 mt-4">
      <div className="w-2/12 h-full flex flex-col items-center justify-center avatar relative">
        <div className="w-36 rounded-full ring ring-[#6B9080] ring-offset-base-100 ring-offset-2 relative">
          <img src={student.user.image} className="rounded-full" />
        </div>
      </div>
      <button
        className="h-fit bg-[#577c6c] text-white p-2 px-5 rounded-full font-Merriweather text-sm"
        onClick={handleSelectPhoto}
      >
        Select Photo
      </button>
    </section>
  );
};

const AccountTab = ({ student }) => {
  return (
    <section className="h-full w-full px-20 flex flex-col items-center">
      {/* Profile Details */}
      <section className="w-full flex flex-col gap-y-5 py-2">
        {/* Name */}
        <div>
          <div className="w-full flex flex-row gap-x-6">
            <div className="w-5/12">
              <TextDisplay label="First Name" value={student.user.firstName} />
            </div>
            <div className="w-5/12">
              <TextDisplay label="Last Name" value={student.user.lastName} />
            </div>
            <div className="w-2/12">
              <TextDisplay label="Gender" value={student.user.gender} />
            </div>
          </div>
        </div>
        {/* College Information */}
        <div>
          <div className="w-full flex flex-row gap-x-6">
            <div className="w-5/12">
              <TextDisplay label="ID Number" value={student.user.idNumber} />
            </div>
            <div className="w-5/12">
              <TextDisplay label="Program" value={student.program} />
            </div>
            <div className="w-2/12">
              <TextDisplay label="Year Level" value={student.year} />
            </div>
          </div>
        </div>
        {/* Additional Details */}
        <div>
          <div className="w-full flex flex-row gap-x-6">
            <div className="w-3/12">
              <Birthdate value="2023-05-16" />
            </div>
            <div className="w-3/12">
              <TextDisplay
                label="Contact Number"
                value={student.contactNumber}
              />
            </div>
            <div className="w-6/12">
              <TextDisplay label="Address" value={student.address} />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

const SecurityTab = ({
  passwords,
  handlePasswordChange,
  showInvalidPassword,
}) => {
  return (
    <section className="h-full w-full px-20 flex flex-col items-center">
      <section className="w-full flex flex-col gap-y-5 py-2">
        {/* Current Password */}
        <div>
          <div className="w-full flex flex-row justify-center">
            <div className="w-5/12">
              <PasswordInput
                label="currentPassword"
                password={passwords.currentPassword}
                handlePasswordChange={handlePasswordChange}
                showInvalidPassword={showInvalidPassword.currentPassword}
              />
            </div>
          </div>
        </div>
        {/* New Password */}
        <div>
          <div className="w-full flex flex-row gap-x-6 justify-center">
            <div className="w-5/12">
              <PasswordInput
                label="newPassword"
                password={passwords.newPassword}
                handlePasswordChange={handlePasswordChange}
                showInvalidPassword={showInvalidPassword.newPassword}
              />
            </div>
          </div>
        </div>
        {/* Confirm Password */}
        <div>
          <div className="w-full flex flex-row gap-x-6 justify-center">
            <div className="w-5/12">
              <PasswordInput
                label="confirmPassword"
                password={passwords.confirmPassword}
                handlePasswordChange={handlePasswordChange}
                showInvalidPassword={showInvalidPassword.confirmPassword}
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

const PasswordInput = ({
  label,
  password,
  handlePasswordChange,
  showInvalidPassword,
}) => {
  const [properLabel, setProperLabel] = useState("");

  useEffect(() => {
    switch (label) {
      case "currentPassword":
        setProperLabel("Current Password");
        break;
      case "newPassword":
        setProperLabel("New Password");
        break;
      case "confirmPassword":
        setProperLabel("Confirm New Password");
        break;
      default:
        setProperLabel("");
    }
  }, [label]);

  return (
    <>
      <div className="w-full full flex flex-col">
        <TextInput
          label={properLabel}
          value={password}
          onChange={handlePasswordChange(label)}
          type="password"
        />
        {/* error message */}
        {showInvalidPassword && password && (
          <div className="text-red-600 text-xs pt-2 pb-1.5">
            Choose a password with at least 8 characters, including at least one
            uppercase letter, one lowercase letter, one number, and one special
            character.
          </div>
        )}
      </div>
    </>
  );
};

const Save = ({ onClick, handleCancel }) => {
  return (
    <section className="mt-9 w-4/12 flex justify-center items-center">
      <FullButton onClick={onClick}>Save</FullButton>
    </section>
  );
};
