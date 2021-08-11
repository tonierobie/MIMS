import React from "react";
import { Link } from "react-router-dom";
import CurrencyFormatter from "../CurrencyFormatter";

const Property = ({ property, col }) => {
  return (
    <div key={property._id} className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={`/uploads/properties/${property.imageDir}/${property.images[0].url}`}
          alt=""
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/property/${property._id}`}>{property.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(property.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({property.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">Ksh {CurrencyFormatter(property.price)}</p>
          <Link
            to={`/property/${property._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Property;
