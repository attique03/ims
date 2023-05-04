import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_LIST_FAIL,
  CATEGORY_DETAILS_LIST_RESET,
  CATEGORY_DETAILS_LIST__SUCCESS,
  CATEGORY_DETAILS__SUCCESS,
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

export const categoryDetailsListReducer = (
  state = { categories: [] },
  action,
) => {
  switch (action.type) {
    case CATEGORY_DETAILS_LIST__SUCCESS:
      return {
        categories: action.payload,
      };
    case CATEGORY_DETAILS_LIST_FAIL:
      return { error: action.payload };
    case CATEGORY_DETAILS_LIST_RESET:
      return { categories: [] };
    default:
      return state;
  }
};

export const categoryDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_DETAILS__SUCCESS:
      return { category: action.payload };
    case CATEGORY_DETAILS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
