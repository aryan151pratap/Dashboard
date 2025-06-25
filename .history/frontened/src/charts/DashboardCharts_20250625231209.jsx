import React, { useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample Data
const skillData = [
  { skill: "Python", count: 5 },
  { skill: "JavaScript", count: 3 },
  { skill: "SQL", count: 2 },
];

const timeData = [
  { date: "2024-01", count: 1 },
  { date: "2024-02", count: 3 },
  { date: "2024-03", count: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

export default function DashboardCharts() {
  const [visible, setVisible] = useState({
    pie: true,
    bar: true,
    line: true,
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📊 MongoDB Data Visualizations</h2>

      {/* Toggle Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        {["pie", "bar", "line"].map((chart) => (
          <button
            key={chart}
            onClick={() =>
              setVisible((prev) => ({ ...prev, [chart]: !prev[chart] }))
            }
            className={`px-4 py-2 rounded ${
              visible[chart] ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            {chart.toUpperCase()} Chart
          </button>
        ))}
      </div>

      {/* Pie Chart */}
      {visible.pie && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-2">Skill Distribution (Pie)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={skillData}
                dataKey="count"
                nameKey="skill"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {skillData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Bar Chart */}
      {visible.bar && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-2">Skill Counts (Bar)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillData}>
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Line Chart */}
      {visible.line && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Growth Over Time (Line)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
