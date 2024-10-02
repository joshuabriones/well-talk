"use client";
import Image from "next/image";

const StatsOverview = () => {
  const stats = [
    {
      title: "Students",
      value: 280,
      icon: "/images/icons/studenticon.svg",
      color: "bg-[#BFE54E]",
    },
    {
      title: "Counselors",
      value: 300,
      icon: "/images/icons/counslricon.svg",
      color: "bg-blue-500",
    },
    {
      title: "Appointments",
      value: 180,
      icon: "/images/icons/activeappt.svg",
      color: "bg-[#F4C522]",
    },
    {
      title: "New Users",
      value: 112,
      icon: "/images/icons/newuser.svg",
      color: "bg-[#F54F5F]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-bgDark2 p-5 rounded-3xl shadow-md flex gap-5"
        >
          <div
            className={`${stat.color} p-3 rounded-3xl flex items-center justify-center`}
          >
            <img src={stat.icon} alt={stat.title} className={`w-12 h-12`} />
          </div>
          <div className="">
            <h3 className="text-base font-medium">{stat.title}</h3>
            <p className="text-3xl text-navgray mt-2">
              {stat.value}{" "}
              {stat.value > 0 && (
                <span>
                  <img
                    src={"/images/icons/increase.svg"}
                    alt="increase"
                    className="inline w-5 h-5"
                  />
                </span>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
