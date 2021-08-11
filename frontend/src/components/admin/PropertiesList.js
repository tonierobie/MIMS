import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "../table";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import CurrencyFormatter from "../CurrencyFormatter";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProperties,
  deleteProperty,
  clearErrors,
} from "../../actions/propertyActions";
import { DELETE_PROPERTY_RESET } from "../../constants/propertyConstants";

const PropertiesList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, properties } = useSelector(
    (state) => state.properties
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.property
  );

  useEffect(() => {
    dispatch(getAdminProperties());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Property deleted successfully");
      history.push("/admin/properties");
      dispatch({ type: DELETE_PROPERTY_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted, history]);

  const setProperties = () => {
    const data = {
      columns: [
        {
          Header: "ID",
          accessor: "id",
        },
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Price",
          accessor: "price",
        },
        {
          Header: "Stock",
          accessor: "stock",
        },
        {
          Header: "Actions",
          accessor: "actions",
        },
      ],
      rows: [],
    };

    properties.forEach((property) => {
      data.rows.push({
        id: property._id,
        name: property.name,
        price: `Ksh ${CurrencyFormatter(property.price)}`,
        stock: property.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/property/${property._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deletePropertyHandler(property._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deletePropertyHandler = (id) => {
    dispatch(deleteProperty(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Properties"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Properties</h1>

            {loading ? (
              <Loader />
            ) : (
              <Table
                columns={setProperties().columns}
                data={setProperties().rows}
                rowProps={(row) => ({
                  style: {
                    background: row.id % 2 ? "lightgrey" : "white",
                  },
                })}
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default PropertiesList;
