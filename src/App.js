import React from "react";
import "firebase/firestore";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthenticationProvider } from "./context/AuthenticationContext";

import Home from "./components/Home";
import SignIn from "./components/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import Shop from "./components/Shop";
import Seller from "./components/Seller";
import Item from "./components/Item";
import ManageAccount from "./components/ManageAccount";
import Welcome from "./components/Welcome";
import Search from "./components/Search";

function App() {
	return (
		<Router>
			<AuthenticationProvider>
				<Switch>
					<PrivateRoute path="/home" component={Home} />
					<Route path="/signin" component={SignIn} />
					<Route
						path="/seller/:seller/:shop/:item"
						component={Item}
					/>
					<Route path="/seller/:seller/:shop" component={Shop} />
					<Route path="/seller/:seller" component={Seller} />
					<Route exact path="/search/:query" component={Search} />
					<PrivateRoute path="/manage-account" component={ManageAccount} />
					<Route exact path ="/" component={Welcome} />
				</Switch>
			</AuthenticationProvider>
		</Router>
	);
}
 
export default App;
