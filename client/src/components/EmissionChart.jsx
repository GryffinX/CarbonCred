import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Aug", earned: 20, used: 5 },
  { month: "Sep", earned: 35, used: 10 },
  { month: "Oct", earned: 40, used: 20 },
  { month: "Nov", earned: 55, used: 25 },
  { month: "Dec", earned: 60, used: 30 },
  { month: "Jan", earned: 75, used: 45 },
];

function EmissionChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Emission Credits Over Time
      </h2>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="earned"
              stroke="#16a34a"
              strokeWidth={3}
              name="Credits Earned"
            />

            <Line
              type="monotone"
              dataKey="used"
              stroke="#f97316"
              strokeWidth={3}
              name="Credits Used"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EmissionChart;
