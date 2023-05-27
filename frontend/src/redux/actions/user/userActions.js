import {
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
} from '../../constants/user/userConstants';
import axiosConfig from '../../../utils/axiosConfig';
import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';
import {
  createUserApi,
  getUserApi,
  getUsersApi,
  loginApi,
  resetPasswordUserApi,
} from '../../../api/userapis/UserApis';
import { errorHandler } from '../../../utils/errorHandler';
import {
  removeLocalStorage,
  setLocalStorage,
} from '../../../utils/localStorage';
import {
  DASHBOARD_DATA_RESET,
  DASHBOARD_STATS_RESET,
} from '../../constants/dashboard/dashboardConstants';

export const createUser = (user, email) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.post(createUserApi(email), user);

    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch({
      type: USER_CREATE_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};

export const resetPasswordUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.patch(resetPasswordUserApi(email), {
      password,
    });

    dispatch({
      type: USER_RESET_PASSWORD_SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch({
      type: USER_RESET_PASSWORD_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.post(loginApi, {
      email,
      password,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // setLocalStorage('userInfo', data);
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};

export const listUsers =
  (organizationId = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOADING_TRUE,
      });

      const { data } = await axiosConfig.get(getUsersApi(organizationId));

      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      });

      dispatch({
        type: LOADING_FALSE,
      });
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload: errorHandler(error),
      });

      dispatch({
        type: LOADING_FALSE,
      });
    }
  };

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.get(getUserApi(id));

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  // removeLocalStorage('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: DASHBOARD_DATA_RESET });
  dispatch({ type: DASHBOARD_STATS_RESET });
};
