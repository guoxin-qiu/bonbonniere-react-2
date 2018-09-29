import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import * as Counter from './Counter';

export default function configureStore() {
  const reducers = {
    counter: Counter.reducer
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

  const rootReducer = combineReducers({
    ...reducers
  });

  return createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  );
}
