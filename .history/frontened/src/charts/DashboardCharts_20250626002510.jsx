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

function DynamicChart({ data }) {
	const [selectedKey, setSelectedKey] = useState("");

	// Step 1: Identify all numeric keys
	const numericKeys = useMemo(() => {
		const keys = new Set();
		data.forEach(item => {
			Object.entries(item).forEach(([key, value]) => {
				if (!isNaN(Number(value))) {
					keys.add(key);
				}
			});
		});
		return Array.from(keys).filter(k => k !== "index"); // exclude "index" from dropdown
	}, [data]);

	// Step 2: Preprocess data
	const cleanedData = useMemo(() => {
		return data.map((item, i) => {
			const cleanedItem = { index: i };
			numericKeys.forEach(key => {
				cleanedItem[key] = Number(item[key]) || 0;
			});
			return cleanedItem;
		});
	}, [data, numericKeys]);

	if (!numericKeys.length) {
		return <p className="text-sm text-red-600 p-4">No numeric data found</p>;
	}

	const displayKey = selectedKey || numericKeys[0];

	return (
		<div className="w-full h-[300px] p-4">
			<select
				value={displayKey}
				onChange={(e) => setSelectedKey(e.target.value)}
				className="mb-2 px-2 py-1 border rounded"
			>
				{numericKeys.map(key => (
					<option key={key} value={key}>
						{key}
					</option>
				))}
			</select>

			<ResponsiveContainer width="100%" height="90%">
				<LineChart data={cleanedData}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="index" />
					<YAxis />
					<Tooltip />
					<Line
						type="monotone"
						dataKey={displayKey}
						stroke="#82ca9d"
						activeDot={{ r: 6 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export default DynamicChart;
