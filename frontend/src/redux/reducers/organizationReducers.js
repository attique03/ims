import {
  ORGANIZATION_CREATE_FAIL,
  ORGANIZATION_CREATE_RESET,
  ORGANIZATION_CREATE_SUCCESS,
  ORGANIZATION_DETAILS_FAIL,
  ORGANIZATION_DETAILS_SUCCESS,
  ORGANIZATION_LIST_FAIL,
  ORGANIZATION_LIST_RESET,
  ORGANIZATION_LIST_SUCCESS,
} from '../constants/organizationConstants';

export const organizationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORGANIZATION_CREATE_SUCCESS:
      return { success: true, event: action.payload };
    case ORGANIZATION_CREATE_FAIL:
      return { error: action.payload };
    case ORGANIZATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const organizationListReducer = (
  state = { organizations: [] },
  action,
) => {
  switch (action.type) {
    case ORGANIZATION_LIST_SUCCESS:
      return {
        organizations: action.payload,
      };
    case ORGANIZATION_LIST_FAIL:
      return { error: action.payload };
    case ORGANIZATION_LIST_RESET:
      return { organizations: [] };
    default:
      return state;
  }
};

export const organizationDetailsReducer = (
  state = { organization: {} },
  action,
) => {
  switch (action.type) {
    case ORGANIZATION_DETAILS_SUCCESS:
      return { organization: action.payload };
    case ORGANIZATION_DETAILS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
