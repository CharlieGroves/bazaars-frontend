import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

export default function ShopItemRecomms(props) {
	const { itemsData } = props;
	console.log(itemsData)
	return (
		<div className="item-container">
			{itemsData ? (
				itemsData.map((item, index) => (
					<div className="item" key={index}>
						<div className="item-image-container">
							<img
								alt={item.values.name}
								className="item-image"
								src={item.values.itemImageURL}
							/>
						</div>
						<hr className="recomms-hr" />
						<Link
							to={`/seller/${item.values.sellerId}/${item.values.sellerId}/${item.values.itemName}`}
							className="item-link"
						>
							{item.values.itemName}:
							<br />
						</Link>
						<Rating
							allowHalfIcon
							readonly
							className="review-rating"
							size={20}
							ratingValue={item.values.MeanRating / 20}
						/>
						<div className="item-price">
							£{item.values.itemPrice}
						</div>
					</div>
				))
			) : (
				<div>No items in this shop</div>
			)}
		</div>
	);
}
