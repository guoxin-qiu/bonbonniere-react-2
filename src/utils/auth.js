import { AppConstant } from '../constants';

const storage = window.sessionStorage;

const setAuthentication = (username, token) => {
  if (!token) {
    throw new Error('Token can not be null.');
  }

  storage.setItem(
    AppConstant.USER_INFO_STORAGE_KEY,
    JSON.stringify({
      username,
      token
    })
  );
};

const removeAuthentication = () => {
  storage.removeItem(AppConstant.USER_INFO_STORAGE_KEY);
};

const retrieveAuthentication = () => {
  try {
    const authInfo = storage.getItem(AppConstant.USER_INFO_STORAGE_KEY);
    if (authInfo) {
      return JSON.parse(authInfo);
    }
    return {
      token: '',
      username: ''
    };
  } catch (ex) {
    throw new Error(ex);
  }
};

const isAuthorized = () => retrieveAuthentication().token.length > 0;

const getToken = () => retrieveAuthentication().token;

const getUsername = () => retrieveAuthentication().username;

export default {
  setAuthentication,
  removeAuthentication,
  isAuthorized,
  getToken,
  getUsername
};
