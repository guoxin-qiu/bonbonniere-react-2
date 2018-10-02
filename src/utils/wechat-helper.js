import URI from 'urijs';
import confidential from '../config/confidential';

// const AUTHORIZE_URL = 'https://open.weixin.qq.com/connect/oauth2/authorize';
// const ACCESS_TOKEN_URL = 'https://api.weixin.qq.com/sns/oauth2/access_token';

const AUTHORIZE_URL = 'http://localhost:3002/api/1/wechat/auth';
const ACCESS_TOKEN_URL = 'http://localhost:3002/api/1/wechat/token';

export const generateGetCodeUrl = redirectURL =>
  new URI(AUTHORIZE_URL)
    .addQuery('appid', confidential.APP_ID)
    .addQuery('redirect_uri', encodeURI(redirectURL))
    .addQuery('response_type', 'code')
    .addQuery('scope', 'snsapi_userinfo')
    .addQuery('state', 'login')
    .hash('wechat_redirect')
    .toString();

export const generateGetTokenUrl = code =>
  new URI(ACCESS_TOKEN_URL)
    .addQuery('appid', confidential.APP_ID)
    .addQuery('secret', confidential.APP_SECRET)
    .addQuery('code', code)
    .addQuery('grant_type', 'authorization_code')
    .toString();
