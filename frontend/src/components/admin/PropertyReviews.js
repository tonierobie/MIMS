import React, { Fragment, useState, useEffect } from "react";
import { Table } from "../table";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getPropertyReviews,
  deleteReview,
  clearErrors,
} from "../../actions/propertyActions";
import { DELETE_REVIEW_RESET } from "../../constants/propertyConstants";

const PropertyReviews = () => {
  const [propertyId, setPropertyId] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, reviews } = useSelector((state) => state.propertyReviews);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (propertyId !== "") {
      dispatch(getPropertyReviews(propertyId));
    }

    if (isDeleted) {
      alert.success("Review deleted successfully");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, propertyId, isDeleted, deleteError]);

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, propertyId));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getPropertyReviews(propertyId));
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          Header: "Review ID",
          accessor: "id",
        },
        {
          Header: "Rating",
          accessor: "rating",
        },
        {
          Header: "Comment",
          accessor: "comment",
        },
        {
          Header: "User",
          accessor: "user",
        },
        {
          Header: "Actions",
          accessor: "actions",
        },
      ],
      rows: [],
    };

    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user: review.name,

        actions: (
          <button
            className="btn btn-danger py-1 px-2 ml-2"
            onClick={() => deleteReviewHandler(review._id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Property Reviews"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="propertyId_field">Enter Property ID</label>
                    <input
                      type="text"
                      id="propertyId_field"
                      className="form-control"
                      value={propertyId}
                      onChange={(e) => setPropertyId(e.target.value)}
                    />
                  </div>

                  <button
                    id="search_button"
                    type="submit"
                    className="btn btn-primary btn-block py-2"
                  >
                    SEARCH
                  </button>
                </form>
              </div>
            </div>

            {reviews && reviews.length > 0 ? (
              <Table
                columns={setReviews().columns}
                data={setReviews().rows}
                rowProps={(row) => ({
                  style: {
                    background: row.id % 2 ? "lightgrey" : "white",
                  },
                })}
              />
            ) : (
              <p className="mt-5 text-center">No Reviews.</p>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default PropertyReviews;
