import { useEffect, useState } from "react";
import Table from "./table";

function KeySelector({ data }) {
	const [selectedKeys, setSelectedKeys] = useState([]);
	const [filter_data, setFilter_data] = useState(data);
	const [showTable, setShowTable] = useState(false);

	if (!data || data.length === 0) return <div className="p-2">No data</div>;

	const keys = Array.from(new Set(
		data.flatMap(obj => Object.keys(obj))
	));

	useEffect(() => {
		setSelectedKeys(keys);
		setFilter_data(data);
	},[])

	const toggleKey = (key) => {
		if (selectedKeys.includes(key)) {
			setSelectedKeys(prev => prev.filter(k => k !== key));
		} else {
			setSelectedKeys(prev => [...prev, key]);
		}
	};

	useEffect(() => {
		if (selectedKeys.length > 0) {
			const reduced = data.map(item =>
				Object.fromEntries(selectedKeys.map(k => [k, item[k]]))
			);
			setFilter_data(reduced);
		} 
	}, [selectedKeys])

	return (
		<div className="flex flex-col gap-2">
			<div className="relative max-w-full flex w-full flex-col bg-white shadow">
				<nav className="flex flex-wrap gap-2 p-2">
					{keys.map((key, idx) => {
					const id = `key-selector-${idx}`;
					return (
						<div
						key={idx}
						role="button"
						className="flex w-fit items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
						>
						<label
							htmlFor={id}
							className="flex w-full cursor-pointer items-center px-3 py-2"
						>
							<div className="inline-flex items-center">
							<label
								className="flex items-center cursor-pointer relative"
								htmlFor={id}
							>
								<input
								type="checkbox"
								id={id}
								className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
								checked={selectedKeys.includes(key)}
								onChange={() => toggleKey(key)}
								/>
								<span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-3.5 w-3.5"
									viewBox="0 0 20 20"
									fill="currentColor"
									stroke="currentColor"
									strokeWidth="1"
								>
									<path
									fillRule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clipRule="evenodd"
									/>
								</svg>
								</span>
							</label>
							<label
								className="cursor-pointer ml-2 text-slate-600 text-sm"
								htmlFor={id}
							>
								{key}
							</label>
							</div>
						</label>
						</div>
					);
					})}
					<div className="z-2 flex ml-auto">
						<label class="inline-flex items-center cursor-pointer">
							<input type="checkbox" value="" class="sr-only peer" 
							checked={showTable}
							onChange={() => setShowTable(prev => !prev)}
							/>
							<div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
						</label>
					</div>
				</nav>
			</div>


			<div className="overflow-x-auto">
				{showTable ? (
					<Table collection={filter_data} />
				) : 
					<div className="bg-zinc-900 text-green-500 p-2">
						{filter_data.map((i, index) => (
							<pre key={index} className="border-b border-white overflow-x-auto">
								{JSON.stringify(i, null, 2)}
							</pre>
						))}
					</div>
				}
			</div>
		</div>
	);
}

export default KeySelector;
