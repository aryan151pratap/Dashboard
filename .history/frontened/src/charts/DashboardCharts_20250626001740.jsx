import { useMemo, useState } from "react";
import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
} from "recharts";

function DynamicChart({ data }) {
	const [selectedKey, setSelectedKey] = useState("");

	const numericKeys = useMemo(() => {
		const keys = new Set();
		data?.forEach(item => {
			Object.entries(item || {}).forEach(([key, val]) => {
				if (typeof val === "number") keys.add(key);
			});
		});
		return Array.from(keys);
	}, [data]);

	if (!Array.isArray(data) || data.length === 0 || numericKeys.length === 0) {
		return (
			<div className="text-sm text-red-600 p-4">
				No numeric data available to display a chart.
			</div>
		);
	}

	const displayKey = selectedKey || numericKeys[0];

	return (
		<div className="h-[300px] p-4">
			<select
				value={displayKey}
				onChange={e => setSelectedKey(e.target.value)}
				className="mb-2 border px-2 py-1 rounded text-sm"
			>
				{numericKeys.map(k => (
					<option key={k} value={k}>
						{k}
					</option>
				))}
			</select>

			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="index" />
					<YAxis />
					<Tooltip />
					<Line type="monotone" dataKey={displayKey} stroke="#8884d8" />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export default DynamicChart;
