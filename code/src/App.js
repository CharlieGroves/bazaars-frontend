import React from "react";
import "firebase/firestore";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthenticationProvider } from "./context/AuthenticationContext";

import Home from "./components/Home";
import Root from "./components/Root";
import PrivateRoute from "./components/PrivateRoute";
import Shop from "./components/Shop";
import Seller from "./components/Seller";
import Item from "./components/Item";
import ManageAccount from "./components/ManageAccount";

function App() {
	return (
		<Router>
			<AuthenticationProvider>
				<Switch>
					<PrivateRoute path="/home" component={Home} />
					<Route exact path="/" component={Root} />
					<Route
						path="/seller/:seller/:shop/:item"
						component={Item}
					/>
					<Route path="/seller/:seller/:shop" component={Shop} />
					<Route path="/seller/:seller" component={Seller} />
					<Route path="/manage-account" component={ManageAccount} />
				</Switch>
			</AuthenticationProvider>
		</Router>
	);
}

export default App;
