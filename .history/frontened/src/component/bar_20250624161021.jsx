import { useState } from "react";
import Connect from "./connect";
import Dashboard from "./dashboard";

function Bar() {
  const [buttons] = useState(["connect", "close"]);
  const [showModal, setShowModal] = useState(false);
  const [connected, setConnected] = useState('connecting');

  return (
    <div>
		{/* Top Navbar */}
		<div className="w-full fixed top-0 left-0 flex justify-between items-center bg-zinc-800 text-white z-10">
			<div className="flex gap-2 p-2">
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
			<div className="h-full">
				{connected === 'connecting' ?
					<div className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-500">
						<svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
						/>
						</svg>
						<span>Connecting...</span>
					</div>

					:
					<p className={`px-4 py-2 relative font-semibold text-sm ${connected !== 'not' ? "text-green-400 " : "text-red-400"}`}>
						{connected !== 'not' &&
							<div>
								<div className="absolute right-1 top-0 p-1 rounded-full bg-green-400">
								</div>
								<div className="absolute right-1 top-0 p-1 rounded-full bg-green-400 animate-ping">
								</div>
							</div>
						}
						<span>{connected !== 'not' ? "Connected" : "Not Connected"}</span>
					</p>
				}
			</div>
		</div>

		<div>
			<Dashboard/>
		</div>

		

		{showModal && (
			<Connect
				setConnected={setConnected} 
				setShowModal={setShowModal}
			/>
		)}
    </div>
  );
}

export default Bar;
