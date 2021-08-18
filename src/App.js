import React, { useState } from "react";
import "./css/App.css";
import "firebase/firestore";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { firestore } from "./firebase";
import { googleProvider, GoogleProvider } from "./context/authMethods";

import { AuthenticationProvider } from "./context/AuthenticationContext";
import { useAuth } from "./context/AuthenticationContext";
import socialMediaAuth from "./socialMediaAuth";

function App() {
	const messagesRef = firestore.collection("messages");
	const [value, setValue] = useState("");

	async function AddMessage(e) {
		e.preventDefault();
		console.log("a");

		await messagesRef.add({
			text: value,
		});
	}

  const handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider)
  }


	return (
		<Router>
			<AuthenticationProvider>
					<div className="App">
						<header className="App-header">
              <button onClick={() => handleOnClick(googleProvider)}>Google</button>
							<form onSubmit={AddMessage}>
								<label>
									Your Message: &nbsp;
									<input
										type="text"
										value={value}
										onChange={(e) =>
											setValue(e.target.value)
										}
									/>
								</label>
								<input type="submit" name="Submit" />
							</form>
						</header>
					</div>
			</AuthenticationProvider>
		</Router>
	);
}

export default App;
