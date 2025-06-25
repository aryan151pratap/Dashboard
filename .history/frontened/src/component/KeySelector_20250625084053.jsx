// KeySelector.jsx
import { useEffect, useState } from "react";

function KeySelector({ data }) {
	const [selectedKeys, setSelectedKeys] = useState([]);

	if (!data || data.length === 0) return <div className="p-2">No data</div>;

	const sample = data[0];
	const keys = Object.keys(sample);
	useEffect(() => {
		setSelectedKeys(keys);
	},[])

	const toggleKey = (key) => {
		if (selectedKeys.includes(key)) {
			setSelectedKeys(prev => prev.filter(k => k !== key));
		} else {
			setSelectedKeys(prev => [...prev, key]);
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-wrap gap-2 bg-zinc-300 p-2">
				{keys.map((key, idx) => (
					<label key={idx} className="flex items-center gap-1">
						<input
							type="checkbox"
							checked={selectedKeys.includes(key)}
							onChange={() => toggleKey(key)}
						/>
						<span>{key}</span>
					</label>
				))}
			</div>

			<div className="bg-black text-green-500 p-2">
				{data.map((item, index) => (
					<pre key={index} className="border-b border-white overflow-x-auto">
						{selectedKeys.length > 0
							? JSON.stringify(
									Object.fromEntries(
										selectedKeys.map(k => [k, item[k]])
									),
									null,
									2
							  )
							: "Select keys to preview data"}
					</pre>
				))}
			</div>
		</div>
	);
}

export default KeySelector;
