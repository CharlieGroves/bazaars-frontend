import React from "react";

export default function NewShopLabel(props) {
    const {stateValue, setStateValue, subTitle, type} = props
	return (
		<div>
			<label className="form-label">
				<div className="title-smaller">{subTitle}: &nbsp;</div>
				<input
					className="input"
					required
					type={type}
					value={stateValue}
					onChange={(e) => setStateValue(e.target.value)}
				/>
			</label>
			<br />
		</div>
	);
}
