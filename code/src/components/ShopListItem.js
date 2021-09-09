import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import ArrowRight from "./icons/ArrowRight";

export default function ShopListItem(props) {
	const { shop, index, currentUser } = props;
	const history = useHistory;
	return (
		<div className="shop-container" key={index}>
			<div
				className="shop"
				onClick={() => {
					history.push(`/seller/${currentUser.uid}/${shop.name}`);
				}}
			>
				<Link
					to={`/seller/${currentUser.uid}/${shop.name}`}
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
