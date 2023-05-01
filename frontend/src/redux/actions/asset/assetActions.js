import { createAssetApi } from '../../../api/assetApi/AssetApi';
import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';
import axiosConfig from '../../../utils/axiosConfig';
import { errorHandler } from '../../../utils/errorHandler';
import {
  ASSET_CREATE_FAIL,
  ASSET_CREATE_SUCCESS,
} from '../../constants/asset/assetConstants';

export const createAsset = (asset) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.post(createAssetApi, asset);

    dispatch({
      type: ASSET_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ASSET_CREATE_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};
