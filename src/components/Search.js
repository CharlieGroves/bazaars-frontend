import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ShopItem from "./shopItem";

export default function Search({
	match: {
		params: { query },
	},
}) {

	const [itemsData, setItemsData] = useState();
	const [data, setData] = useState();

	let temp_query = query;
	console.log(temp_query)
	query = query.split(" ").join("")
	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_IP + `get/search/item/${query}`)
			.then((response) => {
				setItemsData(response.data);
				setData(response.data);
				console.log(data, itemsData);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [query]);

	return (
		<div>
			<SearchBar />
			{itemsData && <ShopItem itemsData={itemsData} />}
		</div>
	);
}
