import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';
import axiosConfig from '../../../utils/axiosConfig';
import { errorHandler } from '../../../utils/errorHandler';
import {
  VENDOR_CREATE_FAIL,
  VENDOR_CREATE_SUCCESS,
  VENDOR_DELETE_FAIL,
  VENDOR_DELETE_SUCCESS,
  VENDOR_DETAILS_FAIL,
  VENDOR_DETAILS_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_SUCCESS,
  VENDOR_UPDATE_FAIL,
  VENDOR_UPDATE_SUCCESS,
} from '../../constants/vendor/vendorConstants';
import { getVendorApi, getVendorById } from '../../../api/vendorApi/VendorApi';
import axios from 'axios';

export const createVendor = (vendor) => async (dispatch, getState) => {
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
      `http://127.0.0.1:4000${getVendorApi}`,
      vendor,
      config,
    );

    // const { data } = await axiosConfig.post(getVendorApi, vendor);

    dispatch({
      type: VENDOR_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VENDOR_CREATE_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};

export const updateVendor = (id, vendor) => async (dispatch, getState) => {
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

    console.log('Vendor ', vendor);

    // passing second Argument an Empty Object, as we are not passing data here
    const { data } = await axios.put(
      `http://127.0.0.1:4000${getVendorById(id)}`,
      vendor,
      config,
    );

    dispatch({
      type: VENDOR_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch({
      type: VENDOR_UPDATE_FAIL,
      payload: errorHandler(error),
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const listVendors = () => async (dispatch, getState) => {
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
      `http://127.0.0.1:4000${getVendorApi}`,
      config,
    );

    // const { data } = await axiosConfig.get(getVendorApi);

    dispatch({
      type: VENDOR_LIST_SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch({
      type: VENDOR_LIST_FAIL,
      payload: errorHandler(error),
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const getVendorDetails = (id) => async (dispatch, getState) => {
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
      `http://127.0.0.1:4000${getVendorById(id)}`,
      config,
    );

    // const { data } = await axiosConfig.get(getVendorById(id));

    dispatch({
      type: VENDOR_DETAILS_SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch({
      type: VENDOR_DETAILS_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};

// Delete Product from Admin Side
export const deleteVendor = (id) => async (dispatch, getState) => {
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
      `http://127.0.0.1:4000${getVendorById(id)}`,
      config,
    );

    dispatch({
      type: VENDOR_DELETE_SUCCESS,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch({
      type: VENDOR_DELETE_FAIL,
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
