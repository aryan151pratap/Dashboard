import { useState } from "react";
import Connect from "./connect";
import Dashboard from "./dashboard";

function Bar() {
  const [buttons] = useState(["connect", "close"]);
  const [showModal, setShowModal] = useState(false);
  const [connected, setConnected] = useState('not');

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
			<div>
				{connected === 'connecting' ?
					<div>

					</div>
					:
					<p className={`h-full bg-zinc-500 relative font-semibold text-sm ${connected !== 'not' ? "text-red-400 " : "text-red-400"}`}>
						<div className="absolute right-0 p-1 rounded-full bg-green-400">
						</div>
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
