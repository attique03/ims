import axios from 'axios';
import { getLocalStorage } from './localStorage';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:4000',
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

// const userInfoFromStorage = getLocalStorage('userInfo')
//   ? JSON.parse(getLocalStorage('userInfo'))
//   : null;

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

if (userInfoFromStorage) {
  instance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${userInfoFromStorage.token}`;
}
instance.defaults.headers.post['Content-Type'] = 'application/json';
// instance.defaults.headers.post['Content-Type'] = 'images/jpeg';

export default instance;
