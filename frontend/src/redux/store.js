import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userCreateReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userResetPasswordReducer,
  userUpdateReducer,
} from './reducers/user/userReducers';
import { loadingReducer } from './reducers/loading/loadingReducers';
import { getLocalStorage } from '../utils/localStorage';
import {
  organizationCreateReducer,
  organizationDeleteReducer,
  organizationDetailsReducer,
  organizationListReducer,
  organizationUpdateReducer,
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
import {
  vendorCreateReducer,
  vendorDeleteReducer,
  vendorDetailsReducer,
  vendorListReducer,
  vendorUpdateReducer,
} from './reducers/vendor/vendorReducers';
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
  requestsCreateReducer,
  requestsDetailsReducer,
  requestsListReducer,
  requestsUpdateReducer,
} from './reducers/requests/requestsReducers';
import { departmentListReducer } from './reducers/department/departmentReducers';

const reducer = combineReducers({
  userCreate: userCreateReducer,
  userLogin: userLoginReducer,
  userResetPassword: userResetPasswordReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  passwordResetTokenCreate: passwordResetTokenCreateReducer,
  passwordResetTokenVerify: passwordResetTokenVerifyReducer,
  dashboardData: dashboardDataReducer,
  dashboardStats: dashboardStatsReducer,
  organizationCreate: organizationCreateReducer,
  organizationList: organizationListReducer,
  organizationDetails: organizationDetailsReducer,
  organizationUpdate: organizationUpdateReducer,
  organizationDelete: organizationDeleteReducer,
  complaintCreate: complaintCreateReducer,
  complaintList: complaintListReducer,
  complaintDetails: complaintDetailsReducer,
  complaintUpdate: complaintUpdateReducer,
  categoryCreate: categoryCreateReducer,
  categoryList: categoryListReducer,
  categoryDetailsList: categoryDetailsListReducer,
  categoryDetails: categoryDetailsReducer,
  subcategoryDetails: subcategoryDetailsReducer,
  vendorCreate: vendorCreateReducer,
  vendorList: vendorListReducer,
  vendorDetails: vendorDetailsReducer,
  vendorDelete: vendorDeleteReducer,
  assetCreate: assetCreateReducer,
  vendorUpdate: vendorUpdateReducer,
  assetList: assetListReducer,
  assetDetails: assetDetailsReducer,
  requestsCreate: requestsCreateReducer,
  requestsList: requestsListReducer,
  requestsDetails: requestsDetailsReducer,
  requestsUpdate: requestsUpdateReducer,
  departmentList: departmentListReducer,
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
