const userLogoutType = 'USER_LOGOUT';

export const actionCreators = {
  userLogout: () => async dispatch => {
    dispatch({
      type: userLogoutType
    });
  }
};

export const reducer = state => state;
