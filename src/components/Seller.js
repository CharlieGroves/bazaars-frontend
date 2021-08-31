import React from "react";

export default function Seller({
	match: {
		params: { seller },
	},
}) {
	return <div>Seller {seller}</div>;
}
