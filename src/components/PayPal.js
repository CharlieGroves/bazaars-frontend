import React, { useRef, useEffect } from "react";

export default function PayPal({ shoppingCart }) {
	const paypal = useRef();
	let paypalTotal = 0;

	useEffect(() => {
		for (let i = 0; i < shoppingCart.length; i++) {
			paypalTotal += shoppingCart[i].itemPrice;
			console.log(paypalTotal);
		}
		paypalTotal = Math.round(paypalTotal * 100) / 100;
		if (paypalTotal !== 0) {
			window.paypal
				.Buttons({
					createOrder: (data, actions, err) => {
						return actions.order.create({
							intent: "CAPTURE",
							purchase_units: [
								{
									amount: {
										currency_code: "GBP",
										value: paypalTotal,
										breakdown: {
											item_total: {
												currency_code: "GBP",
												value: paypalTotal,
											},
										},
									},
									items: shoppingCart.map((item) => {
										return {
											name: item.itemName,
											unit_amount: {
												currency_code: "GBP",
												value: item.itemPrice,
											},
											quantity: 1,
										};
									}),
								},
							],
						});
					},
					onApprove: async (data, actions) => {
						const order = await actions.order.capture();
						console.log(order);
					},
					onError: (err) => {
						console.log(err);
					},
				})
				.render(paypal.current);
		}
	}, [shoppingCart]);
	return (
		<div>
			<div ref={paypal}></div>
		</div>
	);
}
