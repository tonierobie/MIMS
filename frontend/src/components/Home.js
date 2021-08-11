import React, { useState, useEffect, Fragment } from "react";
import Pagination from "react-js-pagination";

import MetaData from "./layout/MetaData";
import Property from "../components/property/Property";
import Loader from "./layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProperties } from "../actions/propertyActions";

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(1000000000);
  const [price, setPrice] = useState([1, 1000000000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const categories = [
    "Apartment for sale",
    "House for sale",
    "Office space for sale",
    "Warehouse for sale",
    "Land for sale",
    "Apartment for rent",
    "House for rent",
    "Office space for rent",
    "Warehouse for rent",
    "Land for Lease",
    "1 bedroom to let",
    "2 bedroom to let",
    "3 bedroom to let",
    "4 bedroom to let",
    "5 bedroom to let",
  ];

  const alert = useAlert();
  const dispatch = useDispatch();

  const {
    loading,
    properties,
    error,
    propertiesCount,
    resPerPage,
    filteredPropertiesCount,
  } = useSelector((state) => state.properties);

  const keyword = match.params.keyword;

  const onSliderChange = (e) => {
    e.preventDefault();
    return setPrice([min, max]);
  };

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    //console.log(category);
    dispatch(getProperties(keyword, currentPage, price, category, rating));
  }, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = propertiesCount;
  if (keyword) {
    count = filteredPropertiesCount;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Buy Best Properties Online"} />

          <section id="properties" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <form onSubmit={onSliderChange}>
                        <label>Min: </label>
                        <input
                          type="number"
                          value={min}
                          onChange={(e) => setMin(e.target.value)}
                        />
                        <br />
                        <label>Max: </label>
                        <input
                          type="number"
                          value={max}
                          onChange={(e) => setMax(e.target.value)}
                        />
                        <br />
                        <br />
                        <button type="submit">Search</button>
                      </form>
                      <hr className="my-5" />

                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>

                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr className="my-3" />

                      <div className="mt-5">
                        <h4 className="mb-3">Ratings</h4>

                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={star}
                              onClick={() => setRating(star)}
                            >
                              <div className="rating-outer">
                                <div
                                  className="rating-inner"
                                  style={{ width: `${star * 20}%` }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {properties &&
                        properties.map((property) => (
                          <Property
                            key={property._id}
                            property={property}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                properties &&
                properties.map((property) => (
                  <Property key={property._id} property={property} col={3} />
                ))
              )}
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={propertiesCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
