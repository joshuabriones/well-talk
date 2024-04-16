import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    institutionalEmail,
    idNumber,
    firstName,
    middleName,
    lastName,
    password,
    role, // 'teacher', 'student', or 'counselor'
    // Additional fields based on the role
    college,
    program,
    year,
    birthDate,
    contactNumber,
    address,
  } = await request.json();

  const birthDateObj = new Date(birthDate);
  const yearInt = parseInt(year, 10);

  console.log("Role:", role);
  console.log("Password", password);
  console.log("college", college);
  console.log("BirthDate", birthDate);
  console.log("role", role);

  try {
    const newUser = await db.user.create({
      data: {
        institutionalEmail,
        idNumber,
        firstName,
        middleName,
        lastName,
        password,
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
            address,
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
