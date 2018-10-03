import { AppConstant } from '../constants';

const changeLocaleType = 'CHANGE_LOCALE';

const initialState = {
  locale: AppConstant.DEFAULT_LOCALE
};

export const actionCreators = {
  changeLocale: locale => async dispatch => {
    dispatch({
      type: changeLocaleType,
      payload: {
        locale
      }
    });
  }
};

export const reducer = (state, action) => {
  const newState = state || initialState;
  if (action.type === changeLocaleType) {
    return {
      ...newState,
      locale: action.payload.locale
    };
  }

  return newState;
};
