import React from 'react'
import Home from "./Components/Home"
import Login from "./Components/Login"
import Dashboard from "./Components/Dashboard"
import { Router } from "@reach/router"
import SinglePost from "./Components/SinglePost";

class App extends React.Component {
	render() {
		return (
			<div>
				<Router>
					<Home path="/" />
					<SinglePost path="/post/:id" />
					<Login path="/login" />
					<Dashboard path="/dashboard/:username" />
				</Router>
			</div>
		);
	}
}

export default App;
