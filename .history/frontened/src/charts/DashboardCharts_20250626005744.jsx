import {
	ResponsiveContainer,
	LineChart,
	BarChart,
	PieChart,
	Pie,
	Bar,
	Line,
	Cell,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	Legend,
} from "recharts";
import { useMemo, useState, useEffect } from "react";

const COLORS = ["#8884d8", "#82ca9d", "#ff7300", "#e6194B", "#3cb44b", "#4363d8", "#f58231"];

function DynamicChart({ data }) {
	const [selectedKeys, setSelectedKeys] = useState([]);
	const [chartType, setChartType] = useState("line");

	const numericKeys = useMemo(() => {
		const keys = new Set();
		data.forEach(item => {
			Object.entries(item).forEach(([key, value]) => {
				if (!isNaN(Number(value))) keys.add(key);
			});
		});
		return Array.from(keys).filter(k => k !== "index");
	}, [data]);

	const cleanedData = useMemo(() => {
		return data.map((item, i) => {
			const cleanedItem = { index: i };
			numericKeys.forEach(key => {
				cleanedItem[key] = Number(item[key]) || 0;
			});
			return cleanedItem;
		});
	}, [data, numericKeys]);

	// Clear selected keys on chart type switch
	useEffect(() => {
		if (chartType === "pie" && selectedKeys.length > 1) {
			setSelectedKeys([selectedKeys[0]]);
		}
	}, [chartType]);

	const handleCheckboxChange = (key) => {
		setSelectedKeys(prev =>
			prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
		);
	};

	const handlePieSelect = (e) => {
		setSelectedKeys([e.target.value]);
	};

	if (!numericKeys.length) {
		return <p className="text-red-600 p-4">No numeric data found</p>;
	}

	const renderChart = () => {
		if (chartType === "line") {
			return (
				<LineChart data={cleanedData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="index" />
					<YAxis />
					<Tooltip />
					<Legend />
					{selectedKeys.map((key, i) => (
						<Line
							key={key}
							type="monotone"
							dataKey={key}
							stroke={COLORS[i % COLORS.length]}
							strokeWidth={2}
							activeDot={{ r: 5 }}
						/>
					))}
				</LineChart>
			);
		} else if (chartType === "bar") {
			return (
				<BarChart data={cleanedData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="index" />
					<YAxis />
					<Tooltip />
					<Legend />
					{selectedKeys.map((key, i) => (
						<Bar
							key={key}
							dataKey={key}
							fill={COLORS[i % COLORS.length]}
						/>
					))}
				</BarChart>
			);
		} else if (chartType === "pie" && selectedKeys.length === 1) {
			const key = selectedKeys[0];
			const pieData = cleanedData.map((item, i) => ({
				name: `Index ${i}`,
				value: item[key],
			}));
			return (
				<PieChart>
					<Tooltip />
					<Legend />
					<Pie
						data={pieData}
						dataKey="value"
						nameKey="name"
						cx="50%"
						cy="50%"
						outerRadius={100}
						fill="#8884d8"
						label
					>
						{pieData.map((entry, i) => (
							<Cell key={i} fill={COLORS[i % COLORS.length]} />
						))}
					</Pie>
				</PieChart>
			);
		}
		return <p className="text-gray-500">Pie chart supports only 1 key</p>;
	};

	return (
		<div className="w-full p-4">
			<div className="flex flex-wrap gap-4 mb-4">
				{chartType === 'pie' ? (
					<select
						value={selectedKeys[0] || ""}
						onChange={handlePieSelect}
						className="border px-2 py-1 rounded"
					>
						<option value="" disabled>Select a key</option>
						{numericKeys.map((key) => (
							<option key={key} value={key}>
								{key}
							</option>
						))}
					</select>
				) : (
					<div className="flex flex-wrap gap-4">
						{numericKeys.map((key) => (
							<label key={key} className="flex items-center gap-2 text-sm">
								<input
									type="checkbox"
									checked={selectedKeys.includes(key)}
									onChange={() => handleCheckboxChange(key)}
								/>
								{key}
							</label>
						))}
					</div>
				)}
			</div>

			<div className="flex gap-2 mb-4">
				{["line", "bar", "pie"].map(type => (
					<button
						key={type}
						className={`px-2 py-1 rounded ${chartType === type ? "bg-blue-600 text-white" : "bg-gray-200"}`}
						onClick={() => setChartType(type)}
					>{type}</button>
				))}
			</div>

			<div className="h-[300px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					{renderChart()}
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default DynamicChart;
