import { useState } from "react";

function Bar(){

	const [buttons, setButtons] = useState(['connect', 'close'])

	return( 
		<>
		<div className="w-full flex gap-2 p-2 bg-zinc-300">
			{buttons.map((i, index) => (
				<button className="capitalize font-semibold text-white bg-zinc-500 px-2 py-1 border-b-4 border-r-2 border-zinc-700 shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]">
					{i}
				</button>
			))}
		</div>
		
		</>
	)
}

export default Bar;