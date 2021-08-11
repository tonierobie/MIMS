import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "../table";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import CurrencyFormatter from "../CurrencyFormatter";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { myLists, clearErrors } from "../../actions/listActions";

const ListLists = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, lists } = useSelector((state) => state.myLists);

  useEffect(() => {
    dispatch(myLists());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setLists = () => {
    const data = {
      columns: [
        {
          Header: "List ID",
          accessor: "id",
        },
        {
          Header: "Date",
          accessor: "dates",
        },
        {
          Header: "Num of Items",
          accessor: "numOfItems",
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
      /* let newStatus = String(list.listStatus).includes('Confirmed') ? (
        <p style={{ color: 'green' }}>{list.listStatus}</p>
      ) : (
        <p style={{ color: 'red' }}>{list.listStatus}</p>
      ) */
      data.rows.push({
        id: list._id,
        dates: new Date(list.createdAt).toLocaleDateString(),
        numOfItems: list.listItems.length,
        amount: `Ksh ${CurrencyFormatter(list.totalPrice)}`,
        status: list.listStatus,
        actions: (
          <Link to={`/list/${list._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"My Lists"} />

      <h1 className="my-5">My Lists</h1>

      {loading ? (
        <Loader />
      ) : (
        <Table
          columns={setLists().columns}
          data={setLists().rows}
          rowProps={(row) => ({
            style: {
              background:
                row.original.status === "Confirmed" ? "#99CC99" : "#ffe7f1",
            },
          })}
        />
      )}
      <div style={{ marginBottom: "5rem" }}></div>
    </Fragment>
  );
};

export default ListLists;
