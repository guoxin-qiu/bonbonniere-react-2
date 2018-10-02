import React from 'react';
import RouterProps from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
// import { generateGetTokenUrl } from '../utils/wechat-helper';

import { actionCreators } from '../store/Login';

import fakeAuth from '../utils/fakeAuth';

class Login extends React.Component {
  static propTypes = {
    location: RouterProps.location.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
    const { location } = this.props;
    this.queryParsed = queryString.parse(location.search);
  }

  componentDidMount() {
    // const url = generateGetTokenUrl(this.queryParsed.code);
    // fetch(url, {
    //   method: 'GET',
    //   headers: new Headers({
    //     'Content-Type': 'application/json; charset=utf-8',
    //     Accept: 'application/json'
    //   })
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({ openid: res.openid });
    //   });
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { redirectToReferrer } = this.state;
    const { location } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <h1>LOGIN</h1>
        <br />
        <span>{this.queryParsed.code}</span>
        <br />
        <p>{`You must log in to view the page at ${from.pathname}`}</p>
        <button type="button" onClick={this.login}>
          Log in
        </button>
      </div>
    );
  }
}

export default connect(dispatch =>
  bindActionCreators(actionCreators, dispatch)
)(Login);
