import { useState } from "react";
import Left_bar from "../bars/left_bar";
import Right_bar from "../bars/right_bar";

function Dashboard({ cluster }){

	const [collection, setCollection] = useState(null);

	return(
		<>
		<div className="sm:flex-row flex-col">
			
			<Left_bar setCollection={setCollection} cluster={cluster}/>

			<Right_bar collection={collection}/>
			
		</div>
		</>
	)
}

export default Dashboard;