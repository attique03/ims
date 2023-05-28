import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';
import axiosConfig from '../../../utils/axiosConfig';
import { errorHandler } from '../../../utils/errorHandler';
import {
  VENDOR_CREATE_FAIL,
  VENDOR_CREATE_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_SUCCESS,
} from '../../constants/vendor/vendorConstants';
import { getVendorApi } from '../../../api/vendorApi/VendorApi';
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

    console.log('Vendor', vendor);

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

export const listVendors = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.get(getVendorApi);

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
