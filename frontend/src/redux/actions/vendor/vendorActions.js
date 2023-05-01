import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';
import axiosConfig from '../../../utils/axiosConfig';
import { errorHandler } from '../../../utils/errorHandler';
import {
  VENDOR_LIST_FAIL,
  VENDOR_LIST_SUCCESS,
} from '../../constants/vendor/vendorConstants';
import { getVendorApi } from '../../../api/vendorApi/VendorApi';

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
