import { LOADING_FALSE, LOADING_TRUE } from "../constants/loadingConstants";

export const loadingReducer = (state = {}, action) => {
  switch (action.type) {
    case LOADING_TRUE:
      return { loading: true };
    case LOADING_FALSE:
      return { loading: false };
    default:
      return state;
  }
};
