import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const {
    institutionalEmail,
    idNumber,
    firstName,
    lastName,
    gender,
    password,
    image,
    role, // 'teacher', 'student', or 'counselor'
    college,
    program,
    year,
    birthDate,
    contactNumber,
    specificAddress,
    barangay,
    cityMunicipality,
    province,
    zipcode,
  } = await request.json();

  const birthDateObj = new Date(birthDate);
  const yearInt = parseInt(year, 10);

  try {
    const userExists = await db.user.findUnique({
      where: { institutionalEmail: institutionalEmail },
    });

    if (userExists) {
      return NextResponse.json({ message: "User already exists", status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.user.create({
      data: {
        institutionalEmail,
        idNumber,
        firstName,
        lastName,
        gender,
        password: hashedPassword,
        image,
        role,
      },
    });

    let roleData;
    switch (role) {
      case "teacher":
        roleData = await db.teacher.create({
          data: {
            userId: newUser.id,
            college,
          },
        });
        break;
      case "student":
        roleData = await db.student.create({
          data: {
            userId: newUser.id,
            college,
            program,
            year: yearInt,
            birthDate: birthDateObj,
            contactNumber,
            specificAddress,
            barangay,
            cityMunicipality,
            province,
            zipcode,
          },
        });
        break;
      case "counselor":
        roleData = await db.counselor.create({
          data: {
            userId: newUser.id,
          },
        });
        break;
      default:
        throw new Error("Invalid role");
    }
    const user = { ...newUser, role: roleData };

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
