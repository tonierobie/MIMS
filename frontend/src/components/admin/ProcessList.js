import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import CurrencyFormatter from "../CurrencyFormatter";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getListDetails,
  updateList,
  clearErrors,
} from "../../actions/listActions";
import { UPDATE_LIST_RESET } from "../../constants/listConstants";

const ProcessList = ({ match }) => {
  const [status, setStatus] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, list = {} } = useSelector((state) => state.listDetails);
  const {
    details,
    listItems,
    paymentInfo,
    user,
    totalPrice,
    listStatus,
  } = list;
  const { error, isUpdated } = useSelector((state) => state.list);

  const listId = match.params.id;

  useEffect(() => {
    dispatch(getListDetails(listId));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("List updated successfully");
      dispatch({ type: UPDATE_LIST_RESET });
    }
  }, [dispatch, alert, error, isUpdated, listId]);

  const updateListHandler = (id) => {
    const formData = new FormData();
    formData.set("status", status);

    dispatch(updateList(id, formData));
  };

  const wishListDetails =
    details &&
    `${details.address}, ${details.city}, ${details.postalCode}, ${details.country}`;
  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <Fragment>
      <MetaData title={`Process List # ${list && list._id}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-7 list-details">
                  <h2 className="my-5">List # {list._id}</h2>

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

                  <h4 className="my-4">Stripe ID</h4>
                  <p>
                    <b>{paymentInfo && paymentInfo.id}</b>
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

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Status</h4>

                  <div className="form-group">
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Confirmed">Confirmed</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => updateListHandler(list._id)}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessList;
