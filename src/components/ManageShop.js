import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleBar from "./SingleBar";
import "../css/ManageShop.css";
import ShopItem from "./shopItem";

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
	const [bestItemData, setBestItemData] = useState();
	const [totalRevenue, setTotalRevenue] = useState(0);
	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/item/" + shop)
			.then((response) => {
				setItemsData(response.data);
				// console.log(response.data);
			})
			.catch((error) => {
				console.log(error.response.status);
			});
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/shop/name/" + shop)
			.then((response) => {
				setShopData(response.data);
				console.log(response.data.sales);
			})
			.catch((error) => {
				console.log(error.response.status);
			});
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/best/" + shop)
			.then((response) => {
				setBestItemData(response.data);
				console.log(response.data.sales);
			})
			.catch((error) => {
				console.log(error.response.status);
			});
	}, []);

	useEffect(() => {
		if (shopData) {
			for(let i = 0; i < shopData.sales_revenue.length; i++) {
				setTotalRevenue(totalRevenue + shopData.sales_revenue[i])	
			}
		}
	}, []);

	return (
		<div className="manage-shop-container">
			<div className="manage-shop-title">
				Welcome {seller}! You're managing {shop}:
			</div>

			{itemsData && (
				<div>
					<div>Total Revenue {totalRevenue}</div>
					<div>Number of items {itemsData.length}</div>
				</div>
			)}
			{bestItemData && (
				<div>
					<h3>Best Item:</h3>
					{/* <p>Sales {bestItemData.sales[2]}</p> */}
				</div>
			)}
			{bestItemData && <ShopItem itemsData={bestItemData} />}
			<div className="graph-container">
				<p style={{ fontSize: 24 }}>Sales for {shop}</p>
				<div style={{ display: "flex" }}>
					{shopData &&
						shopData.sales &&
						[...Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)].map(
							(x, i) => {
								const y = max - (max * shopData.sales[x]) / 100;
								console.log(x);
								return (
									<SingleBar
										key={i}
										width="50px"
										height="300px"
										color="#ea1"
										month={monthNames[x]}
										number={
											shopData.sales
												? shopData.sales[x]
												: 0
										}
										sales={
											shopData.sales_revenue
												? shopData.sales_revenue[x]
												: 0
										}
										data={`M 0 ${max} L 0  ${y} L 60 ${y} l 60 ${max} Z`}
									/>
								);
							}
						)}
				</div>
			</div>
		</div>
	);
}
