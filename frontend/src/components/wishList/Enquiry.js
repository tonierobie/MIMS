import React, { Fragment } from "react";
import MetaData from "../layout/MetaData";

const Enquiry = () => {
  return (
    <Fragment>
      <MetaData title={"Order Success"} />

      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src="/images/order_success.png"
            alt="Order Success"
            width="200"
            height="200"
          />

          <h2>Your list has been sent successfully.</h2>
        </div>
      </div>
    </Fragment>
  );
};

export default Enquiry;
