import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
} from "recharts";
import { useMemo, useState } from "react";

const COLORS = ["#8884d8", "#82ca9d", "#ff7300", "#e6194B", "#3cb44b", "#4363d8", "#f58231"];

function DynamicChart({ data }) {
	const [selectedKeys, setSelectedKeys] = useState([]);

	// Identify all numeric keys
	const numericKeys = useMemo(() => {
		const keys = new Set();
		data.forEach(item => {
			Object.entries(item).forEach(([key, value]) => {
				if (!isNaN(Number(value))) {
					keys.add(key);
				}
			});
		});
		return Array.from(keys).filter(k => k !== "index"); // exclude "index"
	}, [data]);

	// Clean data for chart use
	const cleanedData = useMemo(() => {
		return data.map((item, i) => {
			const cleanedItem = { index: i };
			numericKeys.forEach(key => {
				cleanedItem[key] = Number(item[key]) || 0;
			});
			return cleanedItem;
		});
	}, [data, numericKeys]);

	// Toggle selected keys
	const handleCheckboxChange = (key) => {
		setSelectedKeys(prev =>
			prev.includes(key)
				? prev.filter(k => k !== key)
				: [...prev, key]
		);
	};

	if (!numericKeys.length) {
		return <p className="text-sm text-red-600 p-4">No numeric data found</p>;
	}

	return (
		<div className="w-full p-4">
			<div className="flex flex-wrap gap-4 mb-4">
				{numericKeys.map((key) => (
					<label key={key} className="flex items-center gap-2 text-sm">
						<input
							type="checkbox"
							checked={selectedKeys.includes(key)}
							onChange={() => handleCheckboxChange(key)}
						/>
						<span>{key}</span>
					</label>
				))}
			</div>

			<div className="h-[300px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={cleanedData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="index" />
						<YAxis />
						<Tooltip />
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
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default DynamicChart;
