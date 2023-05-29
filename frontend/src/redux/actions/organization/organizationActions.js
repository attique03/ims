import {
  createOrganizationApi,
  getOrganizationApi,
} from '../../../api/organizationApi/OrganizationApi';
import axiosConfig from '../../../utils/axiosConfig';
import { errorHandler } from '../../../utils/errorHandler';
import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';
import {
  ORGANIZATION_CREATE_FAIL,
  ORGANIZATION_CREATE_SUCCESS,
  ORGANIZATION_LIST_FAIL,
  ORGANIZATION_LIST_SUCCESS,
  ORGANIZATION_DETAILS_SUCCESS,
  ORGANIZATION_DETAILS_FAIL,
  ORGANIZATION_UPDATE_SUCCESS,
  ORGANIZATION_UPDATE_FAIL,
  ORGANIZATION_DELETE_SUCCESS,
  ORGANIZATION_DELETE_FAIL,
} from '../../constants//organization/organizationConstants';
import axios from 'axios';

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

export const updateOrganization =
  (id, organization) => async (dispatch, getState) => {
    try {
      dispatch({
        type: LOADING_TRUE,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      console.log('Org in Actions  ', organization);

      const { data } = await axios.put(
        `http://127.0.0.1:4000${getOrganizationApi(id)}`,
        organization,
        config,
      );

      dispatch({
        type: ORGANIZATION_UPDATE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: LOADING_FALSE,
      });
    } catch (error) {
      dispatch({
        type: ORGANIZATION_UPDATE_FAIL,
        payload: errorHandler(error),
      });

      dispatch({
        type: LOADING_FALSE,
      });
    }
  };

// Delete Product from Admin Side
export const deleteOrganization = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `http://127.0.0.1:4000${getOrganizationApi(id)}`,
      config,
    );

    dispatch({
      type: ORGANIZATION_DELETE_SUCCESS,
    });

    dispatch({
      type: LOADING_FALSE,
    });
  } catch (error) {
    dispatch({
      type: ORGANIZATION_DELETE_FAIL,
      payload: errorHandler(error),
    });

    dispatch({
      type: LOADING_FALSE,
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};
