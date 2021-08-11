import axios from "axios";

import {
  CREATE_LIST_REQUEST,
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAIL,
  MY_LISTS_REQUEST,
  MY_LISTS_SUCCESS,
  MY_LISTS_FAIL,
  ALL_LISTS_REQUEST,
  ALL_LISTS_SUCCESS,
  ALL_LISTS_FAIL,
  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_REQUEST,
  UPDATE_LIST_FAIL,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAIL,
  LIST_DETAILS_REQUEST,
  LIST_DETAILS_SUCCESS,
  LIST_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/listConstants";

export const createList = (list) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_LIST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/list/new", list, config);

    dispatch({
      type: CREATE_LIST_SUCCESS,
      payload: data.list,
    });
  } catch (error) {
    dispatch({
      type: CREATE_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get currently logged in user lists
export const myLists = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_LISTS_REQUEST,
    });
    const { data } = await axios.get("/api/v1/lists/me");
    dispatch({
      type: MY_LISTS_SUCCESS,
      payload: data.lists,
    });
  } catch (error) {
    dispatch({
      type: MY_LISTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get List Details
export const getListDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LIST_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/list/${id}`);
    dispatch({
      type: LIST_DETAILS_SUCCESS,
      payload: data.list,
    });
  } catch (error) {
    dispatch({
      type: LIST_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all lists - ADMIN
export const allLists = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_LISTS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/lists`);

    dispatch({
      type: ALL_LISTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_LISTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update list
export const updateList = (id, listData) => async (dispatch) => {
  var object = {};
  listData.forEach(function (value, key) {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  try {
    dispatch({ type: UPDATE_LIST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/admin/list/${id}`, json, config);

    dispatch({
      type: UPDATE_LIST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete list
export const deleteList = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_LIST_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/list/${id}`);

    dispatch({
      type: DELETE_LIST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_LIST_FAIL,
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
