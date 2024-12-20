import { useState } from "react";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import ReassignModal from "./ReassignModal";

const UsersTable = ({ users, handleDeleteUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [isEditing, setIsEditing] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredUsers = users?.filter((user) => {
    const matchesRole = selectedRole === "all" || user.role === selectedRole;

    const matchesSearch =
      user.idNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.firstName + " " + user.lastName)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.institutionalEmail
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.idNumber.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesRole && matchesSearch;
  });

  const handleDelete = (userId) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this user?`
    );
    if (isConfirmed) {
      handleDeleteUser(userId);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-5">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <select
          value={selectedRole}
          onChange={(e) => {
            setSelectedRole(e.target.value);
          }}
          className="w-1/7 rounded-3xl text-navlight dark:text-navgray bg-white dark:bg-bgDark2"
        >
          <option value="all">All</option>
          <option value="counselor">Counselor</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>
      <div class="w-full overflow-x-auto">
        <table
          class="w-full text-left rounded w-overflow-x-auto"
          cellspacing="0"
        >
          <tbody className="">
            <tr className="">
              <th
                scope="col"
                class="h-12 px-6 text-sm font-medium stroke-slate-700 text-white rounded-tl-3xl bg-lightMaroon "
              >
                Name
              </th>
              <th
                scope="col"
                class="h-12 px-6 text-sm font-medium stroke-slate-700 text-white bg-lightMaroon"
              >
                School ID
              </th>
              <th
                scope="col"
                class="h-12 px-6 text-sm font-medium stroke-slate-700 text-white bg-lightMaroon"
              >
                Email
              </th>
              <th
                scope="col"
                class="h-12 px-6 text-sm font-medium stroke-slate-700 text-white bg-lightMaroon"
              >
                Role
              </th>
              <th
                scope="col"
                class="h-12 px-6 text-sm font-medium stroke-slate-700 text-white rounded-tr-3xl bg-lightMaroon"
              >
                Actions
              </th>
            </tr>
            {currentUsers.map((user) => (
              <tr className="border-b-2 border-lightMaroon">
                <td class="h-12 px-6 text-sm transition duration-300 border-slate-200 bg-white dark:bg-bgDark2 stroke-slate-500 text-navgray py-4">
                  <img
                    src={user.image}
                    className="inline w-10 h-10 mr-2 rounded-full"
                  />
                  {user.firstName} {user.lastName}
                </td>
                <td class="h-12 px-6 text-sm transition duration-300 border-slate-200 bg-white dark:bg-bgDark2 stroke-slate-500 text-navgray ">
                  {user.idNumber}
                </td>
                <td class="h-12 px-6 text-sm transition duration-300 border-slate-200 bg-white dark:bg-bgDark2 stroke-slate-500 text-navgray ">
                  {user.institutionalEmail}
                </td>
                <td class="h-12 px-6 text-sm transition duration-300 border-slate-200 bg-white dark:bg-bgDark2 stroke-slate-500 text-navgray ">
                  {user.role}
                </td>
                <td class="h-12 px-6 text-sm transition duration-300 border-slate-200 bg-white dark:bg-bgDark2 stroke-slate-500  ">
                  {user.role === "counselor" && (
                    <>
                      <button
                        onClick={() => setIsEditing((prev) => !prev)}
                        className="hover:bg-green-400 p-2 rounded-md"
                        title="Edit"
                      >
                        <BorderColorIcon
                          sx={{ color: "#bbf7d0", stroke: "#4ade80" }}
                        />
                      </button>
                      {isEditing && (
                        <ReassignModal
                          isEditing={isEditing}
                          setIsEditing={setIsEditing}
                          user={user}
                        />
                      )}
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="hover:bg-red-400 p-2 rounded-md"
                    title="Delete"
                  >
                    <DeleteIcon sx={{ color: "#fecaca", stroke: "#f87171" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav role="navigation" aria-label="Pagination Navigation">
          <ul className="mt-4 flex list-none items-center justify-center text-sm text-white dark:text-slate-700 md:gap-1">
            {/* Previous Button */}
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:text-slate-400"
                } mr-2`}
              >
                Prev{" "}
              </button>
            </li>

            {/* Page Numbers */}
            {Array.from(
              { length: Math.ceil(filteredUsers.length / usersPerPage) },
              (_, index) => (
                <li key={index + 1}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`${
                      currentPage === index + 1
                        ? "bg-lightMaroon text-white px-3 py-2 rounded-md"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}

            {/* Next Button */}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(filteredUsers.length / usersPerPage)
                }
                className={`${
                  currentPage === Math.ceil(filteredUsers.length / usersPerPage)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:text-slate-400"
                } ml-2`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UsersTable;

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div class="relative w-1/3">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        class="relative w-full h-12 px-4 transition-all border rounded-3xl text-navlight dark:text-navgray autofill:bg-white bg-white dark:autofill:bg-bgDark2 dark:bg-bgDark2"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="absolute w-6 h-6 cursor-pointer top-3 right-4 stroke-navgray peer-disabled:cursor-not-allowed"
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
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </div>
  );
}
