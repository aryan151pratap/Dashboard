import { useState } from "react";
import clusterData from "../data/clusterData";

function Left_bar(){
	const [current_database, setCurrent_database] = useState('');
	return(
		<>
		<div className="h-fit sm:h-full w-full pt-12 sm:w-48 bg-zinc-200 sm:fixed left-0 top-0 border-b sm:border-r">

			<div className="flex flex-row">
				<button className="sm:text-center font-bold px-4 py-2 text-zinc-700">Database</button>
				<button className="sm:text-center font-bold px-4 py-2 text-zinc-700">Collections</button>
			</div>


			<ul className="px-4 text-sm flex sm:flex-col flex-row gap-4 py-2">
			{clusterData.databases.map((i, index) => (
				<li className="hover:underline cursor-pointer"
				onClick={() => setCurrent_database(i)}
				>
					{i.name}
				</li>
			))}
			</ul>
		</div>
		</>
	)
}

export default Left_bar;