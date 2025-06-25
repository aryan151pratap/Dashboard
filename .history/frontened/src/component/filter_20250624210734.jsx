import { useState } from "react";

function Filter({ collection }){

	const [filter, setFilter] = useState('');
	const [select, setSelect] = useState(null);
	const [data, setData] = useState(collection.data);

	function getAllKeys(obj, prefix = '') {
	let keys = [];
	for (const key in obj) {
		const fullKey = prefix ? `${prefix}.${key}` : key;
		keys.push(fullKey);
		if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
			keys = keys.concat(getAllKeys(obj[key], fullKey));
		} else if (Array.isArray(obj[key])) {
			obj[key].forEach((item, index) => {
				if (typeof item === 'object' && item !== null) {
				keys = keys.concat(getAllKeys(item, `${fullKey}[${index}]`));
				}
			});
		}
	}
	return keys;
	}

	const allKeys = new Set();
	collection.data.forEach(obj => {
		getAllKeys(obj).forEach(k => allKeys.add(k));
	});

	const handle_search = function(){
		if(filter.trim() !== ''){
			setData(data.filter((i) => {
				const value = i[select];
				return typeof value === 'string' && value.includes(filter);
			}));
			console.log(data);
		}
	}
	
	return(
		<>
		<div className="w-full flex flex-col gap-2 p-2">
			<div className="w-full flex flex-col sm:flex-row gap-2">
				<select name="" id=""
					className="outline-none bg-zinc-200 p-2"
					onSelect={(e) => setSelect(e.target.value)}
				>
					<option value="">choose</option>
					{[...allKeys].map((i, index) => (
						<option key={index} value="">{i}</option>
					))}
				</select>

				<input type="text" 
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className="w-full sm:w-fit p-2 outline-none bg-zinc-200 ml-auto"
					placeholder="Enter for search..."
				/>
				<button className="p-2 bg-zinc-200 cursor-pointer"
				onClick={handle_search}
				>
					Search
				</button>
			</div>

			<div className="p-2 bg-zinc-800">
				{data.map((i, index) => (
					<pre>{JSON.stringify(i, null, 2)}</pre> // ✅ Pretty format
				))}
			</div>
			
		</div>
		</>
	)
}

export default Filter;