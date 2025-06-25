function Connect({ uri, setUri, setConnected, setShowModal }){
	const mongoURIs = [
		{
			label: "Cluster 0",
			value: "mongodb+srv://admin:pass@cluster0.mongodb.net"
		},
		{
			label: "Cluster 1",
			value: "mongodb+srv://devuser:pass@cluster1.mongodb.net"
		},
		{
			label: "IoT Cluster",
			value: "mongodb+srv://iotuser:pass@iotcluster.mongodb.net"
		},
		{
			label: "Localhost",
			value: "mongodb://localhost:27017"
		}
	];

	return(
		<>
		<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-20">
			<div className="bg-white p-2 rounded w-full max-w-4xl sm:max-w-1xl md:max-w-lg shadow">
				<h2 className="text-lg font-semibold mb-4">Connect to MongoDB</h2>
				<input
					type="text"
					placeholder="mongodb+srv://username:password@cluster.mongodb.net"
					value={uri}
					onChange={(e) => setUri(e.target.value)}
					className="border w-full p-2 mb-4 rounded text-sm"
				/>

				<div className="flex w-[50%]">
					<select name="" id="" className="outline-none">
						<option value="">Choose</option>
						{mongoURIs.map((item, index) => (
							<option key={index} value={item.value}>
							{item.label}
							</option>
						))}
					</select>
				</div>
				<div className="flex justify-end gap-2">
					<button
						onClick={() => setShowModal(false)}
						className="px-4 py-1 text-sm bg-zinc-300 hover:bg-zinc-400 rounded"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							setConnected(true); // Simulate connection
							setShowModal(false);
						}}
						className="px-4 py-1 text-sm bg-green-600 text-white hover:bg-green-700 rounded"
					>
						Connect
					</button>
				</div>
			</div>
		</div>
		</>
	)
}

export default Connect;