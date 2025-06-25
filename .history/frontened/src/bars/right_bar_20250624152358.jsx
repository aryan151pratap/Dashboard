import { useState } from "react";

function Right_bar({ collection }){

	const [tab, setTab] = useState(['raw', 'table']);

	return(
		<>
		<div className="w-full sm:pt-14 p-2 sm:p-4">
			<h1 className="text-xl font-bold mb-2 text-zinc-700">Dashboard Output</h1>
			
			{collection &&
				<div className="bg-zinc-200 p-2 mb-2">
					<div className="flex flex-row gap-2 overflow-x-auto font-semibold text-zinc-700">
						<span className="shrink-0 hover:underline cursor-pointer">{collection.cluster}
							<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
							</svg>
						</span>
						<span className="shrink-0 hover:underline cursor-pointer">{collection.database}
							<svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
							</svg>
						</span>
						<span className="shrink-0 hover:underline cursor-pointer">{collection.collection}
						</span>
					</div>
				</div>
			}

			<div className="bg-white border rounded shadow text-sm text-zinc-800 overflow-hidden">
				<div className="bg-zinc-200 flex gap-1 p-2">
					{tab.map((i, index) => (
						<button className="px-1">
							{i}
						</button>
					))}
				</div>
				<div className="p-4">
					<p>Welcome to Mongo Dashboard</p>
					<p>Connect to a MongoDB URI to begin monitoring data.</p>
				</div>
			</div>
		</div>
		</>
	)
}

export default Right_bar;