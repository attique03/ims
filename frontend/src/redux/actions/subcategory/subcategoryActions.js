import axios from 'axios';
import { getSubCategoryByIdApi } from '../../../api/subcategoryApi/SubcategoryApi';
import axiosConfig from '../../../utils/axiosConfig';
import { baseURL } from '../../../utils/constants';
import { errorHandler } from '../../../utils/errorHandler';
import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';
import {
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
