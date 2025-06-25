import { useState } from "react";

function Bar(){

	const [buttons, setButtons] = useState(['connect', 'close'])

	return( 
		<>
		<div className="w-full flex gap-2 p-2 bg-zinc-100">
			{buttons.map((i, index) => (
				<button className="capitalize font-semibold text-white bg-zinc-500 px-2 py-1 border-b-4 border-r-2 border-zinc-700 rounded-r-sm rounded-b-sm">
					{i}
				</button>
			))}
		</div>
		</>
	)
}

export default Bar;