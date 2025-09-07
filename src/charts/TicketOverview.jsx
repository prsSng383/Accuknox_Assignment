import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#f87171", "#34d399", "#facc15"];
const data = [
  { name: "High Priority", value: 3 },
  { name: "Medium Priority", value: 2 },
  { name: "Low Priority", value: 1 },
];

export default function TicketOverview() {
  const total = data.reduce((a, b) => a + b.value, 0);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-4">
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

      <div className="flex flex-col gap-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full inline-block`}
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            ></span>
            <span className="text-sm text-gray-700">{item.name} ({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
