import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/SearchBar.css";
import { useHistory } from "react-router";
import ShopItem from "./shopItem";

export default function SearchBar(props) {
	const [data, setData] = useState();
	const [itemsData, setItemsData] = useState();
	const [query, setQuery] = useState("");
	const history = useHistory();

	const searchQuery = (e) => {
		e.preventDefault();
		history.push(`/search/${query}`);
	};

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/all/items")
			.then((response) => {
				setItemsData(response.data);
				setData(response.data);
			})
			.catch((error) => {
				console.log(error.response.status);
			});
	}, []);

	return (
		<div className="search-bar-container">
			<div className="search-bar">
				<form className="search-bar-form" onSubmit={searchQuery}>
					<input
						className="search-bar-input"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</form>
			</div>
		</div>
	);
}
