import {
  CREATE_LIST_REQUEST,
  CREATE_LIST_SUCCESS,
  CREATE_LIST_FAIL,
  CREATE_LIST_RESET,
  MY_LISTS_REQUEST,
  MY_LISTS_SUCCESS,
  MY_LISTS_FAIL,
  ALL_LISTS_REQUEST,
  ALL_LISTS_SUCCESS,
  ALL_LISTS_FAIL,
  UPDATE_LIST_REQUEST,
  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_RESET,
  UPDATE_LIST_FAIL,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_RESET,
  DELETE_LIST_FAIL,
  LIST_DETAILS_REQUEST,
  LIST_DETAILS_SUCCESS,
  LIST_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/listConstants";

export const newListReducer = (state = {}, action) => {
  //console.log(state);

  switch (action.type) {
    case CREATE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_LIST_SUCCESS:
      return {
        loading: false,
        isCreated: true,
        list: action.payload,
      };

    case CREATE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_LIST_RESET:
      return {
        ...state,
        isCreated: false,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myListsReducer = (state = { lists: [] }, action) => {
  switch (action.type) {
    case MY_LISTS_REQUEST:
      return {
        loading: true,
      };
    case MY_LISTS_SUCCESS:
      return {
        loading: false,
        lists: action.payload,
      };
    case MY_LISTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const listDetailsReducer = (state = { list: {} }, action) => {
  switch (action.type) {
    case LIST_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case LIST_DETAILS_SUCCESS:
      return {
        loading: false,
        list: action.payload,
      };

    case LIST_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allListsReducer = (state = { lists: [] }, action) => {
  switch (action.type) {
    case ALL_LISTS_REQUEST:
      return {
        loading: true,
      };

    case ALL_LISTS_SUCCESS:
      return {
        loading: false,
        lists: action.payload.lists,
        totalAmount: action.payload.totalAmount,
      };

    case ALL_LISTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const listReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LIST_REQUEST:
    case DELETE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_LIST_FAIL:
    case DELETE_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_LIST_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_LIST_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
