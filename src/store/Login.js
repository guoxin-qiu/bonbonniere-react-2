import { generateGetTokenUrl } from '../utils/wechat-helper';

const getWechatAuthType = 'GET_WECHAT_AUTH_TYPE';

export const actionCreators = {
  getWechatAuthType: code => async dispatch => {
    const url = generateGetTokenUrl(code);
    try {
      const response = await fetch(url);
      const result = await response.json();

      dispatch({
        type: getWechatAuthType,
        payload: {
          code,
          result
        }
      });
    } catch (error) {
      dispatch({
        type: getWechatAuthType,
        payload: {
          code,
          result: {}
        }
      });
    }
  }
};

export const reducer = state => state;
