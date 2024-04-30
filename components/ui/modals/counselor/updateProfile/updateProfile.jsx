import React from "react";

const UpdateProfile = ({ onClose }) => {
  const handleSave = () => {
    // Logic to save updated profile
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        Form fields for updating profile
        {/* <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your first name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter your email address"
          />
        </div> */}
        {/* Buttons for Save and Cancel */}
        {/* <div className="flex justify-end">
          <button
            className="btn mr-2 text-sm rounded-full bg-[#222222] text-white"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="btn text-sm rounded-full border border-[#222222] text-[#222222]"
            onClick={onClose}
          >
            Cancel
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default UpdateProfile;
