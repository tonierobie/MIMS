import {
  ALL_PROPERTIES_REQUEST,
  ALL_PROPERTIES_SUCCESS,
  ALL_PROPERTIES_FAIL,
  ADMIN_PROPERTIES_REQUEST,
  ADMIN_PROPERTIES_SUCCESS,
  ADMIN_PROPERTIES_FAIL,
  NEW_PROPERTY_REQUEST,
  NEW_PROPERTY_SUCCESS,
  NEW_PROPERTY_RESET,
  NEW_PROPERTY_FAIL,
  DELETE_PROPERTY_REQUEST,
  DELETE_PROPERTY_SUCCESS,
  DELETE_PROPERTY_RESET,
  DELETE_PROPERTY_FAIL,
  UPDATE_PROPERTY_REQUEST,
  UPDATE_PROPERTY_SUCCESS,
  UPDATE_PROPERTY_RESET,
  UPDATE_PROPERTY_FAIL,
  PROPERTY_DETAILS_REQUEST,
  PROPERTY_DETAILS_SUCCESS,
  PROPERTY_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  NEW_REVIEW_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/propertyConstants";

export const propertiesReducer = (state = { properties: [] }, action) => {
  switch (action.type) {
    case ALL_PROPERTIES_REQUEST:
    case ADMIN_PROPERTIES_REQUEST:
      return {
        loading: true,
        properties: [],
      };

    case ALL_PROPERTIES_SUCCESS:
      return {
        loading: false,
        properties: action.payload.properties,
        propertiesCount: action.payload.propertiesCount,
        resPerPage: action.payload.resPerPage,
        filteredPropertiesCount: action.payload.filteredPropertiesCount,
      };

    case ADMIN_PROPERTIES_SUCCESS:
      return {
        loading: false,
        properties: action.payload,
      };
    case ALL_PROPERTIES_FAIL:
    case ADMIN_PROPERTIES_FAIL:
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

export const newPropertyReducer = (state = { property: {} }, action) => {
  switch (action.type) {
    case NEW_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PROPERTY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        property: action.payload.property,
      };
    case NEW_PROPERTY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_PROPERTY_RESET:
      return {
        ...state,
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

export const propertyReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PROPERTY_REQUEST:
    case UPDATE_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_PROPERTY_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_PROPERTY_FAIL:
    case UPDATE_PROPERTY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_PROPERTY_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_PROPERTY_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const propertyDetailsReducer = (state = { property: {} }, action) => {
  switch (action.type) {
    case PROPERTY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROPERTY_DETAILS_SUCCESS:
      return {
        loading: false,
        property: action.payload,
      };
    case PROPERTY_DETAILS_FAIL:
      return {
        ...state,
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

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_REVIEW_RESET:
      return {
        ...state,
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

export const propertyReviewsReducer = (state = { review: [] }, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_REVIEWS_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };

    case GET_REVIEWS_FAIL:
      return {
        ...state,
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

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_REVIEW_RESET:
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
