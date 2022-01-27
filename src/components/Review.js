import React from "react";
import { Rating } from "react-simple-star-rating";

export default function Review(props) {
	const { reviews } = props;

	return (
		<div>
			{reviews &&
				reviews.map((review, index) => (
					<div key={index}>
						<Rating readonly className="review-rating" size={20} ratingValue={review.ReviewRating/20} />
						<div className="review-title">{review.ReviewTitle}</div>
						<div className="review-text">{review.ReviewText}</div>
					</div>
				))}
		</div>
	);
}