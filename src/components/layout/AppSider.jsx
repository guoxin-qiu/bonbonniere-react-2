import React from 'react';
import { PropTypes } from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

class AppSider extends React.Component {
  constructor(props) {
    super(props);
    const { collapsed } = props;
    this.state = {
      collapsed,
      firstHide: true,
      selectedKey: '',
      openKey: ''
    };

    this.menus = [
      {
        key: '/app',
        title: '首页',
        iconType: 'home',
        url: '/app'
      },
      {
        key: '/app/meeting',
        title: '办会信息管理',
        iconType: 'schedule',
        children: [
          {
            key: '/app/meeting/baseinfo',
            title: '会议基本信息',
            url: '/app/meeting/baseinfo'
          },
          {
            key: '/app/meeting/travel',
            title: '会议行程信息',
            url: '/app/meeting/travel'
          }
        ]
      },
      {
        key: '/app/czs',
        title: '承知书管理',
        iconType: 'paper-clip',
        children: [
          {
            key: '/app/czs/baseinfo',
            title: '会议承知书',
            url: '/app/czs/baseinfo'
          },
          {
            key: '/app/czs/confirminfo',
            title: '承知书确认信息',
            url: '/app/czs/confirminfo'
          }
        ]
      },
      {
        key: '/app/passport',
        title: '签证管理',
        iconType: 'solution',
        children: [
          {
            key: '/app/passport/collect',
            title: '签证信息收集',
            url: '/app/passport/collect'
          },
          {
            key: '/app/passport/apply',
            title: '签证报名',
            url: '/app/passport/apply'
          }
        ]
      },
      {
        key: '/app/travel',
        title: '旅游线路管理',
        iconType: 'car',
        children: [
          {
            key: '/app/travel/line',
            title: '旅游线路管理',
            url: '/app/travel/line'
          },
          {
            key: '/app/travel/counter',
            title: 'TEST',
            url: '/app/travel/counter'
          }
        ]
      }
    ];
  }

  componentDidMount() {
    this.setMenuOpen(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onCollapse(nextProps.collapsed);
    this.setMenuOpen(nextProps);
  }

  onCollapse = collapsed => {
    this.setState({
      collapsed,
      firstHide: collapsed
    });
  };

  setMenuOpen = props => {
    const { path } = props;
    this.setState({
      openKey: path.substr(0, path.lastIndexOf('/')),
      selectedKey: path
    });
  };

  menuClick = e => {
    this.setState({
      selectedKey: e.key
    });
  };

  openMenu = openKeys => {
    this.setState({
      openKey: openKeys[openKeys.length - 1],
      firstHide: false
    });
  };

  render() {
    const { collapsed, firstHide, openKey, selectedKey } = this.state;
    return (
      <Sider trigger={null} collapsed={collapsed}>
        <div
          className="logo"
          style={
            collapsed ? { backgroundSize: '100%' } : { backgroundSize: '60%' }
          }
        />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={this.menuClick}
          onOpenChange={this.openMenu}
          openKeys={firstHide ? null : [openKey]}
        >
          {this.menus.map(fmenu => {
            const submenuTitle = (
              <span>
                <Icon type={fmenu.iconType} />
                <span>{fmenu.title}</span>
              </span>
            );
            return fmenu.children && fmenu.children.length > 0 ? (
              <SubMenu key={fmenu.key} title={submenuTitle}>
                {fmenu.children.map(smenu => (
                  <Menu.Item key={smenu.key}>
                    <Link to={smenu.url}>
                      <span>{smenu.title}</span>
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={fmenu.key}>
                <Link to={fmenu.url}>
                  <Icon type={fmenu.iconType} />
                  <span>{fmenu.title}</span>
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
    );
  }
}

AppSider.propTypes = {
  collapsed: PropTypes.bool.isRequired
};

export default AppSider;
