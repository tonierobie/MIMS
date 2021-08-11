import axios from "axios";

import {
  ALL_PROPERTIES_REQUEST,
  ALL_PROPERTIES_SUCCESS,
  ALL_PROPERTIES_FAIL,
  ADMIN_PROPERTIES_REQUEST,
  ADMIN_PROPERTIES_SUCCESS,
  ADMIN_PROPERTIES_FAIL,
  NEW_PROPERTY_REQUEST,
  NEW_PROPERTY_SUCCESS,
  NEW_PROPERTY_FAIL,
  DELETE_PROPERTY_REQUEST,
  DELETE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_FAIL,
  UPDATE_PROPERTY_REQUEST,
  UPDATE_PROPERTY_SUCCESS,
  UPDATE_PROPERTY_FAIL,
  PROPERTY_DETAILS_REQUEST,
  PROPERTY_DETAILS_SUCCESS,
  PROPERTY_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/propertyConstants";

export const getProperties = (
  keyword = "",
  currentPage = 1,
  price,
  category,
  rating = 0
) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PROPERTIES_REQUEST });

    let link = `/api/v1/properties?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

    if (category) {
      link = `/api/v1/properties?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
    }

    const { data } = await axios.get(link);

    dispatch({
      type: ALL_PROPERTIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PROPERTIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete property (Admin)
export const deleteProperty = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROPERTY_REQUEST });
    const { data } = await axios.delete(`/api/v1/admin/property/${id}`);

    dispatch({
      type: DELETE_PROPERTY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PROPERTY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Property (ADMIN)
export const updateProperty = (id, propertyData) => async (dispatch) => {
  var object = {};
  propertyData.forEach((value, key) => {
    // Reflect.has in favor of: object.hasOwnProperty(key)
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });
  var json = JSON.stringify(object);
  try {
    dispatch({ type: UPDATE_PROPERTY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/property/${id}`,
      json,
      config
    );

    dispatch({
      type: UPDATE_PROPERTY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROPERTY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPropertyDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PROPERTY_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/property/${id}`);

    dispatch({
      type: PROPERTY_DETAILS_SUCCESS,
      payload: data.property,
    });
  } catch (error) {
    dispatch({
      type: PROPERTY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newProperty = (propertyData) => async (dispatch) => {
  // for (var pair of propertyData.entries()) {
  //   console.log(pair[0] + ' - ' + pair[1])
  // }
  var object = {};
  propertyData.forEach((value, key) => {
    // Reflect.has in favor of: object.hasOwnProperty(key)
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });
  var json = JSON.stringify(object);
  try {
    dispatch({ type: NEW_PROPERTY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/v1/admin/property/new`,
      json,
      config
    );

    dispatch({
      type: NEW_PROPERTY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PROPERTY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  var object = {};
  reviewData.forEach(function (value, key) {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/review`, json, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminProperties = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PROPERTIES_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/properties`);

    dispatch({
      type: ADMIN_PROPERTIES_SUCCESS,
      payload: data.properties,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PROPERTIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get property reviews
export const getPropertyReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete property review
export const deleteReview = (id, propertyId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${id}&propertyId=${propertyId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    //console.log(error.response);

    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
