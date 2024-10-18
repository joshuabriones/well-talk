import { useState } from "react";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { programOptions } from "@/lib/inputOptions";

import VerifyModal from "@/components/ui/modals/VerifyModal";

const StudentAccountTable = ({
  users,
  handleAcceptUser,
  handleDeleteUser,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [isOpen, setIsOpen] = useState(false);
  const [isVerify, setIsVerify] = useState(false);

  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.idNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.firstName + " " + user.lastName)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.institutionalEmail
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.idNumber.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleDelete = () => {
    setIsOpen(true);
    setIsVerify(false);
  };

  const handleAccept = () => {
    setIsOpen(true);
    setIsVerify(true);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="w-full ">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl md:text-2xl font-bold text-lightMaroon">
          Verify Student Accounts
        </h1>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div class="w-full overflow-x-auto">
        <table
          class="w-full text-left rounded w-overflow-x-auto "
          cellspacing="0"
        >
          <tbody>
            <tr className="">
              <th
                scope="col"
                class="h-12 px-6 text-sm font-medium stroke-slate-700 text-white rounded-tl-3xl bg-lightMaroon"
              >
                <div class="flex items-center h-full">Name</div>
              </th>
              <th
                scope="col"
                class="h-12 px-6 text-sm font-medium stroke-slate-700 text-white bg-lightMaroon"
              >
                <div class="flex items-center h-full">School ID</div>
              </th>
              <th
                scope="col"
                class="h-12 px-6 text-sm font-medium stroke-slate-700 text-white bg-lightMaroon"
              >
                <div class="flex items-center h-full">Email</div>
              </th>
              <th
                scope="col"
                class="h-12 px-6 text-sm font-medium stroke-slate-700 text-white bg-lightMaroon"
              >
                <div class="flex items-center h-full">College Department</div>
              </th>
              <th
                scope="col"
                class="h-12 px-6 text-sm font-medium stroke-slate-700 text-white bg-lightMaroon"
              >
                <div class="flex items-center h-full">Program & Year</div>
              </th>
              <th
                scope="col"
                class="h-12 px-6 text-sm font-medium stroke-slate-700 text-white rounded-tr-3xl bg-lightMaroon"
              >
                <div class="flex items-center h-full">Actions</div>
              </th>
            </tr>

            {currentUsers.map((user) => (
              <tr className="border-b-2 border-lightMaroon">
                <td class="h-12 px-6 text-sm transition duration-300 border-slate-200 bg-white dark:bg-bgDark2 stroke-slate-500 text-navgray ">
                  <div class="flex items-center h-full">
                    {user.firstName} {user.lastName}
                  </div>
                </td>
                <td class="h-12 px-6 text-sm transition duration-300 border-slate-200 bg-white dark:bg-bgDark2 stroke-slate-500 text-navgray ">
                  <div class="flex items-center h-full">{user.idNumber}</div>
                </td>
                <td class="h-12 px-6 text-sm transition duration-300 border-slate-200 bg-white dark:bg-bgDark2 stroke-slate-500 text-navgray ">
                  <div class="flex items-center h-full">
                    {user.institutionalEmail}
                  </div>
                </td>
                <td class="h-12 px-6 text-sm transition duration-300 border-slate-200 bg-white dark:bg-bgDark2 stroke-slate-500 text-navgray ">
                  <div class="flex items-center h-full">{user.college}</div>
                </td>
                <td class="h-12 px-6 text-sm transition duration-300 border-slate-200 bg-white dark:bg-bgDark2 stroke-slate-500 text-navgray ">
                  <div class="flex items-center h-full">
                    {programOptions[user?.college]?.find(
                      (item) => item.value === user?.program
                    )?.label || "N/A"}{" "}
                    - {user.year}
                  </div>
                </td>
                <td class="h-12 px-6 text-sm transition duration-300 border-slate-200 bg-white dark:bg-bgDark2 stroke-slate-500  ">
                  <button
                    onClick={() => handleAccept()}
                    className="hover:bg-green-400 p-2 rounded-md"
                    title="Accept"
                  >
                    <CheckCircleIcon
                      sx={{ color: "#dcfce7", stroke: "#4ade80" }}
                    />

                    {isOpen && isVerify && (
                      <VerifyModal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        onConfirm={() => handleAcceptUser(user.id)}
                        text="accept this user"
                        isLoading={isLoading}
                      />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete()}
                    className="hover:bg-red-400 p-2 rounded-md"
                    title="Delete"
                  >
                    <DeleteIcon sx={{ color: "#fecaca", stroke: "#f87171" }} />
                    {isOpen && !isVerify && (
                      <VerifyModal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        onConfirm={() => handleDeleteUser(user.id)}
                        text="delete this user"
                        isLoading={isLoading}
                      />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav role="navigation" aria-label="Pagination Navigation">
          <ul className="mt-4 flex list-none items-center justify-center text-sm text-maroon md:gap-1">
            {/* Previous Button */}
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:text-lightMaroon"
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
                    : "hover:text-lightMaroon"
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

export default StudentAccountTable;

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
