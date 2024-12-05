"use client";
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { useRef } from 'react';
import AppointmentsCount from "./_admincomponents/AppointmentsCount";
import { GenderChart } from "./_admincomponents/GenderChart";
import Header from "./_admincomponents/Header";
import NewUsersTab from "./_admincomponents/NewUsersTab";
import StatisticsGraph from "./_admincomponents/StatisticsGraph";
import StatsOverview from "./_admincomponents/StatsOverview";
import { TotalUsersGraph } from "./_admincomponents/TotalUsersGraph";

export default function Page() {
  const chartRef = useRef();

  const handleExport = async () => {
    if (!chartRef.current) {
      console.error('Chart reference is null.');
      return;
    }

    try {
      const imgData = await toPng(chartRef.current, { cacheBust: true });
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
      pdf.save('Welltalk Report.pdf');
    } catch (error) {
      console.error('Error exporting chart:', error);
    }
  };

  console.log("Sample");

  return (
    <div className="flex-1 flex min-h-screen text-white">
      <div className="w-full flex flex-col gap-10">
        <Header title="Dashboard" />
        <div ref={chartRef}>
          <StatsOverview />
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-6 md:gap-x-0 gap-y-6 mt-6">
            <StatisticsGraph />
            <NewUsersTab />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-6 md:gap-x-0 gap-y-6 mt-6">
            <TotalUsersGraph />
            <div className="flex flex-col lg:gap-3 xs:gap-6">
              <AppointmentsCount />
              <GenderChart />
            </div>
          </div>
        </div>
        <div className = "flex justify-center ">
        <button onClick={handleExport} className="text-xl bg-white text-lightMaroon font-bold flex items-center gap-2 p-3 hover:bg-gold dark:hover:bg-bgDark1 rounded-lg transition-all duration-300">Export to PDF</button>
        </div>
      </div>
    </div>
  );
}
