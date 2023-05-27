import { getDepartment } from '../../../api/departmentApi/Department';
import axiosConfig from '../../../utils/axiosConfig';
import { errorHandler } from '../../../utils/errorHandler';
import {
  DEPARTMENT_LIST_FAIL,
  DEPARTMENT_LIST_SUCCESS,
} from '../../constants/department/departmentConstants';
import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';

export const listDepartments = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.get(getDepartment);

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
