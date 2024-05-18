import { DonutChart } from "@tremor/react";

const datahero = [
  {
    name: "BSCE",
    value: 9800,
  },
  {
    name: "BSIT",
    value: 4567,
  },
  {
    name: "BSME",
    value: 3908,
  },
  {
    name: "BSN",
    value: 2400,
  },
  {
    name: "BSCS",
    value: 2174,
  },
  {
    name: "BSEE",
    value: 1398,
  },
];

const dataFormatter = (number) => number.toString();

export const PieGraph = () => (
  <div className="w-full flex flex-col items-center justify-between rounded-2xl bg-white mt-7 p-8">
    <h3 className="text-lg font-bold text-tremor-content-strong">
      Stundent Programs
    </h3>
    <DonutChart
      data={datahero}
      variant="donut"
      valueFormatter={dataFormatter}
      onValueChange={(v) => console.log(v)}
      showAnimation={true}
      colors={["blue", "cyan", "indigo", "violet", "fuchsia", "pink-400"]}
      className="h-72 w-full"
    />
  </div>
);
