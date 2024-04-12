import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST() {
  // User data
  const id = 1;
  const firstName = "Joshua";
  const lastName = "Briones";
  const middleName = "Empasis";
  const idNumber = "19-1911-377";
  const institutionalEmail = "joshua.briones@cit.edu"; // Use institutionalEmail
  const gender = "male";
  const password = "testpassword";

  try {
    const newUser = await db.user.create({
      data: {
        id,
        firstName,
        lastName,
        middleName,
        idNumber,
        institutionalEmail, // Use institutionalEmail
        gender,
        password,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    // Handle error appropriately, e.g., return error message
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const users = await db.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 400 }
    );
  }
}
