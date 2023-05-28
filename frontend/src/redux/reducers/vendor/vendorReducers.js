import {
  VENDOR_CREATE_FAIL,
  VENDOR_CREATE_RESET,
  VENDOR_CREATE_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_RESET,
  VENDOR_LIST_SUCCESS,
} from '../../constants/vendor/vendorConstants';

export const vendorCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VENDOR_CREATE_SUCCESS:
      return { success: true, vendor: action.payload };
    case VENDOR_CREATE_FAIL:
      return { error: action.payload };
    case VENDOR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const vendorListReducer = (state = { vendors: [] }, action) => {
  switch (action.type) {
    case VENDOR_LIST_SUCCESS:
      return {
        vendors: action.payload,
      };
    case VENDOR_LIST_FAIL:
      return { error: action.payload };
    case VENDOR_LIST_RESET:
      return { vendors: [] };
    default:
      return state;
  }
};
