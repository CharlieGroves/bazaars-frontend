import React from "react";
import { Link } from "react-router-dom";

import ArrowRight from "./icons/ArrowRight";

export default function ShopListItem(props) {
	const { shop, index, currentUser, history } = props;
	return (
		<div className="shop-container" key={index}>
			<div
				className="shop"
				onClick={() => {
					history.push(`/seller/${currentUser.url}/${shop.name}`);
				}}
			>
				<Link
					to={`/seller/${currentUser.url}/${shop.name}`}
					className="shop-link"
				>
					<div className="shop-name">
						<b>{shop.name}</b>
					</div>
					<div className="shop-description">{shop.description}</div>
				</Link>
				<div className="arrow-right-container">
					<ArrowRight className="right-arrow" />
				</div>
			</div>
		</div>
	);
}
