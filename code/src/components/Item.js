import React, { useState } from "react";
import PayPal from "./PayPal";

export default function Item() {
	const [checkout, setCheckout] = useState(false);
	let description = "description";
	let value = 1000.0;
	return (
		<div>
			{checkout ? (
				<PayPal value={value} description={description}/>
			) : (
				<button
					onClick={() => {
						setCheckout(true);
					}}
				>
					Checkout
				</button>
			)}
		</div>
	);
}
