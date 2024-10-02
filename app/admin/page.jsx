"use client";
import Header from "./_admincomponents/Header";
import StatsOverview from "./_admincomponents/StatsOverview";
import StatisticsGraph from "./_admincomponents/StatisticsGraph";
import NewUsersTab from "./_admincomponents/NewUsersTab";
import AppointmentsCount from "./_admincomponents/AppointmentsCount";
import { GenderChart } from "./_admincomponents/GenderChart";
import { TotalUsersGraph } from "./_admincomponents/TotalUsersGraph";

export default function Page() {
  return (
    <div className="flex-1 flex min-h-screen text-white">
      <div className="w-full flex flex-col gap-10">
        <Header title="Dashboard" />
        <div>
          <StatsOverview />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <StatisticsGraph />
            <NewUsersTab />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <TotalUsersGraph />
            <div className="flex flex-col gap-3">
              <AppointmentsCount />
              <GenderChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
