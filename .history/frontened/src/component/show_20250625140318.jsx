import { useState } from "react";

function DataShowcaseOptions({ data }) {
	const [mode, setMode] = useState("json");

	const renderContent = () => {
		if (!Array.isArray(data)) return <div>No valid data</div>;

		switch (mode) {
			case "json":
				return (
					<div className="bg-black text-green-500 p-2 text-sm overflow-auto">
						{data.map((item, i) => (
							<pre key={i} className="border-b border-gray-700">
								{JSON.stringify(item, null, 2)}
							</pre>
						))}
					</div>
				);

			case "images":
				return (
					<div className="flex flex-wrap gap-4 p-4 bg-white">
						{data.map((item, idx) =>
							Object.values(item).map((v, i) =>
								typeof v === "string" && v.startsWith("http") && /\.(jpg|jpeg|png|gif|webp)$/i.test(v) ? (
									<img
										key={`${idx}-${i}`}
										src={v}
										alt="preview"
										className="w-32 h-32 object-cover border rounded"
									/>
								) : null
							)
						)}
					</div>
				);

			case "graph":
				return (
					<div className="p-4 bg-white">
						<p>Graph view coming soon (requires configuration based on field types)</p>
					</div>
				);

			default:
				return <div>No mode selected</div>;
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-2 p-2 bg-zinc-200">
				<button onClick={() => setMode("json")} className="px-3 py-1 bg-blue-500 text-white rounded">JSON</button>
				<button onClick={() => setMode("images")} className="px-3 py-1 bg-green-500 text-white rounded">Images</button>
				<button onClick={() => setMode("graph")} className="px-3 py-1 bg-purple-500 text-white rounded">Graph</button>
			</div>
			{renderContent()}
		</div>
	);
}

export default DataShowcaseOptions;
