import { useState } from "react";
import Table from "../component/table";
import Search from "../component/search";

function Right_bar({ collection }){

	const [tab, setTab] = useState(['raw', 'table']);
	const [current_tab, setCurrrent_tab] = useState('raw');

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
				<div className="bg-zinc-800 flex gap-1 p-1 border-b">
					{tab.map((i, index) => (
						<button key={index} className={`${current_tab === i ? 'bg-zinc-100 text-black font-bold' : 'bg-zinc-500 text-white'} px-2 py-1 rounded-sm capitalize cursor-pointer`}
						onClick={() => setCurrrent_tab(i)}
						>
							{i}
						</button>
					))}
					<div className="p-1">
						<Search/>
					</div>
				</div>

				
				<div className="overflow-x-auto">
			
					{collection?.data.length > 0 ?
						<div className="">
							{current_tab === 'table' ?
							<div>
								<Table collection={collection}/>
							</div>	
							:	
								<div>
									{collection.data.map((i, index) => (
										<pre key={index} className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
											{JSON.stringify(i, null, 2)}
										</pre>
									))}
								</div>
							}
					</div>	
					:			
					<div className="p-2">
						<p>Welcome to Mongo Dashboard</p>
						<p>Connect to a MongoDB URI to begin monitoring data.</p>
					</div>
					}
				</div>
			</div>
		</div>
		</>
	)
}

export default Right_bar;