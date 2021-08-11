import React, { Fragment, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import ListReviews from "../review/ListReviews";
import CurrencyFormatter from "../CurrencyFormatter";
import RelatedProperties from "./RelatedProperties";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  getPropertyDetails,
  newReview,
  clearErrors,
} from "../../actions/propertyActions";
import { addItemToWishList } from "../../actions/wishListActions";
import { NEW_REVIEW_RESET } from "../../constants/propertyConstants";

const PropertyDetails = ({ match }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, property } = useSelector(
    (state) => state.propertyDetails
  );
  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    dispatch(getPropertyDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Reivew posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, alert, error, reviewError, match.params.id, success]);

  const addToList = () => {
    dispatch(addItemToWishList(match.params.id, quantity));
    alert.success("Item Added to List");
  };

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= property.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;
      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("propertyId", match.params.id);

    dispatch(newReview(formData));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={property.name} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-8 img-fluid" id="property_image">
              <div className="d-flex justify-content-center align-items-center">
                <h3>{property.name}</h3>
              </div>
              <Carousel pause="hover">
                {property.images &&
                  property.images.map((image) => {
                    return (
                      <Carousel.Item key={image.url}>
                        <img
                          className="d-block w-100"
                          src={`/uploads/properties/${property.imageDir}/${image.url}`}
                          alt={property.title}
                        />
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </div>

            <div className="col-12 col-lg-4 mt-5">
              <p id="property_id">Property # {property._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(property.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({property.numOfReviews} Reviews)</span>

              <hr />

              <p id="property_price">Ksh {CurrencyFormatter(property.price)}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div>
              <button
                type="button"
                id="wish_list_btn"
                className="btn btn-primary d-inline ml-4"
                disabled={property.stock === 0}
                onClick={addToList}
              >
                Add to Wish List
              </button>

              <hr />

              <p>
                Status:{" "}
                <span
                  id="stock_status"
                  className={property.stock > 0 ? "greenColor" : "redColor"}
                >
                  {property.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{property.description}</p>
              <hr />
              <p id="property_seller mb-3">
                Sold by: <strong>{property.seller}</strong>
              </p>

              {user ? (
                <button
                  id="review_btn"
                  type="button"
                  className="btn btn-primary mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={setUserRatings}
                >
                  Submit Your Review
                </button>
              ) : (
                <div className="alert alert-danger mt-5" type="alert">
                  Login to post your review
                </div>
              )}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={reviewHandler}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>{<RelatedProperties category={property.category} />}</div>

          {property.reviews && property.reviews.length > 0 && (
            <ListReviews reviews={property.reviews} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default PropertyDetails;
