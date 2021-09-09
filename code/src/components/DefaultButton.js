import React from "react";

export default function DefaultButton(props) {
	const { text, childClassName, childOnClick } = props;
	return (
		<button onClick={childOnClick} className={childClassName}>
			{text}
		</button>
	);
}
