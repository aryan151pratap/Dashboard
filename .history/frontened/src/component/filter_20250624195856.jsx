import { useState } from "react";

function Filter({ collection }){

	const [filter, setFilter] = useState('');
	
	return(
		<>
		<div className="w-full flex p-2">
			<div className="w-full flex flex-col sm:flex-row gap-2">
				<select name="" id=""
					className="outline-none bg-zinc-200 p-2"
				>
					<option value="">choose</option>
				</select>

				<input type="text" 
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className="w-full sm:w-fit p-2 outline-none bg-zinc-200 ml-auto"
					placeholder="Enter for search..."
				/>
			</div>
			
		</div>
		</>
	)
}

export default Filter;