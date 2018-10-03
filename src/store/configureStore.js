import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import * as Counter from './Counter';
import * as Locale from './SwitchLocale';

export default function configureStore() {
  const reducers = {
    counter: Counter.reducer,
    locales: Locale.reducer
  };

  const middlewares = [];
  middlewares.push(thunk);
  middlewares.push(createLogger());

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (
    isDevelopment &&
    typeof window !== 'undefined' &&
    window.devToolsExtension
  ) {
    enhancers.push(window.devToolsExtension());
  }

  const appReducer = combineReducers({
    ...reducers
  });

  const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      state = undefined;
    }

    return appReducer(state, action);
  };
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  );
}
