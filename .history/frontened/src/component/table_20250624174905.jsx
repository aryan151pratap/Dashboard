function Table({ collection }){
	return(
		<>
		<table className="max-w-full table-auto border-collapse border border-gray-300 text-sm overflow-x-auto">
		<thead>
			<tr className="bg-gray-100">
			{collection.data.length > 0 &&
				Object.keys(collection.data[0]).map((key, index) => (
				<th key={index} className="border border-gray-300 px-4 py-2 text-left font-medium">
					{key}
				</th>
				))}
			</tr>
		</thead>
		<tbody>
			{collection.data.map((item, rowIndex) => (
			<tr key={rowIndex} className="even:bg-gray-50">
				{Object.values(item).map((value, colIndex) => (
				<td key={colIndex} className="border border-gray-300 px-2 py-2 break-all">
					{typeof value === "object" ? JSON.stringify(value) : String(value)}
				</td>
				))}
			</tr>
			))}
		</tbody>
		</table>

		</>
	)
}

export default Table