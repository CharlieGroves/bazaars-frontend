import React, { useState, useEffect } from "react";
import PayPal from "./PayPal";
import axios from "axios";
import "../css/Items.css";
import SearchBar from "./SearchBar";

export default function Item({
	match: {
		params: { seller, shop, item },
	},
}) {
	let description;
	let value;
	console.log(item);
	const [checkout, setCheckout] = useState(false);
	const [itemData, setItemData] = useState();

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/single-item/" + item)
			.then((response) => {
				console.log(response.data);
				setItemData(response.data);
			})
			.catch((error) => {
				console.log(error.response.status);
			});
	}, []);

	itemData && (description = itemData.itemName);
	itemData && (value = itemData.itemPrice);

	return (
		<div>
			<SearchBar />
			<div className="items-grid-container">
				<div className="items-grid">
					<div className="item-grid-header" />
					<div className="item-grid-left">
						{itemData ? (
							<div className="image-container">
								<img
									className="item-image"
									src={itemData.itemImageURL}
								/>
								<hr />
							</div>
						) : (
							<div>
								<div>loading...</div>
								<hr />
							</div>
						)}
					</div>
					<div className="item-grid-middle">
						{itemData ? (
							<div>
								<div>{itemData.itemName}</div>
								<div>£{itemData.itemPrice}</div>
								<div>
									{itemData.itemRating ? (
										itemData.itemRating
									) : (
										<div className="smaller-text">
											No ratings
										</div>
									)}
								</div>
								<hr />
								<div className="smaller-text">
									{itemData.itemDescription}
								</div>
							</div>
						) : (
							<div>loading...</div>
						)}
					</div>
					<div className="item-grid-right">
						<div className="right">
							{itemData ? (
								<div>£{itemData.itemPrice}</div>
							) : (
								<div>loading...</div>
							)}

							<div className="smaller-text">
								<div>Shipping Cost</div>
								<div>Estimated Shipping Time</div>
							</div>

							<br />
							<hr />

							<div className="button-container">
								<button>Add to cart</button>
								<button>Buy it now</button>
							</div>
						</div>
					</div>
					<div className="item-grid-footer">Reviews:</div>
				</div>
			</div>

			{/* {checkout ? (
				<PayPal value={value} description={description} />
			) : (
				<button
					onClick={() => {
						setCheckout(true);
					}}
				>
					Checkout
				</button>
			)} */}
		</div>
	);
}
