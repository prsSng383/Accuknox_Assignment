import { PieChart, Pie, Cell } from "recharts";
const COLORS = ["#3b82f6", "#93c5fd"];
const data = [
  { name: "Connected", value: 2 },
  { name: "Not Connected", value: 2 }
];

export default function CloudAccountsChart() {
  const total = data.reduce((a, b) => a + b.value, 0);

  return (
    <div className="flex flex-col items-center justify-center w-full">
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
        <text x={70} y={70} textAnchor="middle" dominantBaseline="middle" fontSize={22} fill="#222">
          {total}
          <tspan x={70} y={92} fontSize={12} fill="#888">Total</tspan>
        </text>
      </PieChart>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-600 inline-block mr-2"></span>
          <span className="text-sm text-gray-700">Connected ({data.value})</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-300 inline-block mr-2"></span>
          <span className="text-sm text-gray-700">Not Connected ({data[1].value})</span>
        </div>
      </div>
    </div>
  );
}
