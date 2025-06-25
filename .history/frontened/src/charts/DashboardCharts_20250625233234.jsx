import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57"];

const DynamicChart = ({ data }) => {
  const [numericKeys, setNumericKeys] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    if (!data || data.length === 0) return;

    const sample = data[0];
    const keys = Object.keys(sample).filter(
      (key) => typeof sample[key] === "number"
    );
    setNumericKeys(keys);
    if (keys.length > 0) setSelectedKey(keys[0]);
  }, [data]);

  if (!selectedKey) return <p>No numeric field available to plot a chart.</p>;

  const chartData = data.map((item) => ({
    name: item.Title || item._id || "Item",
    value: item[selectedKey]
  }));

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
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        {chartType === "bar" && (
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )}

        {chartType === "line" && (
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line dataKey="value" stroke="#82ca9d" />
          </LineChart>
        )}

        {chartType === "pie" && (
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicChart;
