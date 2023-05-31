import axios from 'axios';
import {
  addSubCategoryByCategoryId,
  deleteSubCategoryById,
  getSubCategoryByIdApi,
} from '../../../api/subcategoryApi/SubcategoryApi';
import axiosConfig from '../../../utils/axiosConfig';
import { baseURL } from '../../../utils/constants';
import { errorHandler } from '../../../utils/errorHandler';
import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';
import {
  SUBCATEGORY_ADD_FAIL,
  SUBCATEGORY_ADD_SUCCESS,
  SUBCATEGORY_DELETE_FAIL,
  SUBCATEGORY_DELETE_SUCCESS,
  SUBCATEGORY_DETAILS_FAIL,
  SUBCATEGORY_DETAILS__SUCCESS,
} from '../../constants/subcategory/subCategoryConstants';

export const listSubCategoryDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${baseURL}${getSubCategoryByIdApi(id)}`,
      config,
    );

    console.log('Here ', data);

    // const { data } = await axiosConfig.get(getSubCategoryByIdApi(id));

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

export const addSubCategory =
  (id, subCategory) => async (dispatch, getState) => {
    try {
      dispatch({
        type: LOADING_TRUE,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      console.log(
        'SubCat in Actions  ',
        id,
        subCategory,
        `http://127.0.0.1:4000${addSubCategoryByCategoryId(id)}`,
      );

      const { data } = await axios.put(
        `http://127.0.0.1:4000${addSubCategoryByCategoryId(id)}`,
        subCategory,
        config,
      );

      dispatch({
        type: SUBCATEGORY_ADD_SUCCESS,
        payload: data,
      });

      dispatch({
        type: LOADING_FALSE,
      });
    } catch (error) {
      dispatch({
        type: SUBCATEGORY_ADD_FAIL,
        payload: errorHandler(error),
      });

      dispatch({
        type: LOADING_FALSE,
      });
    }
  };

export const deleteSubCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `http://127.0.0.1:4000${deleteSubCategoryById(id)}`,
      config,
    );

    dispatch({
      type: SUBCATEGORY_DELETE_SUCCESS,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch({
      type: SUBCATEGORY_DELETE_FAIL,
      payload: errorHandler(error),
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};
