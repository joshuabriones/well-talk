"use client";
import { Navbar } from "@/components/ui/Navbar";
import { useState } from "react";
import "../../../css/createblog.css";
import CreatePostSection from "@/components/ui/CreatePost";

export default function CounselorBlog() {
  const [selectedButton, setSelectedButton] = useState("view");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    if (button === "create") {
      setIsCreateModalOpen(true);
    }
  };
  return (
    <div>
      <main className="min-h-screen">
        <Navbar userType="counselor" />
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
        
        <div className="py-36">
        <CreatePostSection />
        </div>
      </main>
    </div>
  );
}
