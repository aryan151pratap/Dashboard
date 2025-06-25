import { useEffect, useState } from "react";
import KeySelector from "./KeySelector";

function Filter({ collection }) {
	const [filter, setFilter] = useState('');
	const [data, setData] = useState(collection.data);
	const [filter_data, setFilter_data] = useState(collection.data);
	const [keyPath, setKeyPath] = useState([]);

	useEffect(() => {
		setData(collection.data);
		setFilter_data(collection.data);
		setKeyPath([]);
	}, [collection]);

	function getValueByPath(obj, path) {
		let current = obj;
		for (let key of path) {
			if (Array.isArray(current)) current = current[0];
			current = current?.[key];
			if (current === undefined || current === null) break;
		}
		return current;
	}

	function getKeysAtDepthStrict(objects, path) {
		const keysSet = new Set();

		for (let obj of objects) {
			let current = obj;

			for (let i = 0; i < path.length; i++) {
				if (Array.isArray(current)) current = current[0];
				current = current?.[path[i]];
				if (current === undefined || current === null) break;
			}

			if (typeof current === 'object' && current !== null && !Array.isArray(current)) {
				Object.keys(current).forEach(k => keysSet.add(k));
			}
		}

		return Array.from(keysSet);
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
				for (let item of current) recurse(item?.[key], depth + 1);
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
		setFilter_data(data.filter(item => {
			const values = getAllValuesByPath(item, keyPath);
			return values.some(v =>
				v !== undefined && String(v).toLowerCase().includes(filter.toLowerCase())
			);
		}));
	};

	return (
		<div className="w-full flex flex-col gap-2">
			<div className="w-full flex flex-col sm:flex-row flex-wrap gap-2 p-2 bg-zinc-400">
				{keyPath.map((_, level) => {
					const parentPath = keyPath.slice(0, level);
					const options = getKeysAtDepthStrict(data, parentPath);
					return (
						<select
							key={level}
							className="p-2 bg-zinc-100"
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
					const options = getKeysAtDepthStrict(data, keyPath);
					if (options.length > 0) {
						return (
							<select
								className="p-2 bg-zinc-100"
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

				<div className="flex flex-row gap-1">
					<input
						type="text"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						className="w-full sm:w-fit p-2 outline-none bg-zinc-100"
						placeholder="Enter for search..."
					/>
					<button className="p-2 bg-white cursor-pointer" onClick={handle_search}>
						Search
					</button>
				</div>
			</div>

			<KeySelector data={filter_data} />
		</div>
	);
}

export default Filter;
