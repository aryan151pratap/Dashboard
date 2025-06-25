import { useState } from "react";
import Left_bar from "../bars/left_bar";
import Right_bar from "../bars/right_bar";

function Dashboard({ cluster }){

	const [collection, setCollection] = useState(null);

	return(
		<>
		<div className="w-full flex sm:flex-row flex-col">
			<div>
			<Left_bar setCollection={setCollection} cluster={cluster}/>

			</div>
			<div>

			<Right_bar collection={collection}/>
			</div>
			

			
		</div>
		</>
	)
}

export default Dashboard;