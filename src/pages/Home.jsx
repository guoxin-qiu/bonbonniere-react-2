import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import { URL } from '../constants';

const Home = props => {
  const { intl } = props;
  const { formatMessage } = intl;
  const IntlTextWelcome = formatMessage({ id: 'home.welcome' });
  return (
    <div>
      <span>{IntlTextWelcome}</span>
      <button
        type="button"
        onClick={() => {
          alert(`${IntlTextWelcome}`);
        }}
      >
        Alert Test
      </button>
      <br />
      <br />
      <Link to={URL.TRAVEL_COUNTER}>Go to Counter</Link>
    </div>
  );
};

Home.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Home);
