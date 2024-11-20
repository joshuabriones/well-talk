"use client";

import Header from "../_admincomponents/Header";
import { useState } from "react";
import * as XLSX from "xlsx";
import { API_ENDPOINT } from "@/lib/api";
import toast from "react-hot-toast";

function UploadStudentRecords() {
  const [studentRecords, setStudentRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the uploaded file

    if (!file) {
      console.log("No file selected");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result); // Read file as binary
      const workbook = XLSX.read(data, { type: "array" }); // Parse the file

      // Get the first sheet name
      const sheetName = workbook.SheetNames[0];

      // Get the data from the first sheet
      const sheet = workbook.Sheets[sheetName];

      // Convert the sheet data to JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // Log the JSON data to the console
      setStudentRecords(jsonData);
    };

    reader.readAsArrayBuffer(file); // Read the file
  };

  const handleCreateAllAccounts = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      for (let record of studentRecords) {
        const {
          firstname,
          lastname,
          institutionalemail,
          idnumber,
          gender,
          birthdate,
          department,
          course,
          year,
        } = record;

        try {
          const response = await fetch(
            `${process.env.BASE_URL}${API_ENDPOINT.REGISTER_STUDENT}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                institutionalEmail: institutionalemail,
                idNumber: idnumber,
                firstName: firstname,
                lastName: lastname,
                gender,
                password: "Pass1234!",
                image: `https://ui-avatars.com/api/?name=${firstname}+${lastname}`,
                role: "student",
                college: department,
                program: course,
                year,
                birthDate: birthdate,
                isVerified: true,
              }),
            }
          );

          if (response.ok) {
            toast.success("1 student account created successfully");
          } else {
            const errorData = await response.json();
            toast.error(
              `Failed to create account for ${firstname} ${lastname}: ${errorData.message}`
            );
          }
        } catch (error) {
          console.error("Error creating student accounts:", error);
          toast.error(`Error creating account for ${firstname} ${lastname}`);
        }
      }

      toast.success("All student accounts have been created!");
      setStudentRecords([]);
    } catch (error) {
      console.error("Error during account creation process:", error);
      toast.error("An error occurred while creating student accounts.");
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Student Records:", studentRecords);

  return (
    <div className="flex-1 h-[92vh]">
      <Header title="Upload Student Records" />

      <div className="px-4">
        <p className="text-slate-200 mb-6">
          Speed up student registration by uploading an excel file. Ensure that
          it follows the sequence of{" "}
          <span className="italic ">
            [ firstname, lastname, institutionalEmail, idnumber, gender,
            birthdate, department, course, and year ]
          </span>
        </p>
        {/* <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} /> */}

        <div class="relative inline-flex items-center w-1/3 gap-2 my-6 text-sm border rounded-full border-slate-200 text-slate-500">
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            class="peer order-2 [&::file-selector-button]:hidden"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
          <label
            for="file-upload"
            class="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded-full cursor-pointer whitespace-nowrap bg-gold hover:bg-yellow-500 focus:bg-emerald-700 focus-visible:outline-none peer-disabled:cursor-not-allowed peer-disabled:border-emerald-300 peer-disabled:bg-emerald-300"
          >
            <span class="order-2">Upload a file</span>
            <span class="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="File input icon"
                role="graphics-symbol"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
            </span>
          </label>
        </div>

        {studentRecords.length > 0 && (
          <h3 className="mb-2 text-white">Here's 5 sample records </h3>
        )}
        {studentRecords.length > 0 && (
          <table
            className="w-full text-left border border-collapse rounded sm:border-separate border-slate-200 "
            cellspacing="0"
          >
            <tbody>
              {studentRecords.slice(0, 5).map((record, index) => (
                <tr key={index} className="border-b border-slate-200">
                  <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 bg-white">
                    {record.firstname}
                  </td>
                  <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 bg-white">
                    {record.lastname}
                  </td>
                  <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 bg-white">
                    {record.institutionalemail}
                  </td>
                  <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 bg-white">
                    {record.idnumber}
                  </td>
                  <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 bg-white">
                    {record.gender}
                  </td>
                  <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 bg-white">
                    {record.birthdate}
                  </td>
                  <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 bg-white">
                    {record.department}
                  </td>
                  <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 bg-white">
                    {record.course}
                  </td>
                  <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 bg-white">
                    {record.year}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {studentRecords.length > 0 && (
          <button
            onClick={handleCreateAllAccounts}
            className="mt-6 px-4 py-2 bg-gold rounded-xl hover:bg-yellow-500 transition-all duration-200"
          >
            {isLoading ? "Creating accounts..." : "Create all accounts"}
          </button>
        )}
        {isLoading && (
          <p className="text-white mt-4">
            Please do not close this tab while the accounts are being created.
            This may take a few moments.
          </p>
        )}
      </div>
    </div>
  );
}

export default UploadStudentRecords;

// const handleRegisterAllAccounts = async (e) => {
//   e.preventDefault();

//   for (let record of studentRecords) {
//     const {
//       firstname,
//       lastname,
//       id,
//       gender,
//       birthdate,
//       department,
//       course,
//       year,
//     } = record;

//   // try {
//   //   const response = await fetch(
//   //     `${process.env.BASE_URL}${API_ENDPOINT.REGISTER_STUDENT}`,
//   //     {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         institutionalEmail: email,
//   //         idNumber: idno,
//   //         firstName,
//   //         lastName,
//   //         gender,
//   //         password,
//   //         image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
//   //         role,
//   //         college,
//   //         program,
//   //         year,
//   //         birthDate: formattedBirthdate,
//   //         contactNumber,
//   //         permanentAddress,
//   //         parentGuardianName,
//   //         parentGuardianContactNumber,
//   //         guardianRelationship,
//   //         currentAddress,
//   //       }),
//   //     }
//   //   );
//   // } catch (error) {
//   //   console.error("Error registering student accounts:", error);
//   // }
// };
