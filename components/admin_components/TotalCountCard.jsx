import React from "react";

const TotalCountCard = () => {
  const totalCountData = [
    {
      title: "Total Students",
      count: 312,
      icon: "/student-ad.png",
      bg: "bg-gradient-red-card",
    },
    {
      title: "Total Teachers",
      count: 21,
      icon: "/teacher-ad.png",
      bg: "bg-gradient-green-card",
    },
    {
      title: "Total Counselors",
      count: 5,
      icon: "/counselor-da.png",
      bg: "bg-gradient-blue-card",
    },
    {
      title: "Total Appointments",
      count: 300,
      icon: "/calendar-ad.png",
      bg: "bg-gradient-purple-card",
    },
  ];

  return (
    <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
      {totalCountData.map((data, index) => (
        <div
          key={data.title}
          className={`shadow-xl text-slate-50 ${data.bg} rounded-2xl px-7 lg:py-5 sm:py-3 flex justify-between items-center`}
        >
          <div>
            <div className="text-lg">{data.title}</div>
            <div className="text-6xl font-bold">{data.count}</div>
          </div>
          <img src={data.icon} className="h-2/3 p-3 border-2 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default TotalCountCard;
