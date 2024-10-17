import { z } from "zod";

// const idRegex = /^\d{2}-\d{4}-\d{3}$/;
const idRegex = /^(\d{4}|\d{2}-\d{4}-\d{3})$/;

export const registrationSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .min(9, {
        message: "Email must be at least 9 characters",
      })
      .max(255, { message: "Email must not be more than 255 characters long" }),
    idno: z
      .string({ required_error: "ID number is required" })
      .trim()
      .min(4, { message: "ID number must be at least 4 characters" })
      .max(11, {
        message: "ID number must not be more than 11 characters",
      })
      .refine((idno) => idRegex.test(idno), {
        message: "ID number must be in the format 0000 or 00-0000-000",
      }),
    firstName: z
      .string({ required_error: "First Name is required" })
      .min(2, { message: "First Name must be at least 2 characters" }),
    lastName: z
      .string({ required_error: "Last Name is required" })
      .min(2, { message: "Last Name must be at least 2 characters" }),
    gender: z.string().nonempty("Gender is required"),
    role: z
      .string()
      .nonempty("Role is required")
      .refine((value) => ["student", "teacher", "counselor"].includes(value), {
        message: "Select a valid role",
      }),
    college: z.string().nonempty("College is required"),
    program: z.string().nonempty("Program is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include uppercase, lowercase, number, and special character"
      ),
    passwordCheck: z.string().nonempty("Please confirm your password"),
    termsAccepted: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "Passwords do not match",
    path: ["passwordCheck"],
  });

export const studentSchema = z.object({
  birthdate: z.string().nonempty("Birthdate is required"),
  contactNumber: z.string().nonempty("Contact Number is required").min(3, {
    message: "Contact Number must be at least 3 characters",
  }),
  permanentAddress: z.string().nonempty("Permanent Address is required"),
  year: z.string().nonempty("Year is required"),
  currentAddress: z.string().nonempty("Current Address is required"),
  guardianName: z.string().nonempty("Guardian Name is required"),
  guardianContact: z.string().nonempty("Guardian Contact is required"),
  guardianRelationship: z.string().nonempty("Relationship is required"),
});

export const counselorSchema = z.object({
  assignedYear: z.string().nonempty("Assigned Year is required"),
});
