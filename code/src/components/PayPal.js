import React, { useRef, useEffect } from "react";

export default function PayPal(props) {
	const paypal = useRef();
	console.log(props)

	useEffect(() => {
		window.paypal
			.Buttons({
				createOrder: (data, actions, err) => {
					return actions.order.create({
						intent: "CAPTURE",
						purchase_units: [
							{
								description: props.description,
								amount: {
									currency_code: "GBP",
									value: props.value,
								},
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
	}, []);
	return (
		<div>
			<div ref={paypal}></div>
		</div>
	);
}
