import { useEffect, useState } from "react";

function Filter({ collection }) {
	const [filter, setFilter] = useState('');
	const [data, setData] = useState(collection.data);
	const [filter_data, setFilter_data] = useState(collection.data);
	const [keyPath, setKeyPath] = useState([]);

	useEffect(() => {
		setData(collection.data);
		setFilter_data(collection.data);
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
		try {
			return path.reduce((acc, key) => {
				if (acc === undefined || acc === null) return undefined;
				if (Array.isArray(acc)) return acc[parseInt(key)];
				return acc[key];
			}, obj);
		} catch {
			return undefined;
		}
	}

	const handle_search = () => {
		if (keyPath.length === 0 || filter.trim() === '') return setFilter_data(data);
		setFilter_data(data.filter((item) => {
			const value = getValueByPath(item, keyPath);
			return value !== undefined && String(value).toLowerCase().includes(filter.toLowerCase());
		}));
	};

	return (
		<div className="w-full flex flex-col gap-2 p-2">
			<div className="w-full flex flex-col sm:flex-row gap-2">
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

			<div className="flex flex-col p-2 bg-black text-green-500 overflow-x-auto">
				{filter_data.map((i, index) => (
					<pre key={index} className="border-b border-white">
						{JSON.stringify(i, null, 2)}
					</pre>
				))}
			</div>
		</div>
	);
}

export default Filter;
