import { useState } from "react";

function Filter({ collection }){

	const [filter, setFilter] = useState('');
	
	return(
		<>
		<div className="w-full flex p-2">
			<div>
				<select name="" id="">
					<option value="">choose</option>
				</select>

				<input type="text" 
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					className="p-2 outline-none bg-zinc-200 ml-auto"
					placeholder="Enter for search..."
				/>
			</div>
			
		</div>
		</>
	)
}

export default Filter;