import { useState } from "react";
import Left_bar from "./left_bar";
import Right_bar from "./right_bar";

function Dashboard(){

	const [collection, setCollection] = useState(null);

	return(
		<>
		<div className="h-screen flex sm:flex-row flex-col">
			
			<Left_bar setCollection={setCollection}/>

			<Right_bar collection={collection}/>
			
		</div>
		</>
	)
}

export default Dashboard;