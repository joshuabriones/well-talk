import { Cancel } from "@mui/icons-material";
import { LineChart } from "@tremor/react";
const chartdata = [
  {
    date: "Jan 22",
    Approved: 2890,
    Pending: 2338,
    Cancelled: 1800,
  },
  {
    date: "Feb 22",
    Approved: 2756,
    Pending: 2103,
    Cancelled: 1930,
  },
  {
    date: "Mar 22",
    Approved: 3322,
    Pending: 2194,
    Cancelled: 2000,
  },
  {
    date: "Apr 22",
    Approved: 3470,
    Pending: 2108,
    Cancelled: 4200,
  },
  {
    date: "May 22",
    Approved: 3475,
    Pending: 1812,
    Cancelled: 2323,
  },
  {
    date: "Jun 22",
    Approved: 3129,
    Pending: 1726,
    Cancelled: 4034,
  },
  {
    date: "Jul 22",
    Approved: 3490,
    Pending: 1982,
    Cancelled: 2005,
  },
  {
    date: "Aug 22",
    Approved: 2903,
    Pending: 2012,
    Cancelled: 1990,
  },
  {
    date: "Sep 22",
    Approved: 2643,
    Pending: 2342,
    Cancelled: 2111,
  },
  {
    date: "Oct 22",
    Approved: 2837,
    Pending: 2473,
    Cancelled: 2341,
  },
  {
    date: "Nov 22",
    Approved: 2954,
    Pending: 3848,
    Cancelled: 3343,
  },
  {
    date: "Dec 22",
    Approved: 3239,
    Pending: 3736,
    Cancelled: 3459,
  },
];

// const dataFormatter = (number) =>
//   `$${Intl.NumberFormat('us').format(number).toString()}`;

const dataFormatter = (number) => number.toString();

export function LineGraph() {
  return (
    <div className="mt-7 rounded-2xl bg-white p-8 drop-shadow-lg w-full">
      <h3 className="text-lg font-bold text-tremor-content-strong">
        Appointments Over Time
      </h3>
      <LineChart
        className="h-96 w-full"
        data={chartdata}
        index="date"
        valueFormatter={dataFormatter}
        categories={["Approved", "Cancelled", "Pending"]}
        colors={["indigo", "cyan", "purple-500"]}
        yAxisWidth={60}
        showAnimation={true}
        curveType="monotone"
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
}
