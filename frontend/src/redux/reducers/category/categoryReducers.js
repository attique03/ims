import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
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
