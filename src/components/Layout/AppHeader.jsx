import React from 'react';
import { Layout, Icon } from 'antd';
import Logo from '../../constants/images/logo.jpg';

const { Header } = Layout;

const AppHeader = () => (
  <Header>
    <div className="top-banner">
      <div id="logo">
        <a style={{ float: 'left' }} href="/">
          <img src={Logo} alt="" style={{ width: '226px' }} />
        </a>
        <span className="app-name">会议助手管理后台</span>
        <div className="welcome">
          <Icon type="user" />
          &nbsp;&nbsp;欢迎:&nbsp;&nbsp;denis&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>
    </div>
  </Header>
);

export default AppHeader;
