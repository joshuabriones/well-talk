"use client";

import ScrollAnimationWrapper from "@/components/layout/ScrollAnimationWrapper";
import Load from "@/components/Load";
import FullButton from "@/components/ui/buttons/FullButton";
import TextInput from "@/components/ui/inputs/TextInput";
import { Navbar } from "@/components/ui/landing/LandingNav";
import ModalRegistrationSuccessful from "@/components/ui/modals/ModalRegistrationSuccessful";
import ModalTermsUnchecked from "@/components/ui/modals/ModalTermsUnchecked";
import { API_ENDPOINT } from "@/lib/api";
import { getUserSession } from "@/lib/helperFunctions";
import {
  collegeOptions,
  genderOptions,
  programOptions,
  yearLevelOptions,
} from "@/lib/inputOptions";
import {
  counselorSchema,
  registrationSchema,
  studentSchema,
} from "@/lib/validators";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import styles from "../../css/landing.module.css";

const Registration = () => {
  const router = useRouter();

  // properties
  const [email, setEmail] = useState("");
  const [idno, setIdNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

  const [birthdate, setBirthdate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");

  const [role, setRole] = useState("");
  const [roleStudent, setRoleStudent] = useState(false);
  const [roleTeacher, setRoleTeacher] = useState(false);
  const [roleCounselor, setRoleCounselor] = useState(false);

  const [college, setCollege] = useState("");
  const [program, setProgram] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedYearLevels, setSelectedYearLevels] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showTermsNotAccepted, setShowTermsNotAccepted] = useState(false);
  const [showRegistrationSuccessful, setShowRegistrationSuccessful] =
    useState(false);
  const [isEmptyError, setIsEmptyError] = useState(false);
  const [isMismatchError, setIsMismatchError] = useState(false);

  // handling route protection
  const userSession = getUserSession();
  if (userSession && userSession.role) return <Load route={userSession.role} />;

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleProgramChange = (selectedOptions) => {
    setSelectedPrograms(selectedOptions); // You will get an array of selected programs
  };

  const handleYearLevelChange = (event) => {
    const value = parseInt(event.target.value);
    setSelectedYearLevels((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // create account
  const handleCreateAccount = async (e) => {
    e.preventDefault();

    const clearErrors = () => {
      setTimeout(() => {
        setErrors({});
      }, 3000);
    };

    let result;
    let assignedYear = selectedYearLevels.map((item) => item.value).join(", ");

    result = registrationSchema.safeParse({
      email,
      idno,
      firstName,
      lastName,
      gender,
      role,
      password,
      passwordCheck,
      termsAccepted,
    });

    console.log("teacher", result);

    let extraInfoValidation;

    /* zod validation */
    if (role === "student") {
      const studentData = {
        college,
        program,
        birthdate,
        contactNumber,
        permanentAddress,
        year,
      };
      extraInfoValidation = studentSchema.safeParse(studentData);
    } else if (role === "counselor") {
      result = counselorSchema.safeParse({
        college,
        program,
        assignedYear,
      });
    }

    if (!extraInfoValidation?.success && !result?.success) {
      setErrors({
        ...extraInfoValidation?.error.format(),
        ...result?.error.format(),
      });
      clearErrors();
      return;
    }

    if (termsAccepted === false) {
      setShowTermsNotAccepted(true);
      return;
    }

    /* user registration - {role} */
    let response;
    switch (role) {
      case "student":
        try {
          response = await fetch(
            `${process.env.BASE_URL}${API_ENDPOINT.REGISTER_STUDENT}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                institutionalEmail: email,
                idNumber: idno,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                password: password,
                image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
                role: role,
                college: college,
                program: program,
                year: year,
                birthDate: birthdate,
                contactNumber: contactNumber,
                permanentAddress: permanentAddress,
              }),
            }
          );
        } catch (error) {
          console.log("Error in creating student user", error);
        }
        break;
      case "teacher":
        try {
          response = await fetch(
            `${process.env.BASE_URL}${API_ENDPOINT.REGISTER_TEACHER}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                institutionalEmail: email,
                idNumber: idno,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                password: password,
                image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
                role: role,
              }),
            }
          );
        } catch (error) {
          console.log("Error in creating student user", error);
        }
        break;
      case "counselor":
        try {
          response = await fetch(
            `${process.env.BASE_URL}${API_ENDPOINT.REGISTER_COUNSELOR}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                institutionalEmail: email,
                idNumber: idno,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                password: password,
                image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
                role: role,
                college: college,
                program: selectedPrograms.map((item) => item.value).join(", "),
                assignedYear: selectedYearLevels.map((item) => item).join(", "),
              }),
            }
          );
        } catch (error) {
          console.log("Error in creating student user", error);
        }
        break;
    }

    console.log(response);

    if (!response.ok) console.log("Error status: ", response.status);
    else {
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    }

    setShowRegistrationSuccessful(true);
  };

  // password validation function
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (!validatePassword(newPassword)) {
      // password is not valid
      setIsValidPassword(false);
    } else {
      // password is valid
      setIsValidPassword(true);
    }
  };

  const handlePasswordCheck = (e) => {
    const newPasswordCheck = e.target.value;
    setPasswordCheck(newPasswordCheck);

    if (newPasswordCheck.trim() === "") {
      setIsEmptyError(true);
      setIsMismatchError(false);
    } else if (validatePassword(password)) {
      setIsEmptyError(false);
      if (newPasswordCheck !== password) {
        setIsMismatchError(true);
      } else {
        setIsMismatchError(false);
      }
    } else {
      setIsEmptyError(false);
      setIsMismatchError(false);
    }
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setRole(newRole);

    if (newRole === "student") {
      setRoleStudent(true);
      setRoleTeacher(false);
      setRoleCounselor(false);
    } else if (newRole === "teacher") {
      setRoleStudent(false);
      setRoleTeacher(true);
      setRoleCounselor(false);
    } else if (newRole === "counselor") {
      setRoleStudent(false);
      setRoleTeacher(false);
      setRoleCounselor(true);
    } else {
      setRoleStudent(false);
      setRoleTeacher(false);
      setRoleCounselor(false);
    }
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <section className="h-screen py-2 md:py-2 text-zinc-900 dark:text-white flex items-center">
      <div className="block md:hidden">
        <Navbar userType="landing" />
      </div>
      <div
        className="pattern-overlay pattern-left absolute -z-10"
        style={{ transform: "scaleY(-1)", top: "-50px" }}
      >
        <img src="/images/landing/lleft.png" alt="pattern" />
      </div>
      <div
        className="pattern-overlay pattern-right absolute bottom-0 right-0 -z-10"
        style={{ transform: "scaleY(-1)", top: "-15px" }}
      >
        <img
          src="/images/landing/lright.png"
          alt="pattern"
          className="w-full h-full object-contain"
        />
      </div>
      <ScrollAnimationWrapper
        animationType="fadeInFromLeft"
        className=" lg:ml-48"
      >
        <div className="container px-2 mx-auto rounded-2xl">
          <div className="grid grid-cols-5 gap-6 py-2 lg:gap-x-10 justify-content-between h-full">
            <div className="col-span-3 lg:col-span-3 rounded-2xl">
              <div className="relative w-full col-span-3 lg:col-span-3 rounded-2xl">
                <div className="h-[90vh] w-full rounded-2xl overflow-hidden relative border-2">
                  <img
                    src="/images/regis.png"
                    alt="pattern"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute top-8 left-8 h-16 flex items-center">
                    <img
                      src="/images/loggoword.png" // Replace with your actual logo path
                      alt="WellTalk Logo"
                      className="w-18 h-14" // Adjust width and height as needed
                    />
                    <h1 className="text-3xl font-bold font-Merriweather">
                      <span
                        className="text-maroon"
                        style={{
                          textShadow:
                            "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000",
                        }}
                      >
                        Well
                      </span>
                      <span
                        className="text-gold"
                        style={{
                          textShadow:
                            "-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000",
                        }}
                      >
                        Talk
                      </span>
                    </h1>
                  </div>

                  <div className="absolute bottom-8 left-8 p-4 bg-opacity-50 text-white rounded-tr-2xl">
                    <div className="flex w-1/4 items-center justify-center bg-white bg-opacity-20 gap-2 text-maroon font-Merriweather font-bold rounded-3xl p-2 border-2 border-gray">
                      Join us Today!
                    </div>
                    <h2 className="text-4xl font-semibold font-Merriweather py-4 text-gray">
                      Start your WellTalk Journey
                    </h2>
                    <p className="text-md text-gray mb-8">
                      Follow these simple steps to set up your account
                    </p>

                    <div className="flex gap-4 mt-4">
                      <div
                        className={`w-64 h-64 bg-maroon rounded-3xl border-2 border-gray relative ${styles["floating-4"]}`}
                      >
                        <div className="w-6 h-6 bg-white text-maroon rounded-full flex items-center justify-center text-sm font-bold absolute top-7 left-7 border-2 border-gray">
                          1
                        </div>
                        <div className="absolute bottom-10 left-7 text-white text-sm font-medium">
                          Fill out the Registration <br />
                          form
                        </div>
                      </div>

                      <div
                        className={`w-64 h-64 bg-white bg-opacity-20 rounded-3xl relative border-2 border-gray ${styles["floating-4"]}`}
                      >
                        <div className="w-6 h-6 text-maroon rounded-full flex items-center justify-center text-sm font-bold absolute top-7 left-7 border-2">
                          2
                        </div>
                        <div className="absolute bottom-10 left-7 text-maroon text-sm font-medium">
                          Register your <br /> account
                        </div>
                      </div>
                      <div
                        className={`w-64 h-64 bg-white bg-opacity-10 rounded-3xl relative border-2 border-gray ${styles["floating-4"]}`}
                      >
                        <div className="w-6 h-6 text-maroon rounded-full flex items-center justify-center text-sm font-bold absolute top-7 left-7 border-2">
                          3
                        </div>
                        <div className="absolute bottom-10 left-7 text-maroon text-sm font-medium">
                          Wait until the admin verifies <br />
                          your account
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Container */}
            <div className="col-span-2 flex items-center justify-center max-w-lg h-full ">
              <div className="w-full relative">
                <form
                  className="relative h-full flex flex-col bg-white dark:bg-transparent border-2 rounded-2xl p-8"
                  onSubmit={handleCreateAccount}
                >
                  <p className="text-black text-3xl font-Merriweather dark:text-white">
                    Registration
                  </p>
                  <div className="flex flex-col gap-y-3 py-4">
                    <div className="w-full flex flex-row gap-x-6">
                      <div className="flex flex-col w-full">
                        <TextInput
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Institutional Email"
                          label="Institutional Email"
                          type="email"
                          id="email"
                        />
                        {errors.idno && (
                          <p className="text-red-500 text-sm font-Jaldi font-semibold">
                            {errors?.email?._errors[0]}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <TextInput
                          value={idno}
                          onChange={(e) => setIdNo(e.target.value)}
                          placeholder="ID Number"
                          label="ID Number"
                          type="text"
                          id="idno"
                        />
                        {errors.idno && (
                          <p className="text-red-500 text-sm font-Jaldi font-semibold">
                            {errors.idno._errors[0]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-full flex flex-row gap-x-6">
                      <div className="flex flex-col w-full">
                        <TextInput
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First Name"
                          label="First Name"
                          type="text"
                          id="firstName"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm font-Jaldi font-semibold">
                            {errors.firstName._errors[0]}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <TextInput
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last Name"
                          label="Last Name"
                          type="text"
                          id="lastName"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm font-Jaldi font-semibold">
                            {errors.lastName._errors[0]}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <label
                          htmlFor="gender"
                          className="relative block rounded-md bg-white border border-gray-400 p-1 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black w-full"
                        >
                          <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            placeholder="Gender"
                            className="peer border-none bg-white placeholder-white focus:border-gray-800 focus:outline-none focus:ring-0 rounded-md w-full dark:text-black"
                            required
                          >
                            {genderOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <span className="pointer-events-none absolute start-2.5 bg-white top-0 -translate-y-1/2 p-1 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                            Gender
                          </span>
                        </label>
                        {errors.gender && (
                          <p className="text-red-500 text-sm font-Jaldi font-semibold">
                            {errors.gender._errors[0]}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="w-full flex flex-row gap-x-6">
                      <div className="flex flex-col w-full">
                        <TextInput
                          value={password}
                          onChange={handlePasswordChange}
                          placeholder="Password"
                          label="Password"
                          type="password"
                          id="password"
                        />
                        {errors.password && (
                          <p className="text-red-500 text-sm font-Jaldi font-semibold">
                            {errors.password._errors[0]}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col w-full">
                        <TextInput
                          value={passwordCheck}
                          onChange={handlePasswordCheck}
                          placeholder="Confirm Password"
                          label="Confirm Password"
                          type="password"
                          id="passwordCheck"
                        />
                        {isEmptyError && (
                          <p className="text-red-500 text-sm font-Jaldi font-semibold">
                            Please confirm password
                          </p>
                        )}
                        {isMismatchError && (
                          <p className="text-red-500 text-sm font-Jaldi font-semibold">
                            Passwords do not match
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="gender"
                        className="relative block rounded-md bg-white border border-gray-400 p-1 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black w-full"
                      >
                        <select
                          value={role}
                          onChange={handleRoleChange}
                          className="peer border-none bg-white placeholder-white focus:border-gray-800 focus:outline-none focus:ring-0 rounded-md w-full dark:text-black"
                          required
                        >
                          <option value="">Select</option>
                          <option value="student">Student</option>
                          <option value="teacher">Teacher</option>
                          <option value="counselor">Counselor</option>
                        </select>
                        <span className="pointer-events-none absolute start-2.5 bg-white top-0 -translate-y-1/2 p-1 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                          Role
                        </span>
                      </label>
                      {errors.role && (
                        <p className="text-red-500 text-sm font-Jaldi font-semibold">
                          {errors.role._errors[0]}
                        </p>
                      )}
                    </div>
                    {/* Conditionally Rendered Fields */}
                    {role === "student" && (
                      <>
                        <div className="w-full flex flex-row gap-x-6">
                          <div className="flex flex-col w-full">
                            <label
                              htmlFor="birthdate"
                              className="relative block rounded-md bg-white border border-gray-400 p-1 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black w-full"
                            >
                              <DatePicker
                                selected={birthdate}
                                onChange={(date) => setBirthdate(date)}
                                className="peer border-none bg-white placeholder-white focus:border-gray-800 focus:outline-none focus:ring-0 rounded-md w-full dark:text-black"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                locale="en-GB"
                                maxDate={new Date()}
                                required
                              />
                              <span className="pointer-events-none absolute start-2.5 bg-white top-0 -translate-y-1/2 p-1 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                                Birthdate
                              </span>
                            </label>
                            {errors.birthdate && (
                              <p className="text-red-500 text-sm font-Jaldi font-semibold">
                                {errors.birthdate._errors[0]}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col w-full">
                            <TextInput
                              value={contactNumber}
                              onChange={(e) => setContactNumber(e.target.value)}
                              placeholder="Contact Number"
                              label="Contact Number"
                              type="tel"
                              id="contactNumber"
                            />
                            {errors.contactNumber && (
                              <p className="text-red-500 text-sm font-Jaldi font-semibold">
                                {errors.contactNumber._errors[0]}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="w-full flex flex-row gap-x-6">
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
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                              <span className="pointer-events-none absolute start-2.5 bg-white top-0 -translate-y-1/2 p-1 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                                Department
                              </span>
                            </label>
                            {errors.college && (
                              <p className="text-red-500 text-sm font-Jaldi font-semibold">
                                {errors.college._errors[0]}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col w-full">
                            <label
                              htmlFor="gender"
                              className="relative block rounded-md bg-white border border-gray-400 p-1 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black w-full"
                            >
                              <select
                                value={program}
                                onChange={(e) => setProgram(e.target.value)}
                                className="peer border-none bg-white placeholder-white focus:border-gray-800 focus:outline-none focus:ring-0 rounded-md w-full dark:text-black"
                                required
                              >
                                {programOptions[college]?.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                              <span className="pointer-events-none absolute start-2.5 bg-white top-0 -translate-y-1/2 p-1 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                                Course
                              </span>
                            </label>
                            {errors.program && (
                              <p className="text-red-500 text-sm font-Jaldi font-semibold">
                                {errors.program._errors[0]}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col w-full">
                            <TextInput
                              value={year}
                              onChange={(e) => setYear(e.target.value)}
                              placeholder="Year"
                              label="Year"
                              type="text"
                              id="year"
                            />
                            {errors.year && (
                              <p className="text-red-500 text-sm font-Jaldi font-semibold">
                                {errors.year._errors[0]}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col w-full">
                          <TextInput
                            value={permanentAddress}
                            onChange={(e) =>
                              setPermanentAddress(e.target.value)
                            }
                            placeholder="Permanent Address"
                            label="Permanent Address"
                            type="text"
                            id="permanentAddress"
                          />
                          {errors.permanentAddress && (
                            <p className="text-red-500 text-sm font-Jaldi font-semibold">
                              {errors.permanentAddress._errors[0]}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                    {/* {role === "teacher" && (
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="gender"
                        className="relative block rounded-md bg-white border border-gray-400 p-1 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black w-full"
                      >
                        <select
                          value={college}
                          onChange={(e) => setCollege(e.target.value)}
                          className="peer border-none bg-white placeholder-white focus:border-gray-800 focus:outline-none focus:ring-0 rounded-md w-full"
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
                      {errors.college && (
                        <p className="text-red-500 text-sm font-Jaldi font-semibold">
                          {errors.college._errors[0]}
                        </p>
                      )}
                    </div>
                  )} */}

                    {role === "counselor" && (
                      <>
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
                          {errors.college && (
                            <p className="text-red-500 text-sm font-Jaldi font-semibold">
                              {errors.college._errors[0]}
                            </p>
                          )}
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

                            <span className="pointer-events-none absolute start-2.5 bg-white top-0 -translate-y-1/2 p-1 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                              Programs
                            </span>
                          </label>
                          {errors.program && (
                            <p className="text-red-500 text-sm font-Jaldi font-semibold">
                              {errors.program._errors[0]}
                            </p>
                          )}
                        </div>
                        <div>
                          <label>Select Year Levels</label>
                          {yearLevelOptions.map((option) => (
                            <div
                              key={option.value}
                              className="flex gap-2 items-center"
                            >
                              <input
                                type="checkbox"
                                value={option.value}
                                onChange={handleYearLevelChange}
                                checked={selectedYearLevels.includes(
                                  option.value
                                )}
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                              />
                              <label>{option.label}</label>
                            </div>
                          ))}
                        </div>
                        {errors.assignedYear && (
                          <p className="text-red-500 text-sm font-Jaldi font-semibold">
                            {errors.assignedYear._errors[0]}
                          </p>
                        )}
                      </>
                    )}
                    <div className="w-full flex items-center gap-x-2 py-2">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={handleTermsChange}
                        disabled={!role}
                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                      />
                      <label className="text-sm font-bold text-gray-700">
                        I accept the{" "}
                        <a
                          href="/terms"
                          className="hover:underline text-maroon"
                        >
                          terms and conditions
                        </a>
                      </label>
                    </div>

                    <div className="flex flex-col w-full mt-7">
                      <div className="flex flex-col w-full">
                        <FullButton onClick={handleCreateAccount}>
                          Create Account
                        </FullButton>
                      </div>
                      <div className="w-full mt-4 flex justify-center">
                        <p>
                          Already have an account?{" "}
                          <span
                            className="cursor-pointer font-bold text-maroon"
                            onClick={handleLoginClick}
                          >
                            Log In
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {showTermsNotAccepted && (
            <ModalTermsUnchecked
              setShowTermsNotAccepted={setShowTermsNotAccepted}
            />
          )}
          {/* terms and conditions not accepted */}

          {showRegistrationSuccessful && (
            <ModalRegistrationSuccessful
              setShowRegistrationSuccessful={setShowRegistrationSuccessful}
              //  to be deleted

              handleLoginClick={handleLoginClick}
            />
          )}
        </div>
      </ScrollAnimationWrapper>
    </section>
  );
};

export default Registration;
