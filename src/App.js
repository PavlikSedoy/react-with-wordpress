import React from 'react'
import Home from "./Components/Home"
import { Router } from "@reach/router"
import SinglePost from "./Components/SinglePost";

class App extends React.Component {
	render() {
		return (
			<div>
				<Router>
					<Home path="/" />
					<SinglePost path="/post/:id" />
				</Router>
			</div>
		);
	}
}

export default App;
