import {
  DASHBOARD_DATA_FAIL,
  DASHBOARD_DATA_RESET,
  DASHBOARD_DATA_SUCCESS,
  DASHBOARD_STATS_FAIL,
  DASHBOARD_STATS_RESET,
  DASHBOARD_STATS_SUCCESS,
} from '../../constants/dashboard/dashboardConstants';

export const dashboardDataReducer = (state = { dashboardData: {} }, action) => {
  switch (action.type) {
    case DASHBOARD_DATA_SUCCESS:
      return { dashboardData: action.payload };
    case DASHBOARD_DATA_FAIL:
      return { error: action.payload };
    case DASHBOARD_DATA_RESET:
      return {};
    default:
      return state;
  }
};

export const dashboardStatsReducer = (
  state = { dashboardStats: {} },
  action,
) => {
  switch (action.type) {
    case DASHBOARD_STATS_SUCCESS:
      return { dashboardStats: action.payload };
    case DASHBOARD_STATS_FAIL:
      return { error: action.payload };
    case DASHBOARD_STATS_RESET:
      return {};
    default:
      return state;
  }
};
