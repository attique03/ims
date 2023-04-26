import {
  LOADING_FALSE,
  LOADING_TRUE,
} from '../../constants/loading/loadingConstants';
import axiosConfig from '../../../utils/axiosConfig';
import { errorHandler } from '../../../utils/errorHandler';
import { COMPLAINT_LIST_SUCCESS } from '../../constants/complaint/complaintConstants';
import { ORGANIZATION_LIST_FAIL } from '../../constants/organization/organizationConstants';
import { getComplaintsApi } from '../../../api/complaintApi/ComplaintApi';

export const listComplaints =
  (employees = '') =>
  async (dispatch) => {
    try {
      dispatch({
        type: LOADING_TRUE,
      });

      const { data } = await axiosConfig.get(getComplaintsApi(employees));

      dispatch({
        type: COMPLAINT_LIST_SUCCESS,
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
