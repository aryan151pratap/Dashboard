function Right_bar({ collection }){
	return(
		<>
		<div className="w-full sm:pt-14 p-2 sm:p-4">
			<div className="bg-zinc-200 p-2">
				{collection &&
				<div className="flex flex-row gap-2 overflow-x-auto font-semibold text-zinx-700">
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
				}
			</div>
			<h1 className="text-xl font-bold mb-2 text-zinc-700">Dashboard Output</h1>
			<div className="bg-white p-4 border rounded shadow text-sm text-zinc-800">
				<p>Welcome to Mongo Dashboard</p>
				<p>Connect to a MongoDB URI to begin monitoring data.</p>
			</div>
		</div>
		</>
	)
}

export default Right_bar;