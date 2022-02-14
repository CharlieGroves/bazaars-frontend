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
	const [bestItemTotal, setBestItemTotal] = useState(0);
	const [worstItemTotal, setWorstItemTotal] = useState(0);
	const [discountPercentage, setDiscountPercentage] = useState(0);
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
			})
			.catch((error) => {
				console.log(error.response.status);
			});
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/best/" + shop)
			.then((response) => {
				setBestItemData(response.data);
			})
			.catch((error) => {
				console.log(error);
				console.log(error.response.status);
			});
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/worst/" + shop)
			.then((response) => {
				setWorstItemData(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error.response.status);
			});
	}, []);

	useEffect(() => {
		console.log(shopData);
		shopData &&
			shopData.sales_revenue &&
			shopData &&
			shopData.sales_revenue &&
			getShopTotal();
	}, [shopData]);

	useEffect(() => {
		bestItemData && getItemTotal(bestItemData, setBestItemTotal);
		worstItemData && getItemTotal(worstItemData[0], setWorstItemTotal);
	}, [bestItemData, worstItemData]);

	function getShopTotal() {
		let total = 0;
		for (let i = 0; i < 12; i++) {
			total = total + shopData.sales_revenue[i];
		}
		return setTotalRevenue(total);
	}

	function getItemTotal(item, state) {
		let total = 0;
		for (let i = 0; i < 12; i++) {
			item.sales[i] !== undefined && (total = total + item.sales[i]);
		}
		return state(total);
	}

	function sendEmailOffers(e) {
		e.preventDefault();
		axios.post(
			process.env.REACT_APP_BACKEND_IP +
				"/post/recommend/shop/" +
				shop +
				"/" +
				discountPercentage
		);
	}

	return (
		<div className="manage-shop-container">
			<div className="manage-shop-title">
				Welcome {seller}! You're managing {shop}
			</div>
			<div>
				<form onSubmit={sendEmailOffers} className="discount-form">
					<label className="discount-label">
						Percentage Discount
						<input
							className="discount-input"
							value={discountPercentage}
							type="int"
							min="0"
							max="50"
							onChange={(e) =>
								setDiscountPercentage(e.target.value)
							}
						/>
					</label>
					<button className="disoun-button" type="submit">
						Send email offers
					</button>
				</form>
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
							<p>Sales {bestItemTotal}</p>
							<p>
								Revenue £
								{bestItemTotal * bestItemData.itemPrice}
							</p>
						</div>
					)}
					{bestItemData && (
						<div>
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
							<div style={{ marginBottom: "1rem" }}>
								Tags:
								{bestItemData.tags.map((tag, index) => (
									<div key={index}>{tag}</div>
								))}
							</div>
						</div>
					)}
				</div>
				<div>
					{worstItemData && (
						<div>
							<div>
								<h3>Worst Item:</h3>
								<p>Sales {worstItemTotal}</p>
								<p>
									Revenue £
									{worstItemTotal *
										worstItemData[0].itemPrice}
								</p>
							</div>
							<ShopItem itemsData={worstItemData} />
							<div style={{ marginBottom: "1rem" }}>
								Tags:
								{worstItemData[0].tags.map((tag, index) => (
									<div key={index}>{tag}</div>
								))}
							</div>
						</div>
					)}
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
