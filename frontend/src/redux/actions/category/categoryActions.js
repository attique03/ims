import {
  createCategoryApi,
  getAllCategoriesApi,
  getCategoryByIdApi,
} from '../../../api/categoryApi/CategoryApi';
import axiosConfig from '../../../utils/axiosConfig';
import { errorHandler } from '../../../utils/errorHandler';
import {
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_LIST_FAIL,
  CATEGORY_DETAILS_LIST__SUCCESS,
  CATEGORY_DETAILS__SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_SUCCESS,
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

export const listCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.get(createCategoryApi);

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: errorHandler(error),
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const listDetailsCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.get(getAllCategoriesApi);

    dispatch({
      type: CATEGORY_DETAILS_LIST__SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_LIST_FAIL,
      payload: errorHandler(error),
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const listCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.get(getCategoryByIdApi(id));

    dispatch({
      type: CATEGORY_DETAILS__SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};
