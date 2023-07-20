import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
  Legend,
  Tooltip,
  CartesianGrid,
} from "recharts";

function InkyChart({ data, error }) {
  return (
    <div className="chart">
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              width={500}
              height={300}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default InkyChart;
