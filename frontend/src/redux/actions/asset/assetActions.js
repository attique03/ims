import {
  createAssetApi,
  getAllAssets,
  getAssetApi,
} from '../../../api/assetApi/AssetApi';
import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';
import axiosConfig from '../../../utils/axiosConfig';
import { errorHandler } from '../../../utils/errorHandler';
import {
  ASSET_CREATE_FAIL,
  ASSET_CREATE_SUCCESS,
  ASSET_DETAILS_FAIL,
  ASSET_DETAILS_REQUEST,
  ASSET_DETAILS_SUCCESS,
  ASSET_LIST_FAIL,
  ASSET_LIST_SUCCESS,
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

export const listAssets =
  (employeeId = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOADING_TRUE,
      });

      const { data } = await axiosConfig.get(getAllAssets(employeeId));

      dispatch({
        type: ASSET_LIST_SUCCESS,
        payload: data,
      });

      dispatch({
        type: LOADING_FALSE,
      });
    } catch (error) {
      dispatch({
        type: ASSET_LIST_FAIL,
        payload: errorHandler(error),
      });

      dispatch({
        type: LOADING_FALSE,
      });
    }
  };

export const listAssetDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_TRUE,
    });

    const { data } = await axiosConfig.get(getAssetApi(id));

    dispatch({
      type: ASSET_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ASSET_DETAILS_FAIL,
      payload: errorHandler(error),
    });
  }

  dispatch({
    type: LOADING_FALSE,
  });
};
