import React from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actionCreators } from '../store/Counter';

const Counter = props => {
  const {
    count,
    dataIndex,
    data,
    increment,
    decrement,
    getDataFromApi
  } = props;
  return (
    <div>
      <h1>Counter</h1>

      <p>This is a simple example of a React component.</p>

      <p>
        Current count:
        <strong>{count}</strong>
      </p>

      <button type="button" onClick={increment}>
        Increment
      </button>
      <button type="button" onClick={decrement}>
        decrement
      </button>
      <br />
      <br />
      <br />
      <button
        type="button"
        onClick={() => {
          getDataFromApi(count);
        }}
      >
        get data from api
      </button>

      <br />
      <br />
      <span>{`dataIndex: ${dataIndex}, data is ${data.data}`}</span>
    </div>
  );
};

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  getDataFromApi: PropTypes.func.isRequired,
  dataIndex: PropTypes.number.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number,
    data: PropTypes.string
  }).isRequired
};

export default connect(
  state => state.counter,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Counter);
