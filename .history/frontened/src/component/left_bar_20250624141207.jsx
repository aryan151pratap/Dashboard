import clusterData from "../data/clusterData";

function Left_bar(){
	return(
		<>
		<div className="h-fit sm:h-full w-full pt-12 sm:w-48 bg-zinc-200 sm:fixed left-0 top-0 border-b sm:border-r">
			<p className="sm:text-center font-bold px-4 py-2 text-zinc-700">Collections</p>

			{clusterData.databases.map((i, index) => (
				<button>
					{i.name}
				</button>
			))}
			<ul className="px-4 text-sm flex sm:flex-col flex-row gap-4 py-2">
				<li className="hover:underline cursor-pointer">users</li>
				<li className="hover:underline cursor-pointer">logs</li>
				<li className="hover:underline cursor-pointer">messages</li>
			</ul>
		</div>
		</>
	)
}

export default Left_bar;