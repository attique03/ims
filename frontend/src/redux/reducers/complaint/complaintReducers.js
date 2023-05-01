import {
  COMPLAINT_CREATE_FAIL,
  COMPLAINT_CREATE_RESET,
  COMPLAINT_CREATE_SUCCESS,
  COMPLAINT_DETAILS_FAIL,
  COMPLAINT_DETAILS_SUCCESS,
  COMPLAINT_LIST_FAIL,
  COMPLAINT_LIST_RESET,
  COMPLAINT_LIST_SUCCESS,
  COMPLAINT_UPDATE_FAIL,
  COMPLAINT_UPDATE_RESET,
  COMPLAINT_UPDATE_SUCCESS,
} from '../../constants/complaint/complaintConstants';

export const complaintCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPLAINT_CREATE_SUCCESS:
      return { success: true, complaint: action.payload };
    case COMPLAINT_CREATE_FAIL:
      return { error: action.payload };
    case COMPLAINT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const complaintListReducer = (state = { complaints: [] }, action) => {
  switch (action.type) {
    case COMPLAINT_LIST_SUCCESS:
      return {
        complaints: action.payload,
      };
    case COMPLAINT_LIST_FAIL:
      return { error: action.payload };
    case COMPLAINT_LIST_RESET:
      return { complaints: [] };
    default:
      return state;
  }
};

export const complaintDetailsReducer = (state = { complaint: {} }, action) => {
  switch (action.type) {
    case COMPLAINT_DETAILS_SUCCESS:
      return { complaint: action.payload };
    case COMPLAINT_DETAILS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const complaintUpdateReducer = (state = { complaint: {} }, action) => {
  switch (action.type) {
    case COMPLAINT_UPDATE_SUCCESS:
      return { success: true, complaint: action.payload };
    case COMPLAINT_UPDATE_FAIL:
      return { error: action.payload };
    case COMPLAINT_UPDATE_RESET:
      return {
        complaint: {},
      };
    default:
      return state;
  }
};
