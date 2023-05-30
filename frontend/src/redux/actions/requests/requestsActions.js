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
  REQUESTS_CREATE_FAIL,
  REQUESTS_CREATE_SUCCESS,
  REQUESTS_DETAILS_FAIL,
  REQUESTS_DETAILS_SUCCESS,
  REQUESTS_LIST_FAIL,
  REQUESTS_LIST_SUCCESS,
  REQUESTS_UPDATE_FAIL,
  REQUESTS_UPDATE_SUCCESS,
} from '../../constants/requests/requestsConstants';
import axios from 'axios';
import { baseURL } from '../../../utils/constants';

export const createRequest = (requests) => async (dispatch, getState) => {
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

    const { data } = await axios.post(
      `${baseURL}${createRequests}`,
      requests,
      config,
    );

    console.log('Here ', data);

    // const { data } = await axiosConfig.post(createRequests, requests);

    dispatch({
      type: REQUESTS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQUESTS_CREATE_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};

export const listRequests =
  (type = '', userId = '') =>
  async (dispatch, getState) => {
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
        `${baseURL}${getRequests(type, userId)}`,
        config,
      );

      console.log('Here ', data);

      // const { data } = await axiosConfig.get(getRequests(type, userId));

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

export const listRequestsDetails = (id) => async (dispatch, getState) => {
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
      `${baseURL}${getRequestsById(id)}`,
      config,
    );

    console.log('Here ', data);

    // const { data } = await axiosConfig.get(getRequestsById(id));

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
  async (dispatch, getState) => {
    try {
      dispatch({
        type: LOADING_TRUE,
      });

      console.log('aksdalsk ', id, status, returnType);

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.patch(
        `${baseURL}${updateRequestsById(id, status, returnType)}`,
        {},
        config,
      );

      console.log('Here ', data);

      // const { data } = await axiosConfig.patch(
      //   updateRequestsById(id, status, returnType),
      // );

      dispatch({
        type: REQUESTS_UPDATE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: LOADING_FALSE,
      });
    } catch (error) {
      dispatch({
        type: REQUESTS_UPDATE_FAIL,
        payload: errorHandler(error),
      });

      dispatch({
        type: LOADING_FALSE,
      });
    }
  };
