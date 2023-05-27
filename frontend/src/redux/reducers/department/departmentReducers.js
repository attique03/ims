import {
  DEPARTMENT_LIST_FAIL,
  DEPARTMENT_LIST_RESET,
  DEPARTMENT_LIST_SUCCESS,
} from '../../constants/department/departmentConstants';

export const departmentListReducer = (state = { departments: [] }, action) => {
  switch (action.type) {
    case DEPARTMENT_LIST_SUCCESS:
      return {
        departments: action.payload,
      };
    case DEPARTMENT_LIST_FAIL:
      return { error: action.payload };
    case DEPARTMENT_LIST_RESET:
      return { departments: [] };
    default:
      return state;
  }
};
