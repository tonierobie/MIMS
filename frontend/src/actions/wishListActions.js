import axios from "axios";
import {
  ADD_TO_WISH_LIST,
  REMOVE_ITEM_WISH_LIST,
  WISH_LIST_ITEMS_RESET,
  SAVE_DETAILS,
} from "../constants/wishListConstants";

export const addItemToWishList = (id, quantity) => async (
  dispatch,
  getState
) => {
  const { data } = await axios.get(`/api/v1/property/${id}`);
  dispatch({
    type: ADD_TO_WISH_LIST,
    payload: {
      property: data.property._id,
      name: data.property.name,
      price: data.property.price,
      imageDir: data.property.imageDir,
      image: data.property.images[0].url,
      stock: data.property.stock,
      quantity,
    },
  });

  localStorage.setItem(
    "listItems",
    JSON.stringify(getState().wishList.listItems)
  );
};

export const removeItemFromWishList = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_WISH_LIST,
    payload: id,
  });

  localStorage.setItem(
    "listItems",
    JSON.stringify(getState().wishList.listItems)
  );
};

export const saveDetails = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_DETAILS,
    payload: data,
  });

  localStorage.setItem("details", JSON.stringify(data));
};

export const resetWishList = (data) => async (dispatch) => {
  dispatch({
    type: WISH_LIST_ITEMS_RESET,
    payload: data,
  });

  localStorage.setItem("listItems", JSON.stringify(data));
};
