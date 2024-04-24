"use client";
import Questions from "@/components/ui/FAQs";
import Inquiry from "@/components/ui/Inquiry";
import { Navbar } from "@/components/ui/Navbar";
import { useSession } from "next-auth/react";

export default function StudentInquiry() {
  const { data: session, status } = useSession();
  const userId = session?.user.id;

  return (
    <div className="min-h-screen">
      <Navbar userType="student" />
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
      <main className="justify-center items-center h-full w-full">
        <Questions />
        <div className="mx-auto ">
          <Inquiry userId={userId} />
        </div>
      </main>
    </div>
  );
}
