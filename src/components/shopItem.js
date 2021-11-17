import React from "react";
import { Link } from "react-router-dom";

export default function ShopItem(props) {
    const {itemsData} = props;
	return (
		<div className="item-container">
			{itemsData ? (
				itemsData.map((item, index) => (
					<div className="item" key={index}>
						<div className="item-image-container">
							<img
								alt={item.name}
								className="item-image"
								src={item.itemImageURL}
							/>
						</div>
						<Link
							to={`/seller/${item.sellerId}/${item.shopName}/${item.itemName}`}
							className="item-link"
						>
							{item.itemName}:
							<br />
						</Link>
						<div className="item-price">£{item.itemPrice}</div>
					</div>
				))
			) : (
				<div>No items in this shop</div>
			)}
		</div>
	);
}
