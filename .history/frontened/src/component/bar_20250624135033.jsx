import { useState } from "react";
import Connect from "./connect";

function Bar() {
  const [buttons] = useState(["connect", "close"]);
  const [showModal, setShowModal] = useState(false);
  const [uri, setUri] = useState("");
  const [connected, setConnected] = useState(false);

  return (
    <div>
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

		<div className="h-screen flex sm:flex-col md:flex-col flex-row">
			<div className="h-fit sm:h-full w-fit pt-12 sm:w-48 md:w-50 bg-zinc-200 relative sm:fixed md:fixed left-0 top-0 border-r">
				<p className="text-center font-bold p-2 text-zinc-700">Collections</p>
				<ul className="px-4 text-sm space-y-2">
					<li className="hover:underline cursor-pointer">users</li>
					<li className="hover:underline cursor-pointer">logs</li>
					<li className="hover:underline cursor-pointer">messages</li>
				</ul>
			</div>

			{/* Main Content */}
			<div className="sm:ml-48 pt-14 p-4">
				<h1 className="text-xl font-bold mb-2 text-zinc-700">Dashboard Output</h1>
				<div className="bg-white p-4 border rounded shadow text-sm text-zinc-800">
				<p>Welcome to Mongo Dashboard</p>
				<p>Connect to a MongoDB URI to begin monitoring data.</p>
				</div>
			</div>
		</div>

		{/* Connect Modal */}
		{showModal && (
			<Connect 
				uri={uri} 
				setUri={setUri} 
				setConnected={setConnected} 
				setShowModal={setShowModal}
			/>
		)}
    </div>
  );
}

export default Bar;
