import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userCreateReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userResetPasswordReducer,
} from './reducers/user/userReducers';
import { loadingReducer } from './reducers/loading/loadingReducers';
import { getLocalStorage } from '../utils/localStorage';
import {
  organizationCreateReducer,
  organizationDetailsReducer,
  organizationListReducer,
} from './reducers/organization/organizationReducers';
import {
  complaintCreateReducer,
  complaintDetailsReducer,
  complaintListReducer,
  complaintUpdateReducer,
} from './reducers/complaint/complaintReducers';
import {
  categoryCreateReducer,
  categoryDetailsListReducer,
  categoryDetailsReducer,
  categoryListReducer,
} from './reducers/category/categoryReducers';
import { vendorListReducer } from './reducers/vendor/vendorReducers';
import {
  assetCreateReducer,
  assetDetailsReducer,
  assetListReducer,
} from './reducers/asset/assetReducers';
import { subcategoryDetailsReducer } from './reducers/subcategory/subcategoryReducers';
import {
  dashboardDataReducer,
  dashboardStatsReducer,
} from './reducers/dashboard/dashboardReducers';
import {
  passwordResetTokenCreateReducer,
  passwordResetTokenVerifyReducer,
} from './reducers/password-reset/passwordResetReducers';
import {
  requestsDetailsReducer,
  requestsListReducer,
  requestsUpdateReducer,
} from './reducers/requests/requestsReducers';

const reducer = combineReducers({
  userCreate: userCreateReducer,
  userLogin: userLoginReducer,
  userResetPassword: userResetPasswordReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  passwordResetTokenCreate: passwordResetTokenCreateReducer,
  passwordResetTokenVerify: passwordResetTokenVerifyReducer,
  dashboardData: dashboardDataReducer,
  dashboardStats: dashboardStatsReducer,
  organizationCreate: organizationCreateReducer,
  organizationList: organizationListReducer,
  organizationDetails: organizationDetailsReducer,
  complaintCreate: complaintCreateReducer,
  complaintList: complaintListReducer,
  complaintDetails: complaintDetailsReducer,
  complaintUpdate: complaintUpdateReducer,
  categoryCreate: categoryCreateReducer,
  categoryList: categoryListReducer,
  categoryDetailsList: categoryDetailsListReducer,
  categoryDetails: categoryDetailsReducer,
  subcategoryDetails: subcategoryDetailsReducer,
  vendorList: vendorListReducer,
  assetCreate: assetCreateReducer,
  assetList: assetListReducer,
  assetDetails: assetDetailsReducer,
  requestsList: requestsListReducer,
  requestsDetails: requestsDetailsReducer,
  requestsUpdate: requestsUpdateReducer,
  loading: loadingReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// const userInfoFromStorage = getLocalStorage('userInfo')
//   ? JSON.parse(getLocalStorage('userInfo'))
//   : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
