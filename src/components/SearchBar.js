import React, { useState } from "react";
import "../css/SearchBar.css";
import { useHistory } from "react-router";

export default function SearchBar(props) {
	const [query, setQuery] = useState("");
	const history = useHistory();

	const searchQuery = (e) => {
		e.preventDefault();
		history.push(`/search/${query}`);
	};

	return (
		<div className="search-bar-container">
			<div className="search-bar">
				<form className="search-bar-form" onSubmit={searchQuery}>
					<input
						className="search-bar-input"
						value={query}
						placeholder={props.query ? props.query : "Search here"}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</form>
			</div>
		</div>
	);
}
