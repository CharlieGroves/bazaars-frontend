import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleBar from "./SingleBar";
import "../css/ManageShop.css";
import ShopItem from "./shopItem";
import { Link } from "react-router-dom";

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
	const [worstItemData, setWorstItemData] = useState();
	const [totalRevenue, setTotalRevenue] = useState(0);
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
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/best/" + shop)
			.then((response) => {
				setBestItemData(response.data);
				console.log(response.data);
				console.log(response.data.sales);
			})
			.catch((error) => {
				console.log(error);
				console.log(error.response.status);
			});
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/worst/" + shop)
			.then((response) => {
				setWorstItemData(response.data);
				console.log(response.data.sales);
			})
			.catch((error) => {
				console.log(error.response.status);
			});
	}, []);

	useEffect(() => {
		console.log(shopData);
		shopData &&
			shopData.sales_revenue &&
			console.log(shopData.sales_revenue);
		shopData && shopData.sales_revenue && getShopTotal();
	}, [shopData]);

	function getShopTotal() {
		let total = 0;
		for (let i = 0; i < 12; i++) {
			total = total + shopData.sales_revenue[i];
			console.log(shopData.sales_revenue[i]);
			console.log(total);
		}
		return setTotalRevenue(total);
	}

	return (
		<div className="manage-shop-container">
			<div className="manage-shop-title">
				Welcome {seller}! You're managing {shop}
			</div>

			<div className="details">
				{shopData && shopData.sales_revenue && (
					<div>Total Revenue £{totalRevenue}</div>
				)}
				{itemsData && <div>Number of items {itemsData.length}</div>}
			</div>
			<div className="best-and-worst-container">
				<div className="best-container">
					{bestItemData && (
						<div>
							<h3>Best Item:</h3>
							{/* <p>Sales {bestItemData.sales[2]}</p> */}
						</div>
					)}
					{bestItemData && (
						<div className="best-item">
							<div className="item-image-container">
								<img
									alt={bestItemData.name}
									className="item-image"
									src={bestItemData.itemImageURL}
								/>
							</div>
							<Link
								to={`/seller/${bestItemData.sellerId}/${bestItemData.shopName}/${bestItemData.itemName}`}
								className="item-link"
							>
								{bestItemData.itemName}:
								<br />
							</Link>
							<div className="item-price">
								£{bestItemData.itemPrice}
							</div>
						</div>
					)}
				</div>
				<div>
					{worstItemData && (
						<div>
							<h3>Worst Item:</h3>
							{/* <p>Sales {worstItemData.sales[2]}</p> */}
						</div>
					)}
					{worstItemData && <ShopItem itemsData={worstItemData} />}
				</div>
			</div>

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
