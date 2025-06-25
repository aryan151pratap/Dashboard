import { useState } from "react";

function Bar() {
  const [buttons] = useState(["connect", "close"]);
  const [showModal, setShowModal] = useState(false);
  const [uri, setUri] = useState("");
  const [connected, setConnected] = useState(false);

  return (
    <>
		{/* Top Navbar */}
		<div className="w-full fixed top-0 left-0 flex justify-between items-center p-2 bg-zinc-800 text-white z-10">
			<div className="flex gap-2">
			{buttons.map((i, index) => (
				<button
				key={index}
				onClick={() => i === "connect" && setShowModal(true)}
				className="capitalize font-semibold bg-zinc-600 px-4 py-1 rounded hover:bg-zinc-700"
				>
				{i}
				</button>
			))}
			</div>
			<p className="font-semibold text-green-400 text-sm">
			{connected ? "Connected" : "Not Connected"}
			</p>
		</div>

		{/* Sidebar */}
		<div className="h-screen pt-12 w-48 bg-zinc-200 fixed left-0 top-0 border-r">
			<p className="text-center font-bold p-2 text-zinc-700">Collections</p>
			<ul className="px-4 text-sm space-y-2">
				<li className="hover:underline cursor-pointer">users</li>
				<li className="hover:underline cursor-pointer">logs</li>
				<li className="hover:underline cursor-pointer">messages</li>
			</ul>
		</div>

		{/* Main Content */}
		<div className="ml-48 pt-14 p-4">
			<h1 className="text-xl font-bold mb-2 text-zinc-700">Dashboard Output</h1>
			<div className="bg-white p-4 border rounded shadow text-sm text-zinc-800">
			<p>Welcome to Mongo Dashboard</p>
			<p>Connect to a MongoDB URI to begin monitoring data.</p>
			</div>
		</div>

		{/* Connect Modal */}
		{showModal && (
			<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-20">
			<div className="bg-white p-6 rounded w-full max-w-md shadow">
				<h2 className="text-lg font-semibold mb-4">Connect to MongoDB</h2>
				<input
					type="text"
					placeholder="mongodb+srv://username:password@cluster.mongodb.net"
					value={uri}
					onChange={(e) => setUri(e.target.value)}
					className="w-full border p-2 mb-4 rounded text-sm"
				/>
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
		)}
    </>
  );
}

export default Bar;
