import React from 'react';
import { PropTypes } from 'prop-types';
import { Layout } from 'antd';

import AppHeader from './AppHeader';
import AppMenu from './AppMenu';

import 'antd/dist/antd.css';
import './antd-cover.css';
import './layout.css';

const { Content } = Layout;
const AppLayout = props => {
  const { children } = props;
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppMenu />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default AppLayout;
