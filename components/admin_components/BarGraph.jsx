import { BarChart } from "@tremor/react";

const chartdata = [
  {
    name: "Students",
    "Number of users ": 2488,
  },
  {
    name: "Teachers",
    "Number of users ": 1445,
  },
  {
    name: "Counselors",
    "Number of users ": 743,
  },
];

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

export const BarGraph = () => (
  <div className="w-full rounded-2xl bg-white mt-7 p-8 col-span-2">
    <h3 className="text-lg font-bold text-tremor-content-strong">
      Total Users
    </h3>
    <BarChart
      data={chartdata}
      index="name"
      categories={["Number of users "]}
      colors={["purple-400"]}
      valueFormatter={dataFormatter}
      yAxisWidth={100}
      onValueChange={(v) => console.log(v)}
      showAnimation={true}
      layout="vertical"
    />
  </div>
);
