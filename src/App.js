import React from "react";
import "./css/App.css";
import "firebase/firestore";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthenticationProvider } from "./context/AuthenticationContext";

import Home from "./components/Home";

function App() {
	return (
		<Router>
			<AuthenticationProvider>
				<Switch>
					<Route path="/home" component={Home} />
				</Switch>
			</AuthenticationProvider>
		</Router>
	);
}

export default App;
