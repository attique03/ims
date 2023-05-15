import { createPasswordResetTokenApi } from '../../../api/passwordResetTokenApi/passwordResetTokenApi';
import axiosConfig from '../../../utils/axiosConfig';
import { errorHandler } from '../../../utils/errorHandler';
import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';
import {
  PASSWORD_RESET_TOKEN_CREATE_FAIL,
  PASSWORD_RESET_TOKEN_CREATE_SUCCESS,
} from '../../constants/password-reset/passwordResetConstants';

export const createPasswordResetToken = (email) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.post(
      createPasswordResetTokenApi(email),
      { email },
    );

    dispatch({
      type: PASSWORD_RESET_TOKEN_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PASSWORD_RESET_TOKEN_CREATE_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};
