import {
  VENDOR_LIST_FAIL,
  VENDOR_LIST_RESET,
  VENDOR_LIST_SUCCESS,
} from '../../constants/vendor/vendorConstants';

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
