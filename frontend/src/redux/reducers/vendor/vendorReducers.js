import {
  VENDOR_CREATE_FAIL,
  VENDOR_CREATE_RESET,
  VENDOR_CREATE_SUCCESS,
  VENDOR_DELETE_FAIL,
  VENDOR_DELETE_RESET,
  VENDOR_DELETE_SUCCESS,
  VENDOR_DETAILS_FAIL,
  VENDOR_DETAILS_SUCCESS,
  VENDOR_LIST_FAIL,
  VENDOR_LIST_RESET,
  VENDOR_LIST_SUCCESS,
  VENDOR_UPDATE_FAIL,
  VENDOR_UPDATE_RESET,
  VENDOR_UPDATE_SUCCESS,
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

export const vendorUpdateReducer = (state = { vendor: {} }, action) => {
  switch (action.type) {
    case VENDOR_UPDATE_SUCCESS:
      return { success: true, vendor: action.payload };
    case VENDOR_UPDATE_FAIL:
      return { error: action.payload };
    case VENDOR_UPDATE_RESET:
      return {
        vendor: {},
      };
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

export const vendorDetailsReducer = (state = { vendor: {} }, action) => {
  switch (action.type) {
    case VENDOR_DETAILS_SUCCESS:
      return { vendor: action.payload };
    case VENDOR_DETAILS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const vendorDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VENDOR_DELETE_SUCCESS:
      return { success: true };
    case VENDOR_DELETE_FAIL:
      return { error: action.payload };
    case VENDOR_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
