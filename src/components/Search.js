import axios from "axios";
import React, { useEffect, useState } from "react";
import { Select } from "react-functional-select";
import SearchBar from "./SearchBar";
import ShopItem from "./shopItem";
import "../css/Search.css";

export default function Search({
	match: {
		params: { query },
	},
}) {
	const [itemsData, setItemsData] = useState();
	const [data, setData] = useState();
	const [sort, setSort] = useState("relevent");

	const sorting = ["relevant", "asc", "dsc"];

	let sortingList = [];
	sorting.forEach(function (element) {
		sortingList.push({ label: element, value: element });
	});

	let temp_query = query;

	query = query.split(" ").join("");

	useEffect(() => {
		axios
			.get(
				process.env.REACT_APP_BACKEND_IP +
					`get/search/item/${sort}/${query}`
			)
			.then((response) => {
				setItemsData(response.data);
				setData(response.data);
				console.log(data, itemsData);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [query, sort]);

	return (
		<div>
			<SearchBar query={query} style={{ marginBottom: "2rem" }} />
			<div className="select-container">
				<Select
					required
					className="ml-4 mr-4 mt-4 select"
					options={sortingList}
					onOptionChange={(e) => setSort(e.label)}
				/>
			</div>
			{itemsData && <ShopItem itemsData={itemsData} />}
		</div>
	);
}
