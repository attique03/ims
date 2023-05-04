import { getSubCategoryByIdApi } from '../../../api/subcategoryApi/SubcategoryApi';
import axiosConfig from '../../../utils/axiosConfig';
import { errorHandler } from '../../../utils/errorHandler';
import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';
import {
  SUBCATEGORY_DETAILS_FAIL,
  SUBCATEGORY_DETAILS__SUCCESS,
} from '../../constants/subcategory/subCategoryConstants';

export const listSubCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.get(getSubCategoryByIdApi(id));

    dispatch({
      type: SUBCATEGORY_DETAILS__SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_DETAILS_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};
