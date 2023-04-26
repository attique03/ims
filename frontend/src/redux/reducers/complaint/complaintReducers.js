import {
  COMPLAINT_LIST_FAIL,
  COMPLAINT_LIST_RESET,
  COMPLAINT_LIST_SUCCESS,
} from '../../constants/complaint/complaintConstants';

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
