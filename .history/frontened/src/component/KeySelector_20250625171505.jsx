import { useEffect, useRef, useState } from "react";
import Table from "./table";
import DataShowcaseOptions from "./show";

function KeySelector({ data }) {
	const [selectedKeys, setSelectedKeys] = useState([]);
	const [filter_data, setFilter_data] = useState(data);

	const keyOrderRef = useRef([]);

	useEffect(() => {

		console.log(data);

		if (!data || data.length === 0) return;

		const uniqueKeys = Array.from(
			new Set(data.flatMap(obj => Object.keys(obj)))
		);

		setSelectedKeys(uniqueKeys);
		keyOrderRef.current = uniqueKeys; // ✅ Set key order once on initial load
		setFilter_data(data);
	}, []);


	const toggleKey = (key) => {
		setSelectedKeys(prev => {
			let updated;
			if (prev.includes(key)) {
				updated = prev.filter(k => k !== key);
			} else {
				if (!keyOrderRef.current.includes(key)) {
					keyOrderRef.current.push(key);
				}
				updated = [...prev, key];
			}
			return updated;
		});
	};

	useEffect(() => {
		if (selectedKeys.length > 0) {
			const orderedKeys = keyOrderRef.current.filter(k => selectedKeys.includes(k));
			const reduced = data.map(item =>
				Object.fromEntries(orderedKeys.map(k => [k, item[k]]))
			);
			setFilter_data(reduced);
		} 
	}, [selectedKeys, data])

	return (
		<div className="flex flex-col gap-2">
			<div className="relative max-w-full flex w-full flex-col bg-white shadow">
				<nav className="flex flex-wrap gap-2 p-2">
					{keyOrderRef.current.map((key, idx) => {
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
				</nav>
			</div>

			<div className="w-full h-full">
				<DataShowcaseOptions data={filter_data}/>
			</div>


			
		</div>
	);
}

export default KeySelector;
