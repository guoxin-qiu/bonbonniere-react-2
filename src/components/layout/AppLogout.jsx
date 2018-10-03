import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { PropTypes } from 'prop-types';
import auth from '../../utils/auth';
import history from '../../routes/history';
import { actionCreators } from '../../store/Loginout';

class AppLogout extends React.Component {
  logout = () => {
    const { userLogout } = this.props;
    auth.removeAuthentication();
    userLogout();
    history.push('/login');
  };

  render() {
    const { intl } = this.props;
    const { formatMessage } = intl;
    return (
      <div onClick={this.logout} role="presentation">
        {formatMessage({ id: 'app.logout' })}
      </div>
    );
  }
}

AppLogout.propTypes = {
  intl: intlShape.isRequired,
  userLogout: PropTypes.func.isRequired
};

export default injectIntl(
  connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(AppLogout)
);
