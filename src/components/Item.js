import React, { useState } from "react";
import PayPal from "./PayPal";

export default function Item() {
	const [checkout, setCheckout] = useState(false);
	return (
		<div>
			{checkout ? (
				<PayPal />
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
