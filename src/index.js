import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import BaseRouter from './routes';

import './index.css';

const store = configureStore();
const rootElement = document.getElementById('root');

ReactDOM.render(<Provider store={store}><BaseRouter/></Provider>, rootElement);
