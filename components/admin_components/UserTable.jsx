import React, { useState } from "react";
import UserRow from "./UserRow";

const UserTable = ({ users, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = (userId) => {
    onDelete(userId);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRole === "all" || user.role === selectedRole)
  );

  const indexOfLastUser = currentPage * 10;
  const indexOfFirstUser = indexOfLastUser - 10;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / 10);

  return (
    <div className="px-10 w-full">
      <div className="flex justify-between">
        <div class="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            class="relative w-full h-12 px-4 transition-all border rounded-xl text-slate-500 autofill:bg-white"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute w-6 h-6 cursor-pointer top-3 right-4 stroke-slate-400 peer-disabled:cursor-not-allowed"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            aria-labelledby="title-9 description-9"
            role="graphics-symbol"
          >
            <title id="title-9">Search icon</title>
            <desc id="description-9">Icon description here</desc>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <select
          value={selectedRole}
          onChange={handleRoleChange}
          className="w-40 rounded-xl text-slate-500"
        >
          <option value="all">All</option>
          <option value="counselor">Counselor</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      <table className="mt-8 lg:w-full sm:w-[900px]">
        <thead className="bg-slate-200">
          <tr className="text-left">
            <th className="px-10 py-4 rounded-tl-xl">Name</th>
            <th className="py-4">Email</th>
            <th className="py-4">ID Number</th>
            <th className="py-4">Role</th>
            <th className="py-4 rounded-tr-xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <UserRow key={user.id} user={user} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>

      <div className="flex items-center gap-2 mt-5 p-2">
        <button
          className="hover:text-slate-600 cursor-pointer"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          ＜ Previous
        </button>
        <span>
          <span className="text-red-400"> {currentPage}</span> of {totalPages}
        </span>
        <button
          className="hover:text-slate-600 cursor-pointer"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next ＞
        </button>
      </div>
    </div>
  );
};

export default UserTable;
