function Connect({ uri, setUri, setConnected, setShowModal }){
	return(
		<>
		<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-20">
			<div className="bg-white p-2 rounded w-full shadow">
				<h2 className="text-lg font-semibold mb-4">Connect to MongoDB</h2>
				<input
					type="text"
					placeholder="mongodb+srv://username:password@cluster.mongodb.net"
					value={uri}
					onChange={(e) => setUri(e.target.value)}
					className="w-full border p-2 mb-4 rounded text-sm"
				/>

				<div className="">
					<select name="" id="">
						<option value="">Choose</option>
						<option value="">mongodb+srv://username:password@cluster.mongodb.net</option>
						<option value="">mongodb+srv://username:password@cluster.mongodb.net</option>
						<option value="">mongodb+srv://username:password@cluster.mongodb.net</option>
						<option value="">mongodb+srv://username:password@cluster.mongodb.net</option>
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