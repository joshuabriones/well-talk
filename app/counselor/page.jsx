"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
const CounselorPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status]);

  if (status === "loading" || !session) {
    return <div>Loading...</div>;
  }

  // Redirect authenticated users who are not counselors
  if (session.user.role !== "counselor") {
    router.push("/login"); // Redirect to homepage or appropriate page
    return null; // Prevent rendering anything if redirecting
  }

  console.log(session);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Navbar userType="counselor" />
      <h1>Counselor Page</h1>
      <button
        className="pointer px-4 py-8"
        onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
      >
        Logout
      </button>
      <p>User Data</p>
      <img src={session?.user.image} />
      <p>User id (in db): {session?.user.id}</p>
      <p>Name: {session?.user.name}</p>
      <p>Gender: {session?.user.gender}</p>
      <p>School Id: {session?.user.idNumber}</p>
      <p>Institutional email: {session?.user.email}</p>
      <p>Password (hashed): {session?.user.password}</p>
      <p>Role: {session?.user.role}</p>
    </div>
  );
};

export default CounselorPage;
