import { LineGraph } from "../LineGraph";
import { BarGraph } from "../BarGraph";
import { PieGraph } from "../PieGraph";
import TotalCountCard from "../TotalCountCard";

const Dashboard = () => {
  const totalCountData = [
    {
      title: "Total Students",
      count: 312,
      icon: "/student-ad.png",
      bg: "bg-[#FF6F61]",
    },
    {
      title: "Total Teachers",
      count: 21,
      icon: "/teacher-ad.png",
      bg: "bg-[#66C97F]",
    },
    {
      title: "Total Counselors",
      count: 5,
      icon: "/counselor-da.png",
      bg: "bg-[#6EA9FF]",
    },
    {
      title: "Total Appointments",
      count: 300,
      icon: "/calendar-ad.png",
      bg: "bg-[#A785FF]",
    },
  ];

  return (
    <section className="w-full font-Merriweather pl-4">
      <h1 className="font-bold text-3xl mb-1">Dashboard</h1>
      <p className="text-slate-600 mb-7">Welcome back to WellTalk Admin!</p>
      <TotalCountCard totalCountData={totalCountData} />
      <LineGraph />
      <div className="grid grid-cols-3 gap-10">
        <BarGraph />
        <PieGraph />
      </div>
    </section>
  );
};

export default Dashboard;
