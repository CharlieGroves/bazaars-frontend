import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleBar from "./SingleBar";

export default function ManageShop({
	match: {
		params: { seller, shop },
	},
}) {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let max = 300;
	const [itemsData, setItemsData] = useState();
	const [shopData, setShopData] = useState();
	useEffect(() => {
		// axios
		// 	.get(process.env.REACT_APP_BACKEND_IP + "get/item/" + shop)
		// 	.then((response) => {
		// 		setItemsData(response.data);
		// 		// console.log(response.data);
		// 	})
		// 	.catch((error) => {
		// 		console.log(error.response.status);
		// 	});
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/shop/name/" + shop)
			.then((response) => {
				setShopData(response.data);
				console.log(response.data.sales);
			})
			.catch((error) => {
				console.log(error.response.status);
			});
	}, []);

	useEffect(() => {
		shopData &&
			(() => {
				for (let i = 0; i++; i < 12) {
					console.log(i);
				}
			});
	}, [shopData]);

	return (
		<div>
			<div>seller {seller}</div>
			<div>Managing {shop}</div>
			{itemsData && <div>Number of items {itemsData.length}</div>}
			{shopData &&
				[...Array(12)].map((x, i) => (
					<div key={i}>
						sales in {monthNames[i]}&nbsp;
						{shopData.sales[i] == null ? 0 : shopData.sales[i]}
					</div>
				))}
			<div>
				<div style={{ display: "flex" }}>
					{shopData &&
						[...Array(12)].map((x, i) => {
							const y = max - (max * shopData.sales[i]) / 100;
							return (
								<SingleBar
									key={i}
									width="60px"
									height="300px"
									color="#ea1"
									month={monthNames[i]}
									number={shopData.sales[i]}
									data={`M 0 ${max} L 0  ${y} L 60 ${y} l 60 ${max} Z`}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
}
