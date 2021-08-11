import {
  ADD_TO_WISH_LIST,
  REMOVE_ITEM_WISH_LIST,
  WISH_LIST_ITEMS_RESET,
  SAVE_DETAILS,
} from "../constants/wishListConstants";

export const wishListReducer = (
  state = { listItems: [], details: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_WISH_LIST:
      const item = action.payload;

      const isItemExist = state.listItems.find(
        (i) => i.property === item.property
      );

      if (isItemExist) {
        return {
          ...state,
          listItems: state.listItems.map((i) =>
            i.property === isItemExist.property ? item : i
          ),
        };
      } else {
        return {
          ...state,
          listItems: [...state.listItems, item],
        };
      }

    case REMOVE_ITEM_WISH_LIST:
      return {
        ...state,
        listItems: state.listItems.filter((i) => i.property !== action.payload),
      };

    case SAVE_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case WISH_LIST_ITEMS_RESET:
      return {
        ...state,
        listItems: [],
        isRemoved: action.payload.isRemoved,
        success: false,
      };

    default:
      return state;
  }
};
