import { createCategoryApi } from '../../../api/categoryApi/CategoryApi';
import axiosConfig from '../../../utils/axiosConfig';
import { errorHandler } from '../../../utils/errorHandler';
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_SUCCESS,
} from '../../constants/category/categoryConstants';
import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';

export const createCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });
    console.log('category loaded ', category);
    const { data } = await axiosConfig.post(createCategoryApi, category);

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};
