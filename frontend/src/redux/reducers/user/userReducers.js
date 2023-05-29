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
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_RESET,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
  USER_DETAILS_RESET,
} from '../../constants/user/userConstants';

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

export const userResetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_SUCCESS:
      return { user: action.payload, success: true };
    case USER_RESET_PASSWORD_FAIL:
      return { error: action.payload };
    case USER_RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { userInfo: action.payload, success: true };
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

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_SUCCESS:
      return { user: action.payload };
    case USER_DETAILS_FAIL:
      return { error: action.payload };
    case USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_SUCCESS:
      return { success: true, user: action.payload };
    case USER_UPDATE_FAIL:
      return { error: action.payload };
    case USER_UPDATE_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_SUCCESS:
      return { success: true };
    case USER_DELETE_FAIL:
      return { error: action.payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
