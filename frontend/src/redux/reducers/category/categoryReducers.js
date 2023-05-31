import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_RESET,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_LIST_FAIL,
  CATEGORY_DETAILS_LIST_RESET,
  CATEGORY_DETAILS_LIST__SUCCESS,
  CATEGORY_DETAILS__SUCCESS,
  CATEGORY_FETCH_FAIL,
  CATEGORY_FETCH_RESET,
  CATEGORY_FETCH__SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_RESET,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_RESET,
  CATEGORY_UPDATE_SUCCESS,
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

export const categoryFetchReducer = (
  state = { categoryFetched: {} },
  action,
) => {
  switch (action.type) {
    case CATEGORY_FETCH__SUCCESS:
      return { categoryFetched: action.payload };
    case CATEGORY_FETCH_FAIL:
      return { error: action.payload };
    case CATEGORY_FETCH_RESET:
      return {
        categoryFetched: {},
      };
    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_SUCCESS:
      return { success: true, category: action.payload };
    case CATEGORY_UPDATE_FAIL:
      return { error: action.payload };
    case CATEGORY_UPDATE_RESET:
      return {
        category: {},
      };
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_SUCCESS:
      return { success: true };
    case CATEGORY_DELETE_FAIL:
      return { error: action.payload };
    case CATEGORY_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
