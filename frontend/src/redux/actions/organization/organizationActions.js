import {
  createOrganizationApi,
  getOrganizationApi,
} from '../../../api/organizationApi/OrganizationApi';
import axiosConfig from '../../../utils/axiosConfig';
import { errorHandler } from '../../../utils/errorHandler';
import { LOADING_FALSE, LOADING_TRUE } from '../../constants/loading/loadingConstants';
import {
  ORGANIZATION_CREATE_FAIL,
  ORGANIZATION_CREATE_SUCCESS,
  ORGANIZATION_LIST_FAIL,
  ORGANIZATION_LIST_SUCCESS,
  ORGANIZATION_DETAILS_SUCCESS,
  ORGANIZATION_DETAILS_FAIL,
} from '../../constants//organization/organizationConstants';

export const createOrganization = (organization) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.post(
      createOrganizationApi,
      organization,
    );

    dispatch({
      type: ORGANIZATION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORGANIZATION_CREATE_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};

export const listOrganizations = () => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.get(createOrganizationApi);

    dispatch({
      type: ORGANIZATION_LIST_SUCCESS,
      payload: data,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch({
      type: ORGANIZATION_LIST_FAIL,
      payload: errorHandler(error),
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }
};

export const listOrganizationDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.get(getOrganizationApi(id));

    dispatch({
      type: ORGANIZATION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORGANIZATION_DETAILS_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};
