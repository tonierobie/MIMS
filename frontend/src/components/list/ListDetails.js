import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import CurrencyFormatter from "../CurrencyFormatter";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getListDetails, clearErrors } from "../../actions/listActions";

const ListDetails = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, list = {} } = useSelector(
    (state) => state.listDetails
  );
  const {
    details,
    listItems,
    paymentInfo,
    user,
    totalPrice,
    listStatus,
  } = list;

  useEffect(() => {
    dispatch(getListDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, match.params.id]);

  const wishListDetails =
    details &&
    `${details.address}, ${details.city}, ${details.postalCode}, ${details.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <Fragment>
      <MetaData title={"List Details"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 list-details">
              <h1 className="my-5">List # {list._id}</h1>

              <h4 className="mb-4">Details</h4>
              <p>
                <b>Name:</b> {user && user.name}
              </p>
              <p>
                <b>Phone:</b> {details && details.phoneNo}
              </p>
              <p>
                <b>Email:</b> {details && details.email}
              </p>
              <p className="mb-4">
                <b>Address: </b>
                {wishListDetails}
              </p>
              <p>
                <b>Amount:</b> Ksh {CurrencyFormatter(totalPrice)}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">List Status:</h4>
              <p
                className={
                  list.listStatus &&
                  String(list.listStatus).includes("Confirmed")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{listStatus}</b>
              </p>

              <h4 className="my-4">List Items:</h4>

              <hr />
              <div className="wish_list-item my-1">
                {listItems &&
                  listItems.map((item) => (
                    <div key={item.product} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={`/uploads/properties/${item.imageDir}/${item.image}`}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/property/${item.property}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>Ksh {CurrencyFormatter(item.price)}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ListDetails;
