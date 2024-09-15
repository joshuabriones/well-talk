"use client";

import { logout } from "@/lib/helperFunctions";

const Unverified = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-7xl">🧐</h1>
        <h1 className="text-2xl font-bold text-yellow-500 mb-4">
          Account Not Verified
        </h1>
        <p className="text-gray-600 mb-6">
          Your account is currently unverified. Please wait for the admin to
          verify your account.
        </p>
        <button
          onClick={() => logout()}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Unverified;
