import React from "react";

const TotalCountCard = ({ totalCountData }) => {
  return (
    <div className="w-full flex gap-5">
      {totalCountData.map((data, index) => (
        <div
          className={`flex-1 text-slate-50 ${data.bg} rounded-2xl px-7 p-5 flex justify-between items-center`}
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
