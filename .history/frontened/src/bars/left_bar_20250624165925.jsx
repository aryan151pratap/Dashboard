import { useState } from "react";
import clusterData from "../data/clusterData";

function Left_bar({ setCollection, cluster }){
	const [current_database, setCurrent_database] = useState(null);

	const handle_current_database = function(i){
		setCurrent_database(i);
	}

	const handle_current_collections = function(i){
		const data = {
			cluster: cluster.name,
			database: current_database.name,
			collection: i
		}
		setCollection(data);
	}

	return(
		<>
		<div className="shrink-0 h-fit sm:h-full w-full pt-12 sm:w-fit bg-zinc-200 border-b sm:border-r">

			<div className="flex flex-row border-b">
				<button className={`sm:w-full sm:text-center font-bold px-2 py-2 ${current_database === null ? 'text-white bg-zinc-700' : 'text-zinc-700'}`}
					onClick={() => setCurrent_database(null)}
				>
					{current_database ? 
					<span>{current_database.name}</span>
					:
					<span>Databases</span>
					}
				</button>

				{current_database &&
					<button className={`sm:text-center font-bold px-4 py-2 ${current_database !== null ? 'text-white bg-zinc-700' : 'text-zinc-700'}`}>Collections</button>
				}
			</div>


			<ul className="text-sm flex sm:flex-col flex-row">
			{current_database ? 
			<>	
				{current_database.collections?.map((i, index) => (
					<li key={index} className="hover:underline cursor-pointer border-r sm:border-r-0 sm:border-b px-4 py-2"
					onClick={() => handle_current_collections(i)}
					>
						{i}
					</li>
				))}
			</>
			:
			<>
				{cluster.data.databases?.map((i, index) => (
					<li key={index} className="hover:underline cursor-pointer border-r sm:border-r-0 sm:border-b px-4 py-2"
					onClick={() => handle_current_database(i)}
					>
						{i.name}
					</li>
				))}
			</>
			}
			</ul>
		</div>
		</>
	)
}

export default Left_bar;