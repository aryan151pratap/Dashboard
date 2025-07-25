import { useEffect, useState } from "react";

function Filter({ collection }){

	const [filter, setFilter] = useState('');
	const [select, setSelect] = useState(null);
	const [data, setData] = useState(collection.data);
	const [filter_data, setFilter_data] = useState(collection.data);

	useEffect(() => {
		setData(collection.data);
		setFilter_data(collection.data);
	},[collection]);

	function getAllKeys(obj, prefix = '') {
		let keys = [];
		for (const key in obj) {
			const fullKey = prefix ? `${prefix}.${key}` : key;
			keys.push(fullKey);
			 if (Array.isArray(obj[key])) {
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
		console.log(filter_data);
		if (select.trim() ==='' || filter.trim() === '') return setFilter_data(data);
		setFilter_data(data.filter((i) => {
			const value = i[select];
			return typeof value === 'string' && value.toLowerCase().includes(filter.toLowerCase());
		}));
	}
	
	return(
		<>
		<div className="w-full flex flex-col gap-2 p-2">
			<div className="w-full flex flex-col sm:flex-row gap-2">
				<select name="" id=""
					className="outline-none bg-zinc-200 p-2"
					onChange={(e) => setSelect(e.target.value)}
				>
					<option value="">choose</option>
					{[...allKeys].map((i, index) => (
						<option key={index} value={i}>{i}</option>
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

			<div className="flex flex-col p-2 bg-black text-green-500 overflow-x-auto">
				{filter_data.map((i, index) => (
					<pre
					className="border-b border-white"
					>{JSON.stringify(i, null, 2)}</pre> // ✅ Pretty format
				))}
			</div>
			
		</div>
		</>
	)
}

export default Filter;