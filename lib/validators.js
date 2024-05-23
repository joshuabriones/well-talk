import { z } from "zod";

export const registrationSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    idno: z.string().nonempty("ID Number is required"),
    firstName: z.string().nonempty("First Name is required"),
    lastName: z.string().nonempty("Last Name is required"),
    gender: z.string().nullable().optional(),
    birthdate: z.string().nonempty("Birthdate is required"),
    contactNumber: z.string().nonempty("Contact Number is required"),
    specificAddress: z.string().nonempty("Specific Address is required"),
    barangay: z.string().nonempty("Barangay is required"),
    cityMunicipality: z.string().nonempty("City/Municipality is required"),
    province: z.string().nonempty("Province is required"),
    zipcode: z.string().nonempty("Zip Code is required"),
    role: z
      .string()
      .nullable()
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
      })
      .optional(),
    college: z.string().nonempty("College is required"),
    program: z.string().nonempty("Program is required"),
    year: z.string().nonempty("Year is required"),
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
