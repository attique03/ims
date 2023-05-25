import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';
import axiosConfig from '../../../utils/axiosConfig';
import { errorHandler } from '../../../utils/errorHandler';
import {
  createRequests,
  getRequests,
  getRequestsById,
  updateRequestsById,
} from '../../../api/requestsApi/Requests';
import {
  REQUESTS_DETAILS_FAIL,
  REQUESTS_DETAILS_SUCCESS,
  REQUESTS_LIST_FAIL,
  REQUESTS_LIST_SUCCESS,
  REQUESTS_UPDATE_FAIL,
  REQUESTS_UPDATE_SUCCESS,
} from '../../constants/requests/requestsConstants';

export const listRequests =
  (type = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOADING_TRUE,
      });

      const { data } = await axiosConfig.get(getRequests(type));

      dispatch({
        type: REQUESTS_LIST_SUCCESS,
        payload: data,
      });

      dispatch({
        type: LOADING_FALSE,
      });
    } catch (error) {
      dispatch({
        type: REQUESTS_LIST_FAIL,
        payload: errorHandler(error),
      });

      dispatch({
        type: LOADING_FALSE,
      });
    }
  };

export const listRequestsDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.get(getRequestsById(id));

    dispatch({
      type: REQUESTS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQUESTS_DETAILS_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};

export const updateRequests =
  (id, status = '', returnType = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOADING_TRUE,
      });

      const { data } = await axiosConfig.patch(
        updateRequestsById(id, status, returnType),
      );

      dispatch({
        type: REQUESTS_UPDATE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: LOADING_FALSE,
      });
    } catch (error) {
      console.log('Error ===> ', error);
      dispatch({
        type: REQUESTS_UPDATE_FAIL,
        payload: errorHandler(error),
      });

      dispatch({
        type: LOADING_FALSE,
      });
    }
  };
