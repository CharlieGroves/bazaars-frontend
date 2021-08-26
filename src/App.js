import React from "react";
import "./css/App.css";
import "firebase/firestore";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthenticationProvider } from "./context/AuthenticationContext";

import Home from "./components/Home";
import Root from "./components/Root";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	return (
		<Router>
			<AuthenticationProvider>
				<Switch>
					<PrivateRoute path="/home" component={Home} />
					<Route exact path="/" component={Root} />
				</Switch>
			</AuthenticationProvider>
		</Router>
	);
}

export default App;
