import axios from 'axios';
import Qs from 'qs';
import history from '../routes/history';
import { AppConstant, URL } from '../constants';
import auth from './auth';

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.baseURL = AppConstant.API_URL;
axios.defaults.timeout = AppConstant.API_REQUEST_TIMEOUT;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  config => {
    if (auth.isAuthorized()) {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      config.headers.Authorization = auth.getToken();
      config.headers['access-token'] = Date.now();
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => {
    console.log(response.config.url, response);
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          auth.removeAuthentication();
          history.push({
            pathname: URL.LOGIN
          });
          break;
        case 403:
          history.push({
            pathname: URL.FORBIDDEN
          });
          break;
        default:
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          break;
      }
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
    return Promise.reject(error);
  }
);

const get = (url, params) =>
  new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });

const post = (url, params) =>
  new Promise((resolve, reject) => {
    axios
      .post(url, Qs.stringify(params))
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });

const put = (url, id, params) =>
  new Promise((resolve, reject) => {
    axios
      .put(`${url}/${id}`, Qs.stringify(params))
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });

const del = (url, id) =>
  new Promise((resolve, reject) => {
    axios
      .delete(`${url}/${id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });

export default {
  get,
  post,
  put,
  del
};
