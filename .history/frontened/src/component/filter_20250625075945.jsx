import { useEffect, useState } from "react";
import Table from "./table";

function Filter({ collection }) {
	const [filter, setFilter] = useState('');
	const [data, setData] = useState(collection.data);
	const [filter_data, setFilter_data] = useState(collection.data);
	const [keyPath, setKeyPath] = useState([]);
	const [showTable, setShowTable] = useState(false);

	useEffect(() => {
		setData(collection.data);
		setFilter_data(collection.data);
		setKeyPath([]);
	}, [collection]);

	function getNestedKeys(obj) {
		if (Array.isArray(obj)) {
			if (obj.length === 0) return [];
			obj = obj[0];
		}
		if (typeof obj === 'object' && obj !== null) {
			return Object.keys(obj);
		}
		return [];
	}

	function getValueByPath(obj, path) {
		let current = obj;
		for (let key of path) {
			if (Array.isArray(current)) {
				current = current[0]; // Just show preview from first element
			}
			current = current?.[key];
			if (current === undefined || current === null) break;
		}
		return current;
	}

	function getAllValuesByPath(obj, path) {
		let results = [];

		function recurse(current, depth) {
			if (depth === path.length) {
				results.push(current);
				return;
			}
			const key = path[depth];

			if (Array.isArray(current)) {
				for (let item of current) {
					recurse(item?.[key], depth + 1);
				}
			} else if (typeof current === 'object' && current !== null) {
				recurse(current?.[key], depth + 1);
			}
		}

		recurse(obj, 0);
		return results;
	}

	const handle_search = () => {
		if (keyPath.length === 0 || filter.trim() === '') {
			setFilter_data(data);
			return;
		}
		setFilter_data(data.filter((item) => {
			const values = getAllValuesByPath(item, keyPath);
			return values.some(v =>
				v !== undefined && String(v).toLowerCase().includes(filter.toLowerCase())
			);
		}));
	};

	return (
		<div className="w-full flex flex-col gap-2">
			<div className="w-full flex flex-col sm:flex-row gap-2 p-2 bg-zinc-400">
				{keyPath.map((_, level) => {
					const parent = keyPath.slice(0, level);
					const sample = getValueByPath(data[0], parent);
					const options = getNestedKeys(sample);
					return (
						<select
							key={level}
							className="p-2 bg-zinc-200"
							value={keyPath[level] || ''}
							onChange={(e) => {
								const newPath = [...keyPath.slice(0, level), e.target.value];
								setKeyPath(newPath);
							}}
						>
							<option value="">choose</option>
							{options.map((key, idx) => (
								<option key={idx} value={key}>{key}</option>
							))}
						</select>
					);
				})}

				{(() => {
					const sample = getValueByPath(data[0], keyPath);
					const options = getNestedKeys(sample);
					if (options.length > 0) {
						return (
							<select
								className="p-2 bg-zinc-200"
								onChange={(e) => setKeyPath([...keyPath, e.target.value])}
							>
								<option value="">choose</option>
								{options.map((key, idx) => (
									<option key={idx} value={key}>{key}</option>
								))}
							</select>
						);
					}
					return null;
				})()}

				<div>
					<input
						type="text"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						className="w-full sm:w-fit p-2 outline-none bg-zinc-200 ml-auto"
						placeholder="Enter for search..."
					/>
					<button className="p-2 bg-zinc-200 cursor-pointer" onClick={handle_search}>
						Search
					</button>
				</div>

				<div className="z-2 flex">
					<label class="inline-flex items-center cursor-pointer">
						<input type="checkbox" value="" class="sr-only peer" 
						checked={showTable}
						onChange={() => setShowTable(prev => !prev)}
						/>
						<div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
					</label>
				</div>
			</div>

			<div className="flex flex-col">
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

export default Filter;
