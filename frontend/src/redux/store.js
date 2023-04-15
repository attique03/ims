import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userCreateReducer,
  userListReducer,
  userLoginReducer,
} from './reducers/userReducers';
import { loadingReducer } from './reducers/loadingReducers';
import { getLocalStorage } from '../utils/localStorage';
import {
  organizationCreateReducer,
  organizationDetailsReducer,
  organizationListReducer,
} from './reducers/organizationReducers';

const reducer = combineReducers({
  userCreate: userCreateReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
  loading: loadingReducer,
  organizationCreate: organizationCreateReducer,
  organizationList: organizationListReducer,
  organizationDetails: organizationDetailsReducer,
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
