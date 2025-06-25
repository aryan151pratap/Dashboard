import { useState } from "react";

function Bar(){

	const [buttons, setButtons] = useState(['connect', 'close'])

	return( 
		<div className="h-full">
		<div className="w-full h-fit fixed inset-0 flex gap-2 p-2 bg-zinc-200/80">
			<div>
				{buttons.map((i, index) => (
					<button className="capitalize font-semibold text-white bg-zinc-500 px-2 py-1 border-b-4 border-r-2 border-zinc-700 rounded-r-sm rounded-b-sm">
						{i}
					</button>
				))}
			</div>
		</div>
		<div className="h-full mt-13 w-10 bg-zinc-200">
			<p>hello</p>
		</div>
		</div>
	)
}

export default Bar;