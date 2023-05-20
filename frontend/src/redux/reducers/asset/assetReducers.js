import {
  ASSET_CREATE_FAIL,
  ASSET_CREATE_RESET,
  ASSET_CREATE_SUCCESS,
  ASSET_DETAILS_FAIL,
  ASSET_DETAILS_SUCCESS,
  ASSET_LIST_FAIL,
  ASSET_LIST_RESET,
  ASSET_LIST_SUCCESS,
} from '../../constants/asset/assetConstants';

export const assetCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSET_CREATE_SUCCESS:
      return { success: true, asset: action.payload };
    case ASSET_CREATE_FAIL:
      return { error: action.payload };
    case ASSET_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const assetListReducer = (state = { assets: [] }, action) => {
  switch (action.type) {
    case ASSET_LIST_SUCCESS:
      return {
        assets: action.payload,
      };
    case ASSET_LIST_FAIL:
      return { error: action.payload };
    case ASSET_LIST_RESET:
      return { assets: [] };
    default:
      return state;
  }
};

export const assetDetailsReducer = (state = { asset: {} }, action) => {
  switch (action.type) {
    case ASSET_DETAILS_SUCCESS:
      return { asset: action.payload };
    case ASSET_DETAILS_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
