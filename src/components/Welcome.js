import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import GoogleButton from "react-google-button";
import axios from "axios";

import { googleProvider } from "../context/authMethods";
import socialMediaAuth from "../socialMediaAuth";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import ShopItem from "./shopItem";

import "../css/Buttons.css";
import "../css/Loader.css";
import "../css/SignIn.css";
import "../css/Welcome.css";
import "../css/Titles.css";
import "../css/Margins.css";
import "../css/Paddings.css";

export default function Welcome() {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [itemsData, setItemsData] = useState();
	const [query, setQuery] = useState("");
	const [data, setData] = useState();

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/all/items")
			.then((response) => {
				setItemsData(response.data);
				setData(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error.response.status);
			});
	}, []);

	const searchQuery = (e) => {
		e.preventDefault();
		if (query) {
			if (query.length !== 0) {
				setQuery(query.toLowerCase());
				let placeholder = [];
				for (let x = 0; x < data.length; x++) {
					if (data[x].tags.toLowerCase().includes(query)) {
						placeholder.push(data[x]);
					}
				}
				if (placeholder.length !== 0) return setItemsData(placeholder);
				return setItemsData([]);
			}
			return setItemsData(data);
		}
		return setItemsData(data);
	};

	return (
		<div className="welcome-container">
			<div className="search-bar">
				<form onSubmit={searchQuery}>
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</form>
			</div>
			<div className="welcome-header">
				<div className="welcome-header-app-name title ml-1">
					App Name TBD
				</div>
				<div className="welcome-header-sign-in">
					<SignInWithGoogleButton
						loading={loading}
						setLoading={setLoading}
						socialMediaAuth={socialMediaAuth}
						history={history}
						GoogleButton={GoogleButton}
						googleProvider={googleProvider}
					/>
				</div>
			</div>
			<div className="welcome-body-container">
				<div className="welcome-body-main-section-container pl-2 pr-2 ml-2 mr-2 pt-2 pb-2">
					<div className="welcome-body-main-section-heading">
						Are you a small business owner, or want to take more
						control of your ecommerce website?
					</div>
					<br />
					<div>
						Create an online business with <i>App Name TBD </i>
						anytime, anywhere on any device.
					</div>
				</div>
				<div className="welcome-body-second-section-container pl-2 pr-2 ml-2 mr-2 pt-2 pb-2">
					<div className="welcome-body-second-section-heading">
						Do you only want to be charged once you start making
						money?
					</div>
					<br />
					<div>
						<i>App Name TBD1</i> is the software for you.
					</div>
				</div>
			</div>
			{itemsData && <ShopItem itemsData={itemsData} />}
		</div>
	);
}
