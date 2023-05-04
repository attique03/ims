import {
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
