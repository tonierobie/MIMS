import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import CurrencyFormatter from "../CurrencyFormatter";

import { useDispatch, useSelector } from "react-redux";
import {
  addItemToWishList,
  removeItemFromWishList,
} from "../../actions/wishListActions";

const WishList = ({ history }) => {
  const dispatch = useDispatch();
  const { listItems } = useSelector((state) => state.wishList);
  const removeWishListItemHandler = (id) => {
    dispatch(removeItemFromWishList(id));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToWishList(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) {
      dispatch(removeItemFromWishList(id));
      return;
    }
    dispatch(addItemToWishList(id, newQty));
  };

  const checkoutHandler = () => history.push("/login?redirect=wish/details");
  return (
    <Fragment>
      {listItems.length === 0 ? (
        <h2 className="mt-5" style={{ marginBottom: "15rem" }}>
          Your Wish List is Empty
        </h2>
      ) : (
        <Fragment>
          <h2 className="mt-5">
            Your Wish List: <b>{listItems.length} items</b>
          </h2>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {listItems.map((item) => (
                <Fragment key={item.property}>
                  <hr />
                  <div className="wish_list-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={`/uploads/properties/${item.imageDir}/${item.image}`}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <Link to={`/property/${item.property}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">
                          Ksh {CurrencyFormatter(item.price)}
                        </p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQty(item.property, item.quantity)
                            }
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.quantity}
                            readOnly
                          />

                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQty(
                                item.property,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_wish_list_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() =>
                            removeWishListItemHandler(item.property)
                          }
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>List Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {listItems.reduce(
                      (acc, item) => acc + Number(item.quantity),
                      0
                    )}{" "}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. Total:{" "}
                  <span className="order-summary-values">
                    Ksh{" "}
                    {CurrencyFormatter(
                      listItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)
                    )}{" "}
                  </span>
                </p>

                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary btn-block"
                  onClick={checkoutHandler}
                >
                  Submit List
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default WishList;
