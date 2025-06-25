import { useState } from "react";
import Connect from "./connect";
import Left_bar from "./left_bar";
import Right_bar from "./right_bar";

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

		<div className="h-screen flex flex-col">
			
			<Left_bar/>

			<Right_bar/>
			
		</div>

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
