function Right_bar({ collection }){
	return(
		<>
		<div className="w-full sm:pt-14 p-4">
			{collection &&
			<div className="flex flex-row gap-2">
				<span>{collection.cluster}</span>
				<span>{collection.database}</span>
				<span>{collection.collection}</span>
			</div>
			}
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