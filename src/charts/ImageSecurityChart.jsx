import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ImageSecurityChart() {
  // Chart data
  const data = [
    {
      name: "Security Issues",
      Critical: 5,
      High: 20,
      Medium: 50,
      Low: 10,
    },
  ];

  return (
    <div className="px-4 py-3">
      <h3 className="font-semibold mb-1">Image Security Issues</h3>
      <div className="text-2xl font-bold">
        85{" "}
        <span className="font-normal text-base text-gray-700">
          Total Issues
        </span>
      </div>

      {/* Stacked Horizontal Bar */}
      <div className="w-full h-16 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" hide />
            <Tooltip />
            <Bar dataKey="Critical" stackId="a" fill="#941a1d" />
            <Bar dataKey="High" stackId="a" fill="#f09e1c" />
            <Bar dataKey="Medium" stackId="a" fill="#ece977" />
            <Bar dataKey="Low" stackId="a" fill="#888888" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex gap-5 mt-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#941a1d] rounded inline-block"></span>
          Critical (5)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#f09e1c] rounded inline-block"></span>
          High (20)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#ece977] rounded inline-block"></span>
          Medium (50)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#888] rounded inline-block"></span>
          Low (10)
        </div>
      </div>
    </div>
  );
}
