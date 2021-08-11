import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ details, confirmList, payment }) => {
  return (
    <div className="checkout-progress d-flex justify-content-center mt-5">
      {details ? (
        <Link to="wish/details" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step">Details</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Details</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

      {confirmList ? (
        <Link to="/wish/confirm" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step">Confirm Details</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Confirm Details</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

      {payment ? (
        <Link to="/wish/enquiry" className="float-right">
          <div className="triangle2-active"></div>
          <div className="step active-step">Send Enquiry</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Send Enquiry</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
    </div>
  );
};

export default CheckoutSteps;
