import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_RESET,
  CATEGORY_LIST_SUCCESS,
} from '../../constants/category/categoryConstants';

export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_SUCCESS:
      return { success: true, category: action.payload };
    case CATEGORY_CREATE_FAIL:
      return { error: action.payload };
    case CATEGORY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_SUCCESS:
      return {
        categories: action.payload,
      };
    case CATEGORY_LIST_FAIL:
      return { error: action.payload };
    case CATEGORY_LIST_RESET:
      return { categories: [] };
    default:
      return state;
  }
};
