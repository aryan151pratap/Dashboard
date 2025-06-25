import Left_bar from "./left_bar";
import Right_bar from "./right_bar";

function Dashboard(){
	return(
		<>
		<div className="h-screen flex sm:flex-row flex-col">
			
			<Left_bar/>

			<Right_bar/>
			
		</div>
		</>
	)
}

export default Dashboard;