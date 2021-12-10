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

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/all/items")
			.then((response) => {
				console.log(response.data);
				setItemsData(response.data);
				setData(response.data);
				console.log(data, itemsData);
			})
			.catch((error) => {
				//console.log(error.response.status);
			});
	}, []);

	useEffect(() => {
		data && {
			if(temp_query) {
				console.log(temp_query)
				if (temp_query.length !== 0) {
					temp_query = temp_query.toLowerCase();
					let placeholder = [];
					for (let x = 0; x < data.length; x++) {
						if (data[x].tags.toLowerCase().includes(temp_query)) {
							placeholder.push(data[x]);
						}
					}
					if (placeholder.length !== 0)
						return setItemsData(placeholder);
					return setItemsData([]);
				}
                console.log(itemsData)
				return setItemsData(data);
			},
		};
	}, [data]);

	return (
		<div>
			<SearchBar />
			{itemsData && <ShopItem itemsData={itemsData} />}
		</div>
	);
}
