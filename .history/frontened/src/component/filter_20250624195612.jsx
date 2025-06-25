import { useState } from "react";

function Filter({ collection }){

	const [filter, setFilter] = useState('');
	
	return(
		<>
		<div className="p-2">
			<div>
				<select name="" id="">
					<option value="">choose</option>
				</select>

				<input type="text" 
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
				className=""
				/>
			</div>
			
		</div>
		</>
	)
}

export default Filter;