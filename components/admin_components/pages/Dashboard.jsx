import { LineGraph } from "../LineGraph";
import { BarGraph } from "../BarGraph";
import { PieGraph } from "../PieGraph";
import TotalCountCard from "../TotalCountCard";

const Dashboard = () => {
  return (
    <section className="w-full font-Merriweather pl-4">
      <h1 className="font-bold text-3xl mb-1">Dashboard</h1>
      <p className="text-slate-600 mb-7">Welcome back to WellTalk Admin!</p>
      <TotalCountCard />
      <LineGraph />
      <div className="grid lg:grid-cols-3 md:gap-10 sm:grid-cols-2">
        <BarGraph />
        <PieGraph />
      </div>
    </section>
  );
};

export default Dashboard;