import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_CREATE_RESET,
} from '../constants/userConstants';

export const userCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CREATE_SUCCESS:
      return { user: action.payload };
    case USER_CREATE_FAIL:
      return { error: action.payload };
    case USER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_SUCCESS:
      return { users: action.payload };
    case USER_LIST_FAIL:
      return { error: action.payload };
    case USER_LIST_RESET:
      return {
        users: [],
      };
    default:
      return state;
  }
};
