import {
  ASSET_CREATE_FAIL,
  ASSET_CREATE_RESET,
  ASSET_CREATE_SUCCESS,
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
