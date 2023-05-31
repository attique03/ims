import {
  SUBCATEGORY_ADD_FAIL,
  SUBCATEGORY_ADD_RESET,
  SUBCATEGORY_ADD_SUCCESS,
  SUBCATEGORY_DELETE_FAIL,
  SUBCATEGORY_DELETE_RESET,
  SUBCATEGORY_DELETE_SUCCESS,
  SUBCATEGORY_DETAILS_FAIL,
  SUBCATEGORY_DETAILS__SUCCESS,
} from '../../constants/subcategory/subCategoryConstants';

export const subcategoryDetailsReducer = (
  state = { subcategory: {} },
  action,
) => {
  switch (action.type) {
    case SUBCATEGORY_DETAILS__SUCCESS:
      return { subcategory: action.payload };
    case SUBCATEGORY_DETAILS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const subcategoryAddReducer = (
  state = { subcategoryAdded: {} },
  action,
) => {
  switch (action.type) {
    case SUBCATEGORY_ADD_SUCCESS:
      return { success: true, subcategoryAdded: action.payload };
    case SUBCATEGORY_ADD_FAIL:
      return { error: action.payload };
    case SUBCATEGORY_ADD_RESET:
      return {
        subcategoryAdded: {},
      };
    default:
      return state;
  }
};

export const subcategoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBCATEGORY_DELETE_SUCCESS:
      return { success: true };
    case SUBCATEGORY_DELETE_FAIL:
      return { error: action.payload };
    case SUBCATEGORY_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
