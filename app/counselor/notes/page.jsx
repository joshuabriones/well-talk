"use client";

import { Navbar } from "@/components/ui/Navbar";
import hdrEvents from "@/public/images/headers/hdrEvents.png";
import Image from "next/image";
import { useState } from "react";

// css
import "@/styles/counselor.css";

export default function Home() {
  const dummyData = [
    {
      name: "Joshua E. Briones",
      date: "January 09, 2024",
      image:
        "https://img.freepik.com/free-photo/view-3d-cool-modern-bird_23-2150946449.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725580800&semt=ais_hybrid",
      notes: "This is a random note that you will read ",
    },
    {
      name: "John Doe",
      date: "June 29, 2024",
      image:
        "https://img.freepik.com/premium-photo/duck-with-goggles-scarf-his-head_1086710-21632.jpg",
      notes: "This is a random note that you will read ",
    },
    {
      name: "Elly Maine",
      date: "December 05, 2024",
      image:
        "https://img.freepik.com/free-photo/view-3d-cool-modern-bird_23-2150946639.jpg",
      notes: "This is a random note that you will read ",
    },
  ];
  return (
    <div className="min-h-screen w-full">
      {/* navigation bar */}
      <Navbar userType="counselor" />

      {/* header */}
      <div className="w-full h-[55vh] relative">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url(${hdrEvents.src})`,
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="flex flex-col text-left px-44 py-10 gap-y-4">
            <h1 className="font-Merriweather text-8xl">Notes</h1>
            <p className="w-1/2 font-Jaldi text-xl">
              Facilitate student events and foster meaningful connections with
              counselors. Students can ask questions, seek guidance, and receive
              personalized support to navigate their academic and personal
              journey effectively.
            </p>
          </div>
        </div>
      </div>

      <div className="flex mx-auto w-1/2 pt-10">
        <section className="w-full divide-y divide-slate-200 rounded">
          {dummyData.map((data, index) => (
            <details className="group p-4" open key={index}>
              <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={data.image}
                      alt="user image"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div>
                    <h1 className="font-Merriweather text-2xl">{data.name}</h1>
                    <p className="text-slate-500">{data.date}</p>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-labelledby="title-ac06 desc-ac06"
                >
                  <title id="title-ac06">Open icon</title>
                  <desc id="desc-ac06">
                    icon that represents the state of the summary
                  </desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </summary>
              <p className="mt-4 text-slate-500">{data.notes}</p>
            </details>
          ))}
        </section>
      </div>
    </div>
  );
}
