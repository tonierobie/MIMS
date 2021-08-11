import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  propertiesReducer,
  newPropertyReducer,
  propertyReducer,
  propertyDetailsReducer,
  newReviewReducer,
  propertyReviewsReducer,
  reviewReducer,
} from "./reducers/propertyReducers";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducers";
import { wishListReducer } from "./reducers/wishListReducers";
import {
  newListReducer,
  myListsReducer,
  listDetailsReducer,
  allListsReducer,
  listReducer,
} from "./reducers/listReducers";

const reducer = combineReducers({
  properties: propertiesReducer,
  propertyDetails: propertyDetailsReducer,
  newProperty: newPropertyReducer,
  property: propertyReducer,
  propertyReviews: propertyReviewsReducer,
  review: reviewReducer,
  auth: authReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  wishList: wishListReducer,
  newList: newListReducer,
  myLists: myListsReducer,
  allLists: allListsReducer,
  listDetails: listDetailsReducer,
  list: listReducer,
  newReview: newReviewReducer,
});

let initialState = {
  wishList: {
    listItems: localStorage.getItem("listItems")
      ? JSON.parse(localStorage.getItem("listItems"))
      : [],
    details: localStorage.getItem("details")
      ? JSON.parse(localStorage.getItem("details"))
      : {},
  },
};

const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
