  import { z } from "zod";

  const idRegex = /^\d{2}-\d{4}-\d{3}$/;

  export const registrationSchema = z
    .object({
      email: z
        .string({ required_error: "Email is required" })
        .trim()
        .min(9, {
          message: "Email must be at least 9 chars",
        })
        .max(255, { message: "Email must not be more than 255 chars long" }),

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
        .refine(
          (value) => {
            return value !== null && value !== undefined && value.trim() !== "";
          },
          {
            message: "Please select a role",
          }
        )
        .refine((value) => ["student", "teacher", "counselor"].includes(value), {
          message: "Select a valid role",
        }),
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
    specificAddress: z.string().nonempty("Specific Address is required"),
    barangay: z.string().nonempty("Barangay is required"),
    cityMunicipality: z.string().nonempty("City/Municipality is required"),
    province: z.string().nonempty("Province is required"),
    zipcode: z.string().nonempty("Zip Code is required"),
    college: z.string().nonempty("College is required"),
    program: z.string().nonempty("Program is required"),
    year: z.string().nonempty("Year is required"),
  });

  export const teacherSchema = z.object({
    college: z.string().nonempty("College is required"),
  });
