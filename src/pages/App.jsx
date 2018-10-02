import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import RouterProps from 'react-router-prop-types';
import { Layout } from 'antd';
import { AppConstant, URL } from '../constants';
import auth from '../utils/auth';
import AppSider from '../components/layout/AppSider';
import AppHeader from '../components/layout/AppHeader';
import NotFound from '../components/common/404';
import '../styles/app.less';
import Home from './Home';
import Counter from './Counter';

const { Content } = Layout;

class App extends React.Component {
  state = {
    collapsed:
      localStorage.getItem(AppConstant.SIDER_COLLAPSED_STORAGE_KEY) === 'true'
  };

  componentDidMount() {
    if (
      localStorage.getItem(AppConstant.SIDER_COLLAPSED_STORAGE_KEY) === null
    ) {
      localStorage.setItem(AppConstant.SIDER_COLLAPSED_STORAGE_KEY, false);
    }
  }

  toggle = () => {
    const { collapsed } = this.state;
    const newCollapsed = !collapsed;
    this.setState(
      {
        collapsed: newCollapsed
      },
      () => {
        localStorage.setItem(
          AppConstant.SIDER_COLLAPSED_STORAGE_KEY,
          newCollapsed
        );
      }
    );
  };

  render() {
    const { collapsed } = this.state;
    const { location } = this.props;

    if (!auth.isAuthorized()) {
      return <Redirect to={URL.LOGIN} />;
    }
    const name =
      location.state === undefined
        ? auth.getUsername()
        : location.state.username;

    return (
      <Layout className="ant-layout-has-sider" style={{ height: '100%' }}>
        <AppSider collapsed={collapsed} path={location.pathname} />
        <Layout>
          <AppHeader
            collapsed={collapsed}
            toggle={this.toggle}
            username={name}
          />
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route exact path={URL.APP} component={Home} />
              <Route path={URL.TRAVEL_COUNTER} component={Counter} />
              <Route component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

App.propTypes = {
  location: RouterProps.location.isRequired
};

export default App;
