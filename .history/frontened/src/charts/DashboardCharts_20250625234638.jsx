import React, { useState, useEffect } from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57"];

const DynamicChart = ({ data }) => {
  const [numericKeys, setNumericKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) return;

    const sample = data.find((item) => item && typeof item === "object");
    if (!sample) return;

    const keys = Object.keys(sample).filter(
      (key) => typeof sample[key] === "number"
    );

    setNumericKeys(keys);
    if (keys.length > 0) setSelectedKey(keys[0]);
  }, [data]);

  if (!Array.isArray(data) || data.length === 0) return <p>No data available.</p>;
  if (!selectedKey) return <p>No numeric field to visualize.</p>;

  const chartData = data
    .filter(item => item && typeof item[selectedKey] === "number")
    .map((item, index) => ({
      name: item.Title || item._id || `Item ${index + 1}`,
      value: item[selectedKey],
    }));

  if (chartData.length === 0) return <p>No valid numeric data to display.</p>;

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <select
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          {numericKeys.map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>

        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="bar">Bar</option>
          <option value="line">Line</option>
          <option value="pie">Pie</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        {chartType === "bar" && (
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )}

        {chartType === "line" && (
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        )}

        {chartType === "pie" && (
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicChart;
