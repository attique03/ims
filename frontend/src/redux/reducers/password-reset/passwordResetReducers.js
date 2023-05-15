import {
  PASSWORD_RESET_TOKEN_CREATE_FAIL,
  PASSWORD_RESET_TOKEN_CREATE_RESET,
  PASSWORD_RESET_TOKEN_CREATE_SUCCESS,
} from '../../constants/password-reset/passwordResetConstants';

export const passwordResetTokenCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PASSWORD_RESET_TOKEN_CREATE_SUCCESS:
      return { success: true, passwordResetToken: action.payload };
    case PASSWORD_RESET_TOKEN_CREATE_FAIL:
      return { error: action.payload };
    case PASSWORD_RESET_TOKEN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
