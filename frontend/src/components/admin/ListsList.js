import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "../table";
import CurrencyFormatter from "../CurrencyFormatter";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { allLists, deleteList, clearErrors } from "../../actions/listActions";
import { DELETE_LIST_RESET } from "../../constants/listConstants";

const ListsList = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, lists } = useSelector((state) => state.allLists);
  const { isDeleted } = useSelector((state) => state.list);

  useEffect(() => {
    dispatch(allLists());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("List deleted successfully");
      history.push("/admin/lists");
      dispatch({ type: DELETE_LIST_RESET });
    }
  }, [dispatch, alert, error, isDeleted, history]);

  const deleteListHandler = (id) => {
    dispatch(deleteList(id));
  };

  const setLists = () => {
    const data = {
      columns: [
        {
          Header: "List ID",
          accessor: "id",
        },
        {
          Header: "No of Items",
          accessor: "numofItems",
        },
        {
          Header: "Amount",
          accessor: "amount",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        {
          Header: "Actions",
          accessor: "actions",
        },
      ],
      rows: [],
    };

    lists.forEach((list) => {
      data.rows.push({
        id: list._id,
        numofItems: list.listItems.length,
        amount: `Ksh ${CurrencyFormatter(list.totalPrice)}`,
        status: list.listStatus && String(list.listStatus),
        actions: (
          <Fragment>
            <Link
              to={`/admin/list/${list._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteListHandler(list._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Lists"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Lists</h1>

            {loading ? (
              <Loader />
            ) : (
              <Table
                columns={setLists().columns}
                data={setLists().rows}
                rowProps={(row) => ({
                  style: {
                    background:
                      row.original.status === "Confirmed"
                        ? "#99CC99"
                        : "#ffe7f1",
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

export default ListsList;
