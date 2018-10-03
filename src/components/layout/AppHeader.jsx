import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Icon, Menu, Badge } from 'antd';
import auth from '../../utils/auth';
import history from '../../routes/history';
import SwitchLocale from './SwitchLocale';
import AppLogout from './AppLogout';

const { Header } = Layout;
const { SubMenu } = Menu;

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.collapsed
    };
  }

  componentWillReceiveProps(nextProps) {
    this.onCollapse(nextProps.collapsed);
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  logout = () => {
    auth.removeAuthentication();
    history.push('/login');
  };

  render() {
    const { collapsed } = this.state;
    const { intl, toggle, username } = this.props;
    const { formatMessage } = intl;
    const userTitle = (
      <span>
        <Icon type="user" style={{ fontSize: 16, color: '#1DA57A' }} />
        {username}
      </span>
    );

    return (
      <Header style={{ background: '#fff', padding: 0 }} className="header">
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        />
        <span className="app-name">
          {formatMessage({ id: 'app.header.title' })}
        </span>
        <div style={{ float: 'right', marginRight: '16px' }}>
          <SwitchLocale />
        </div>

        <Menu mode="horizontal" style={{ lineHeight: '64px', float: 'right' }}>
          <Menu.Item key="schedule">
            <Link to="/app/todos">
              <Badge
                count={3}
                overflowCount={99}
                style={{ height: '15px', lineHeight: '15px' }}
              >
                <Icon type="bell" style={{ fontSize: 16, color: '#1DA57A' }} />
              </Badge>
            </Link>
          </Menu.Item>
          <SubMenu title={userTitle}>
            <Menu.Item
              key="logout"
              style={{ textAlign: 'center' }}
              className="logout"
            >
              <AppLogout />
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
    );
  }
}

AppHeader.propTypes = {
  intl: intlShape.isRequired,
  collapsed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};

export default injectIntl(AppHeader);
