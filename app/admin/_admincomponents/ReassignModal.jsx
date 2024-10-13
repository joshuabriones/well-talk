import { useState } from "react";

import FullButton from "@/components/ui/buttons/FullButton";
import HollowButton from "@/components/ui/buttons/HollowButton";
import Select from "react-select";
import { API_ENDPOINT } from "@/lib/api";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import {
  collegeOptions,
  programOptions,
  yearLevelOptions,
} from "@/lib/inputOptions";

const ReassignModal = ({ isEditing, setIsEditing, user }) => {
  const [college, setCollege] = useState("");
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedYearLevels, setSelectedYearLevels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleProgramChange = (selectedOptions) => {
    setSelectedPrograms(selectedOptions);
  };

  const handleYearLevelChange = (event) => {
    const value = parseInt(event.target.value);
    setSelectedYearLevels((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleUpdateCounselor = async (e) => {
    e.preventDefault();

    let yearsAssigned = selectedYearLevels.join(", ");

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.BASE_URL}${API_ENDPOINT.UPDATE_COUNSELOR}${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({
            institutionalEmail: user.institutionalEmail,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            image: user.image,
            role: user.role,
            college: college,
            program: selectedPrograms
              .map((program) => program.value)
              .join(", "),
            assignedYear: yearsAssigned,
          }),
        }
      );

      if (!response.ok) {
        toast.error("Failed to perform counselor reassignment");
      } else {
        toast.success("Counselor reassigned successfully");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error updating counselor profile:", error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="font-Merriweather fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-bgDark1 rounded-2xl flex flex-col border-2 border-lightMaroon lg:gap-6 xs:gap-4 p-16 md:w-1/2 xs:w-4/5 h-3/4 relative">
        <div>
          <h1 className="font-bold text-gold text-2xl mb-1">
            Reassign Counselor 🔄
          </h1>
          <p className="text-slate-500 md:text-base xs:text-sm font-Jaldi">
            Enter the new department, program, and year level for{" "}
            <span className="text-gold">
              Counselor {user.firstName} {user.lastName}
            </span>{" "}
            to reassign.
          </p>
        </div>

        <div className="flex flex-col gap-6 overflow-y-scroll">
          <div className="flex flex-col w-full">
            <label
              htmlFor="gender"
              className="relative block rounded-md bg-white border border-gray-400 p-1 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black w-full"
            >
              <select
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="peer border-none bg-white placeholder-white focus:border-gray-800 focus:outline-none focus:ring-0 rounded-md w-full dark:text-black"
                required
              >
                {collegeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute start-2.5 bg-white top-0 -translate-y-1/2 p-1 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Department
              </span>
            </label>
            {/* {errors.college && (
              <p className="text-red-500 text-sm font-Jaldi font-semibold">
                {errors.college._errors[0]}
              </p>
            )} */}
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor="gender"
              className="relative block rounded-md bg-white border border-gray-400 p-1 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black w-full"
            >
              <Select
                value={selectedPrograms}
                options={programOptions[college]}
                onChange={handleProgramChange}
                className="peer border-none bg-white placeholder-white focus:border-gray-800 focus:outline-none focus:ring-0 rounded-md w-full dark:text-black"
                required
                isMulti
              />

              <span
                className={`pointer-events-none absolute start-2.5 bg-white top-0 -translate-y-1/2 p-1 transition-all 
    peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm 
    peer-focus:top-0 dark:bg-black`}
                style={{
                  fontSize: "11px",
                }}
              >
                Programs
              </span>
            </label>
            {/* {errors.program && (
              <p className="text-red-500 text-sm font-Jaldi font-semibold">
                {errors.program._errors[0]}
              </p>
            )} */}
          </div>
          <div>
            <label>Select Year Levels</label>
            {yearLevelOptions.map((option) => (
              <div key={option.value} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  value={option.value}
                  onChange={handleYearLevelChange}
                  checked={selectedYearLevels.includes(option.value)}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label>{option.label}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-5">
          <HollowButton onClick={() => setIsEditing(false)}>
            Cancel
          </HollowButton>
          <FullButton onClick={handleUpdateCounselor}>
            {isLoading ? (
              <span className="flex gap-2 items-center justify-center">
                Submitting <img src="/images/loading.svg" />
              </span>
            ) : (
              "Submit"
            )}
          </FullButton>
        </div>
      </div>
    </div>
  );
};

export default ReassignModal;
