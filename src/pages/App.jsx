import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import RouterProps from 'react-router-prop-types';
import { Layout } from 'antd';
import * as AppConstant from '../constants/appConstant';
import AppSider from '../components/layout/AppSider';
import AppHeader from '../components/layout/AppHeader';
import NotFound from '../components/common/404';
import '../styles/app.css';
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

    if (localStorage.getItem(AppConstant.USER_INFO_STORAGE_KEY) === null) {
      return <Redirect to="/login" />;
    }
    const name =
      location.state === undefined
        ? JSON.parse(localStorage.getItem(AppConstant.USER_INFO_STORAGE_KEY))
            .username
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
              <Route exact path="/app" component={Home} />
              <Route path="/app/travel/counter" component={Counter} />
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
