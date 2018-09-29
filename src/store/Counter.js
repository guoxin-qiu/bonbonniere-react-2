const incrementCountType = 'INCREMENT_COUNT';
const decrementCountType = 'DECREMENT_COUNT';
const requestDataFromApiType = 'REQUEST_DATA_FROM_API';
const receiveDataFromApiType = 'RECEIVE_DATA_FROM_API';
const initialState = {
  count: 0,
  dataIndex: 0,
  data: {},
  isLoading: false
};

export const actionCreators = {
  increment: () => ({
    type: incrementCountType
  }),
  decrement: () => ({
    type: decrementCountType
  }),
  getDataFromApi: dataIndex => async (dispatch, getState) => {
    if (
      getState().count !== undefined &&
      dataIndex === getState().count.dataIndex
    ) {
      return;
    }

    dispatch({
      type: requestDataFromApiType,
      payload: {
        dataIndex
      }
    });

    const url = `http://localhost:3002/api/1/samples/${dataIndex}`;
    try {
      const response = await fetch(url);
      const result = await response.json();

      dispatch({
        type: receiveDataFromApiType,
        payload: {
          dataIndex,
          result
        }
      });
    } catch (error) {
      dispatch({
        type: receiveDataFromApiType,
        payload: {
          dataIndex,
          result: {}
        }
      });
    }
  }
};

export const reducer = (state, action) => {
  const newState = state || initialState;

  if (action.type === incrementCountType) {
    return {
      ...newState,
      count: newState.count + 1
    };
  }

  if (action.type === decrementCountType) {
    return {
      ...newState,
      count: newState.count - 1
    };
  }

  if (action.type === requestDataFromApiType) {
    return {
      ...newState,
      dataIndex: action.payload.dataIndex,
      isLoading: true
    };
  }

  if (action.type === receiveDataFromApiType) {
    return {
      ...newState,
      dataIndex: action.payload.dataIndex,
      data: action.payload.result,
      isLoading: false
    };
  }

  return newState;
};
