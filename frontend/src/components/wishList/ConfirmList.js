import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import CurrencyFormatter from "../CurrencyFormatter";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createList, clearErrors } from "../../actions/listActions";
import { resetWishList } from "../../actions/wishListActions";
import { CREATE_LIST_RESET } from "../../constants/listConstants";

const ConfirmList = ({ history }) => {
  const { listItems, details } = useSelector((state) => state.wishList);
  const { user } = useSelector((state) => state.auth);

  // Calculate List Prices
  const itemsPrice = listItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.16 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isCreated, error } = useSelector((state) => state.newList);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isCreated) {
      history.push("/wish/enquiry");
      alert.success("List Sent successfully");
      dispatch(resetWishList([]));
      dispatch({ type: CREATE_LIST_RESET });
    }
  }, [dispatch, alert, error, isCreated, history]);

  const sendEnquiry = () => {
    const list = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
      listItems: listItems,
      details,
    };
    //sessionStorage.setItem("listInfo", JSON.stringify(data));
    dispatch(createList(list));
  };

  return (
    <Fragment>
      <MetaData title={"Confirm List"} />

      <CheckoutSteps details confirmList />

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 list-confirm">
          <h4 className="mb-3">Details</h4>
          <p>
            <b>Name:</b> {user && user.name}
          </p>
          <p>
            <b>Phone:</b> {details.phoneNo}
          </p>
          <p>
            <b>Email:</b> {details.email}
          </p>
          <p className="mb-4">
            <b>Address:</b>{" "}
            {`${details.address}, ${details.city}, ${details.postalCode}, ${details.country}`}
          </p>

          <hr />
          <h4 className="mt-4">Your Wish List Items:</h4>

          {listItems.map((item) => (
            <Fragment>
              <hr />
              <div className="wish_list-item my-1" key={item.product}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={`/uploads/properties/${item.imageDir}/${item.image}`}
                      alt="Laptop"
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/property/${item.property}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x Ksh {CurrencyFormatter(item.price)} ={" "}
                      <b>
                        Ksh{" "}
                        {CurrencyFormatter(
                          (item.quantity * item.price).toFixed(2)
                        )}
                      </b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="list_summary">
            <h4>Est. List Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="list-summary-values">
                Ksh {CurrencyFormatter(itemsPrice)}
              </span>
            </p>
            <p>
              Shipping:{" "}
              <span className="list-summary-values">
                Ksh {CurrencyFormatter(shippingPrice)}
              </span>
            </p>
            <p>
              Tax:{" "}
              <span className="list-summary-values">
                Ksh {CurrencyFormatter(taxPrice)}
              </span>
            </p>

            <hr />

            <p>
              Total:{" "}
              <span className="list-summary-values">
                Ksh {CurrencyFormatter(totalPrice)}
              </span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={sendEnquiry}
            >
              Send To Enquire
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmList;
