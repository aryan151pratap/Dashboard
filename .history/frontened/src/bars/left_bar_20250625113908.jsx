import { useState } from "react";
import clusterData from "../data/clusterData";
const apiUrl = import.meta.env.VITE_BACKEND_ADD;

function Left_bar({ setCollection, cluster }){
	const [current_database, setCurrent_database] = useState(null);
	const [current_collection, setCurrent_collection] = useState(null);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const handle_current_database = function(i){
		setCurrent_database(i);
	}

	const handle_current_collections = async function(i){
		setCurrent_collection(i);
		const new_data = {
			uri: cluster.uri,
			database: current_database.name,
			collection: i,
		}
		try{
			setLoading(true);
			if(new_data){
				const res = await fetch(`${apiUrl}/api/collection/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify(new_data),
				})

				const result = await res.json();
				if(result.ok){
					const collection = {
						cluster: cluster.name,
						...new_data, 
						data: result.data
					} 
					setCollection(collection);
				} else {
					console.error(result.message || 'Login failed');
				} 
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	}

	return(
		<>
		<div className="sticky top-0 z-5 shrink-0 h-fit w-full pt-12 bg-zinc-200 border-b sm:border-r">
			<div className="bg-zinc-200 border-b p-2">
				<div className="w-5 flex flex-col gap-[2px] cursor-pointer"
				onClick={() => setOpen(!open)}
				>
					<div className="py-[1px] bg-black"></div>
					<div className="py-[1px] bg-black"></div>
					<div className="py-[1px] bg-black"></div>
				</div>
			</div>

			{open ?
			<div>

			</div>
			:
			<div>
				<div className="flex flex-row border-b">
					<button className={`sm:w-full sm:text-center font-bold px-2 py-2 ${current_database === null ? 'text-white bg-zinc-700' : 'text-zinc-700'}`}
						onClick={() => setCurrent_database(null)}
					>
						{current_database ? 
						<span className="flex flex-col">{current_database.name}<span className="text-[10px] capitalize">(database)</span></span>
						:
						<span>Databases</span>
						}
					</button>

					{current_database &&
						<button className={`sm:text-center font-bold px-4 py-2 ${current_database !== null ? 'text-white bg-zinc-700' : 'text-zinc-700'}`}>Collections</button>
					}
				</div>


				<ul className="text-sm flex sm:flex-col flex-row overflow-x-auto">
				{current_database ? 
				<>	
					{current_database.collections?.map((i, index) => (
						<li key={index} className={`${current_collection === i ? 'bg-zinc-800 text-white font-semibold' : ''} flex hover:underline cursor-pointer border-r sm:border-r-0 sm:border-b px-4 py-2`}
						onClick={() => handle_current_collections(i)}
						>
							{i}
							{(loading && current_collection === i) &&
								<div className="ml-auto w-5 h-5 border-3 border-green-500 border-t-transparent rounded-full animate-spin"></div>
							}
						</li>
					))}
				</>
				:
				<>
					{cluster.databases?.map((i, index) => (
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
			}
		</div>
		</>
	)
}

export default Left_bar;