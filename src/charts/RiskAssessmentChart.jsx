import { PieChart, Pie, Cell } from "recharts";
const COLORS = ["#ef4444", "#fbbf24", "#cbd5e1", "#22c55e"];
const data = [
  { name: "Failed", value: 1689 },
  { name: "Warning", value: 681 },
  { name: "Not available", value: 36 },
  { name: "Passed", value: 7253 }
];

export default function RiskAssessmentChart() {
  const total = data.reduce((a, b) => a + b.value, 0);

  return (
    <div className="flex flex-row gap-4 items-center justify-center w-full">
      <PieChart width={140} height={140}>
        <Pie
          data={data}
          cx={70}
          cy={70}
          innerRadius={50}
          outerRadius={65}
          dataKey="value"
          startAngle={90}
          endAngle={450}
        >
          {data.map((entry, i) => (
            <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <text x={70} y={70} textAnchor="middle" dominantBaseline="middle" fontSize={18} fill="#222">
          {total}
          <tspan x={70} y={90} fontSize={12} fill="#888">Total</tspan>
        </text>
      </PieChart>
      <div className="flex flex-col gap-2 ml-2">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block mr-2"></span>
          <span className="text-xs text-gray-700">Failed ({data.value})</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block mr-2"></span>
          <span className="text-xs text-gray-700">Warning ({data[1].value})</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-gray-300 inline-block mr-2"></span>
          <span className="text-xs text-gray-700">Not available ({data[2].value})</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block mr-2"></span>
          <span className="text-xs text-gray-700">Passed ({data[3].value})</span>
        </div>
      </div>
    </div>
  );
}
