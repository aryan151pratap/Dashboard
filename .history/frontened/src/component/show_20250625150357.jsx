import { useState } from "react";

function DataShowcaseOptions({ data }) {
	const [mode, setMode] = useState("json");



	const renderImages = () => (
		<div className="flex flex-wrap gap-2 p-4 bg-white">
			{data.map((item, idx) =>
				Object.entries(item).map(([key, value]) =>
					typeof value === "string" &&
					(value.startsWith("data:image") || /\.(jpg|jpeg|png|gif|webp)$/i.test(value)) ? (
						<div key={`${idx}-${key}`} className="w-25 h-25 sm:w-40 sm:h-40 md:w-40 md:h-40  border rounded overflow-hidden">
							<img
								src={value}
								alt={key}
								className="w-full h-full object-cover"
							/>
							<p className="text-xs text-center">{key}</p>
						</div>
					) : null
				)
			)}
		</div>
	);

	const renderGraph = () => {
		const numericKeys = new Set();
		data.forEach(item =>
			Object.entries(item).forEach(([key, val]) => {
				if (typeof val === "number") numericKeys.add(key);
			})
		);
		const keys = Array.from(numericKeys);

		return (
			<div className="p-4 bg-white">
				{keys.length === 0 ? (
					<p>No numeric data to plot</p>
				) : (
					<div>
						<h2 className="font-semibold mb-2">Graph-Ready Data</h2>
						<table className="w-full text-sm border">
							<thead>
								<tr>
									<th className="border p-1">Index</th>
									{keys.map(k => (
										<th key={k} className="border p-1">{k}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{data.map((item, i) => (
									<tr key={i}>
										<td className="border p-1">{i}</td>
										{keys.map(k => (
											<td key={k} className="border p-1">{item[k]}</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
						<p className="text-gray-500 mt-2 text-xs">You can integrate with Recharts or Chart.js here.</p>
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-2 p-2 bg-zinc-100">
				<button onClick={() => setMode("json")} className="px-3 py-1 bg-blue-600 text-white rounded">JSON</button>
				<button onClick={() => setMode("images")} className="px-3 py-1 bg-green-600 text-white rounded">Images</button>
				<button onClick={() => setMode("graph")} className="px-3 py-1 bg-purple-600 text-white rounded">Graph</button>
			</div>
			<div className="items-center flex justify-center">
				{mode === "images" && renderImages()}
				{mode === "graph" && renderGraph()}
			</div>
		</div>
	);
}

export default DataShowcaseOptions;
