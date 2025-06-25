import { useState } from "react";

function Bar(){

	const [buttons, setButtons] = useState(['connect', 'close'])

	return( 
		<>
		<div className="w-full flex p-2 bg-zinc-300">
			{buttons.map((i, index) => (
				<button>
					{i}
				</button>
			))}
		</div>
		</>
	)
}

export default Bar;