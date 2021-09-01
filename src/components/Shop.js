import React from "react";

export default function Shop({
	match: {
		params: { seller, shop },
	},
}) {
	return (
		<div>
			<div>Seller {seller}</div>
			<div>Shop {shop}</div>
		</div>
	);
}
