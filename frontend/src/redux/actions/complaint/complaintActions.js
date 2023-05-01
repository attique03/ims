import axiosConfig from '../../../utils/axiosConfig';
import { errorHandler } from '../../../utils/errorHandler';
import {
  COMPLAINT_CREATE_FAIL,
  COMPLAINT_CREATE_SUCCESS,
  COMPLAINT_DETAILS_FAIL,
  COMPLAINT_DETAILS_SUCCESS,
  COMPLAINT_LIST_FAIL,
  COMPLAINT_LIST_SUCCESS,
  COMPLAINT_UPDATE_FAIL,
  COMPLAINT_UPDATE_SUCCESS,
} from '../../constants/complaint/complaintConstants';
import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';
import {
  createComplaintApi,
  getComplaintApi,
  getComplaintsApi,
} from '../../../api/complaintApi/ComplaintApi';

export const createComplaint = (complaint) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.post(createComplaintApi, complaint);

    dispatch({
      type: COMPLAINT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPLAINT_CREATE_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};

export const listComplaints =
  (employees = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOADING_TRUE,
      });

      const { data } = await axiosConfig.get(getComplaintsApi(employees));

      dispatch({
        type: COMPLAINT_LIST_SUCCESS,
        payload: data,
      });

      dispatch({
        type: LOADING_FALSE,
      });
    } catch (error) {
      dispatch({
        type: COMPLAINT_LIST_FAIL,
        payload: errorHandler(error),
      });

      dispatch({
        type: LOADING_FALSE,
      });
    }
  };

export const listComplaintDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.get(getComplaintApi(id));

    dispatch({
      type: COMPLAINT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPLAINT_DETAILS_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};

export const updateComplaint = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.patch(getComplaintApi(id));

    dispatch({
      type: COMPLAINT_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch({
      type: COMPLAINT_UPDATE_FAIL,
      payload: errorHandler(error),
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }
};
