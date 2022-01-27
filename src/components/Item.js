import React, { useState, useEffect } from "react";
//import PayPal from "./PayPal";
import axios from "axios";
import "../css/Items.css";
import { Rating } from "react-simple-star-rating";
import { useAuth } from "../context/AuthenticationContext";
import Review from "./Review";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Header from "./Header";

export default function Item({
	match: {
		params: { seller, shop, item },
	},
}) {
	//const [checkout, setCheckout] = useState(false);
	const [itemData, setItemData] = useState();
	const [reviewTitle, setReviewTitle] = useState("");
	const [review, setReview] = useState("");
	const [rating, setRating] = useState(0);
	const [reviewsData, setReviewsData] = useState();
	const [reviewSent, setReviewSent] = useState(false);
	const { currentUser } = useAuth();
	const {
		shoppingCart,
		setShoppingCart,
		addToCart,
		removeFromCart,
		getShoppingCart,
	} = useShoppingCart();

	const handleRating = (rate) => {
		setRating(rate);
	};

	useEffect(async () => {
		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/single-item/" + item)
			.then((response) => {
				setItemData(response.data);
			})
			.catch((error) => {});

		axios
			.get(process.env.REACT_APP_BACKEND_IP + "get/reviews/" + item)
			.then((response) => {
				setReviewsData(response.data);
			})
			.catch((error) => {});
		getShoppingCart();
		
	}, []);

	const handleReview = (e) => {
		e.preventDefault();
		const review_object = {
			ReviewTitle: reviewTitle,
			ReviewText: review,
			ReviewRating: rating,
			UserID: currentUser.uid,
			ProductID: item,
		};

		setReview("");
		setRating(0);
		setReviewTitle("");
		axios
			.post(
				process.env.REACT_APP_BACKEND_IP + "post/review",
				review_object
			)
			// once review has been sent, update state accordingly
			.then(() => {
				setReviewSent(true);
			});
	};

	const handleAddToCart = () => {
		console.log(shoppingCart)
		addToCart(itemData);
		console.log(JSON.stringify(shoppingCart));
		console.log({ ...shoppingCart });
	};

	return (
		<div>
			<Header shoppingCart={shoppingCart} />
			<div className="items-grid-container">
				<div className="items-grid">
					<div className="item-grid-header" />
					<div className="item-grid-left">
						{itemData ? (
							<div className="image-container">
								<img
									className="item-image"
									alt={item.itemName}
									src={itemData.itemImageURL}
								/>
								<hr />
							</div>
						) : (
							<div>
								<div>loading...</div>
								<hr />
							</div>
						)}
					</div>
					<div className="item-grid-middle">
						{itemData ? (
							<div>
								<div>{itemData.itemName}</div>
								<div>£{itemData.itemPrice}</div>
								<div>
									{itemData.MeanRating ? (
										<Rating
											allowHalfIcon
											readonly={true}
											ratingValue={
												itemData.MeanRating / 20
											}
										/>
									) : (
										<div className="smaller-text">
											No ratings
										</div>
									)}
								</div>
								<hr />
								<div className="smaller-text">
									{itemData.itemDescription}
								</div>
							</div>
						) : (
							<div>loading...</div>
						)}
					</div>
					<div className="item-grid-right">
						<div className="right">
							{itemData ? (
								<div>£{itemData.itemPrice}</div>
							) : (
								<div>loading...</div>
							)}

							<div className="smaller-text">
								<div>Shipping Cost</div>
								<div>Estimated Shipping Time</div>
							</div>

							<br />
							<hr />

							<div className="button-container">
								<button onClick={() => handleAddToCart()}>
									Add to cart
								</button>
								<button>Buy it now</button>
							</div>
						</div>
					</div>
					<div className="item-grid-footer">
						<div>Reviews:</div>
						<Rating
							allowHalfIcon
							onClick={handleRating}
							ratingValue={rating}
						/>
						<div>
							<form>
								<input
									onChange={(e) =>
										setReviewTitle(e.target.value)
									}
									value={reviewTitle}
									placeholder="Review title"
									className="review-title-input"
								/>
								<br />
								<textarea
									onChange={(e) => setReview(e.target.value)}
									placeholder="Review product here"
									className="review-body-input"
									value={review}
								/>
							</form>
							<button onClick={handleReview}>Submit</button>
							{reviewSent && (
								// when reviewSent === true, show div
								<div className="review-sent">Review Sent</div>
							)}
						</div>
						{reviewsData && reviewsData.length !== 0 ? (
							<Review reviews={reviewsData} />
						) : (
							<div className="no-reviews">
								No reviews yet. Be the first to write one!
							</div>
						)}
					</div>
				</div>
			</div>

			{/* {checkout ? (
				<PayPal value={value} description={description} />
			) : (
				<button
					onClick={() => {
						setCheckout(true);
					}}
				>
					Checkout
				</button>
			)} */}
		</div>
	);
}
