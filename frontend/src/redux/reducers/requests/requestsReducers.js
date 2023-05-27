import {
  REQUESTS_CREATE_FAIL,
  REQUESTS_CREATE_RESET,
  REQUESTS_CREATE_SUCCESS,
  REQUESTS_DETAILS_FAIL,
  REQUESTS_DETAILS_SUCCESS,
  REQUESTS_LIST_FAIL,
  REQUESTS_LIST_RESET,
  REQUESTS_LIST_SUCCESS,
  REQUESTS_UPDATE_FAIL,
  REQUESTS_UPDATE_RESET,
  REQUESTS_UPDATE_SUCCESS,
} from '../../constants/requests/requestsConstants';

export const requestsCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUESTS_CREATE_SUCCESS:
      return { success: true, requests: action.payload };
    case REQUESTS_CREATE_FAIL:
      return { error: action.payload };
    case REQUESTS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const requestsListReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case REQUESTS_LIST_SUCCESS:
      return {
        requests: action.payload,
      };
    case REQUESTS_LIST_FAIL:
      return { error: action.payload };
    case REQUESTS_LIST_RESET:
      return { requests: [] };
    default:
      return state;
  }
};

export const requestsDetailsReducer = (state = { requests: {} }, action) => {
  switch (action.type) {
    case REQUESTS_DETAILS_SUCCESS:
      return { requests: action.payload };
    case REQUESTS_DETAILS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};

export const requestsUpdateReducer = (state = { requests: {} }, action) => {
  switch (action.type) {
    case REQUESTS_UPDATE_SUCCESS:
      return { success: true, requests: action.payload };
    case REQUESTS_UPDATE_FAIL:
      return { error: action.payload };
    case REQUESTS_UPDATE_RESET:
      return {
        requests: {},
      };
    default:
      return state;
  }
};
