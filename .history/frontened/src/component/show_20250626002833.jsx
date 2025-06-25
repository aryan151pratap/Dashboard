import { useState } from "react";
import Table from "./table";
import DynamicChart from "../charts/DashboardCharts";

function DataShowcaseOptions({ data }) {
	const [mode, setMode] = useState("json");
	const [showTable, setShowTable] = useState(false);
	const [show_img, setShow_img] = useState('');
	const [selectedKeys, setSelectedKeys] = useState([]);

	const renderImages = () => (
		<div className="w-full flex justify-center">
			<div className="w-fit flex flex-wrap gap-4 p-4">	
				{data.map((item, idx) =>
					Object.entries(item).map(([key, value]) => {
						if (typeof value !== "string") return null;

						const isPureBase64 = value.length > 100 && /^[A-Za-z0-9+/=]+$/.test(value);
						const src = isPureBase64 ? `data:image/jpeg;base64,${value}` : (value.startsWith("data:image") || /\.(jpg|jpeg|png|gif|webp)$/i.test(value)) ? value : null;

						return src ? (
						<div key={`${idx}-${key}`} className="hover:scale-90 relative group w-40 h-40 border-2 rounded overflow-hidden transition-transform">
							<img src={src} alt={key} className="w-full h-full object-cover" />
							<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center" onClick={() => setShow_img(src)}>
								<button className="text-white text-2xl bg-white/20 rounded-full p-2 hover:bg-white/40">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
									</svg>									
								</button>
							</div>
							<p className="text-xs text-center mt-1">{key}</p>
						</div>
						) : null;
					})
				)}
			</div>
		</div>
	);

	const renderGraph = () => {
		if (!Array.isArray(data) || data.length === 0) {
			return <p className="text-red-600">No data available</p>;
		}

		const numericKeys = new Set();
		data.forEach(item => {
			Object.entries(item).forEach(([key, val]) => {
				if (typeof val === "number") numericKeys.add(key);
			});
		});
		const keys = Array.from(numericKeys);

		return (
			<div className="p-4 bg-white max-h-[80vh] overflow-auto">
				{keys.length === 0 ? (
					<p>No numeric data to plot</p>
				) : (
					<div>
						<h2 className="font-semibold mb-2">Graph-Ready Data</h2>
						<div className="flex gap-2 flex-wrap mb-2">
							{keys.map(k => (
								<label key={k} className="text-sm">
									<input
										type="checkbox"
										className="mr-1"
										checked={selectedKeys.includes(k)}
										onChange={() => {
											setSelectedKeys(prev =>
												prev.includes(k)
													? prev.filter(i => i !== k)
													: [...prev, k]
											);
										}}
									/>
									{k}
								</label>
							))}
						</div>
						<DynamicChart data={data} keys={selectedKeys} />
					</div>
				)}
			</div>
		);
	};

	const renderTable = () => (
		<div className="overflow-x-auto">
			{showTable ? (
				<Table collection={data} />
			) : (
				<div>
					{data.map((i, index) => (
						<pre key={index} className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
							{JSON.stringify(i, null, 2)}
						</pre>
					))}
				</div>
			)}
		</div>
	);

	return (
		<div className="w-full h-full flex flex-col gap-2">
			<div className="flex gap-2 p-2 bg-zinc-100">
				<button onClick={() => setMode("json")} className="px-3 py-1 bg-blue-600 text-white rounded">JSON</button>
				<button onClick={() => setMode("images")} className="px-3 py-1 bg-green-600 text-white rounded">Images</button>
				<button onClick={() => setMode("graph")} className="px-3 py-1 bg-purple-600 text-white rounded">Graph</button>
				<div className="ml-auto">
					<label className="inline-flex items-center cursor-pointer">
						<input type="checkbox" className="sr-only peer" checked={showTable} onChange={() => {
							if(showTable) setMode('table');
							else setMode('json');
							setShowTable(!showTable);
						}} />
						<div className="relative w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600">
							<div className="absolute top-0.5 left-[2px] peer-checked:left-[24px] bg-white w-5 h-5 rounded-full transition-all"></div>
						</div>
					</label>
				</div>
			</div>
			<div className="w-full bg-zinc-200">
				{mode === "images" && renderImages()}
				{mode === "graph" && renderGraph()}
				{mode === "json" && renderTable()}
				{mode === "table" && renderTable()}
				{show_img.length > 0 && (
					<div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur z-50 p-4">
						<div className="relative bg-white rounded-lg shadow-lg p-4">
							<img src={show_img} alt="Certificate" className="max-h-[80vh] object-contain rounded-md" />
							<button onClick={() => setShow_img('')} className="absolute top-1 right-1 bg-zinc-600/40 hover:bg-zinc-700 text-white p-1 rounded-full">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default DataShowcaseOptions;
