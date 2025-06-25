import { useState } from "react";
import Connect from "./connect";
import Dashboard from "./dashboard";

function Bar() {
	const [buttons] = useState(["connect", "close"]);
	const [showModal, setShowModal] = useState(false);
	const [connected, setConnected] = useState('not');
	const [cluster, setCluster] = useState([]);

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
							<div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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

			<div className="w-full">
				<Dashboard cluster={cluster}/>
			</div>

			

			{showModal && (
				<Connect
					setConnected={setConnected} 
					setShowModal={setShowModal}
					setCluster={setCluster}
				/>
			)}
		</div>
	);
}

export default Bar;
