import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userCreateReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
} from './reducers/user/userReducers';
import { loadingReducer } from './reducers/loading/loadingReducers';
import { getLocalStorage } from '../utils/localStorage';
import {
  organizationCreateReducer,
  organizationDetailsReducer,
  organizationListReducer,
} from './reducers/organization/organizationReducers';
import { complaintListReducer } from './reducers/complaint/complaintReducers';

const reducer = combineReducers({
  userCreate: userCreateReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  organizationCreate: organizationCreateReducer,
  organizationList: organizationListReducer,
  organizationDetails: organizationDetailsReducer,
  complaintList: complaintListReducer,
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
