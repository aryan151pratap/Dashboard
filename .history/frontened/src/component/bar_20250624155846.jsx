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
			<p className={`font-semibold text-sm ${connected !== 'not' ? "text-red-400 " : "text-red-400"}`}>
			{connected !== 'not' ? "Connected" : "Not Connected"}
			</p>
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
