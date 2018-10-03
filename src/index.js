import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import ConnectedIntlProvider from './store/ConnectedIntlProvider';

import BaseRouter from './routes';
import './index.less';

const store = configureStore();
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider>
      <BaseRouter />
    </ConnectedIntlProvider>
  </Provider>,
  rootElement);
