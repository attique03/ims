import {
  getDashboardDataAdminApi,
  getDashboardDataSuperAdminApi,
  getDashboardStatsAdminApi,
  getDashboardStatsSuperAdminApi,
} from '../../../api/dashboardApi/DashboardApi';
import axiosConfig from '../../../utils/axiosConfig';
import { SUPERADMIN } from '../../../utils/constants';
import { errorHandler } from '../../../utils/errorHandler';
import {
  DASHBOARD_DATA_FAIL,
  DASHBOARD_DATA_SUCCESS,
  DASHBOARD_STATS_FAIL,
  DASHBOARD_STATS_SUCCESS,
} from '../../constants/dashboard/dashboardConstants';
import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';

export const listDashboardData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axiosConfig.get(
      userInfo?.user?.role?.role === SUPERADMIN
        ? getDashboardDataSuperAdminApi
        : getDashboardDataAdminApi,
    );

    dispatch({
      type: DASHBOARD_DATA_SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch({
      type: DASHBOARD_DATA_FAIL,
      payload: errorHandler(error),
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const listDashboardStats = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axiosConfig.get(
      userInfo?.user?.role?.role === SUPERADMIN
        ? getDashboardStatsSuperAdminApi
        : getDashboardStatsAdminApi,
    );

    dispatch({
      type: DASHBOARD_STATS_SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch({
      type: DASHBOARD_STATS_FAIL,
      payload: errorHandler(error),
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }
};
