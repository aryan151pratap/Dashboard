import { useState } from "react";
import clusterData from "../data/clusterData";

function Left_bar(){
	const [current_database, setCurrent_database] = useState(null);

	const handle_current_database = function(i){
		setCurrent_database(i);
	}
	return(
		<>
		<div className="shrink-0 h-fit sm:h-full w-full pt-12 sm:w-48 bg-zinc-200 sm:fixed left-0 top-0 border-b sm:border-r">

			<div className="flex flex-row">
				<button className={`sm:text-center font-bold px-2 py-2 text-zinc-700 ${current_database && 'bg-zinc-200'}`}>
					Database
				</button>

				{current_database &&
					<button className="sm:text-center font-bold px-4 py-2 text-zinc-700">{current_database.name}</button>
				}
			</div>


			<ul className="px-4 text-sm flex sm:flex-col flex-row gap-4 py-2">
			{clusterData.databases.map((i, index) => (
				<li className="hover:underline cursor-pointer"
				onClick={() => handle_current_database(i)}
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