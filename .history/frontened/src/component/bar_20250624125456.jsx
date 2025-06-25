import { useState } from "react";

function Bar(){

	const [buttons, setButtons] = useState(['connect', 'close'])

	return( 
		<>
		<div className="w-full flex gap-2 p-2 bg-zinc-300">
			{buttons.map((i, index) => (
				<button className="capitalize">
					{i}
				</button>
			))}
		</div>
		</>
	)
}

export default Bar;