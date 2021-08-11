import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

const PropertyDetails = ({ category }) => {
  const dispatch = useDispatch();
  console.log(category);

  useEffect(() => {}, [category]);

  return <Fragment></Fragment>;
};

export default PropertyDetails;
