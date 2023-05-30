import axios from 'axios';
import { getDepartment } from '../../../api/departmentApi/Department';
import axiosConfig from '../../../utils/axiosConfig';
import { baseURL } from '../../../utils/constants';
import { errorHandler } from '../../../utils/errorHandler';
import {
  DEPARTMENT_LIST_FAIL,
  DEPARTMENT_LIST_SUCCESS,
} from '../../constants/department/departmentConstants';
import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';

export const listDepartments = () => async (dispatch, getState) => {
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

    const { data } = await axios.get(`${baseURL}${getDepartment}`, config);

    // const { data } = await axiosConfig.get(getDepartment);

    dispatch({
      type: DEPARTMENT_LIST_SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch({
      type: DEPARTMENT_LIST_FAIL,
      payload: errorHandler(error),
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }
};
