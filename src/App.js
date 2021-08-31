import React from "react";
import "./css/App.css";
import "firebase/firestore";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthenticationProvider } from "./context/AuthenticationContext";

import Home from "./components/Home";
import Root from "./components/Root";
import PrivateRoute from "./components/PrivateRoute";
import Shop from "./components/Shop";
import Seller from "./components/Seller";

function App() {
	return (
		<Router>
			<AuthenticationProvider>
				<Switch>
					<PrivateRoute path="/home" component={Home} />
					<Route exact path="/" component={Root} />
					<Route path="/seller/:seller/:shop" component={Shop} />
					<Route path="/seller/:seller" component={Seller} />
				</Switch>
			</AuthenticationProvider>
		</Router>
	);
}

export default App;
