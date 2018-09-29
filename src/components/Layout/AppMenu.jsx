import React from 'react';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

class AppMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: 'dark',
      current: 'p1c1',
      menus: [
        {
          key: 'p1',
          title: '首页',
          children: [{ key: 'p1c1', title: '首页' }]
        },
        {
          key: 'p2',
          title: '办会信息管理',
          children: [
            { key: 'p2c1', title: '会议基本信息' },
            { key: 'p2c2', title: '会议行程信息' }
          ]
        },
        {
          key: 'p3',
          title: '承知书管理',
          children: [
            { key: 'p3c1', title: '会议承知书' },
            { key: 'p3c2', title: '承知书确认信息' }
          ]
        },
        {
          key: 'p4',
          title: '签证管理',
          children: [
            { key: 'p4c1', title: '签证信息收集' },
            { key: 'p4c2', title: '签证报名' }
          ]
        },
        {
          key: 'p5',
          title: '旅游线路管理',
          children: [{ key: 'p5c1', title: '旅游线路管理' }]
        }
      ]
    };
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  };

  render() {
    const { theme, current, menus } = this.state;
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          theme={theme}
          onClick={this.handleClick}
          style={{ background: '#007AC2' }}
          defaultOpenKeys={['p1']}
          selectedKeys={[current]}
          mode="inline"
        >
          {menus.map(fmenu => (
            <SubMenu key={fmenu.key} title={<span>{fmenu.title}</span>}>
              {fmenu.children &&
                fmenu.children.map(smenu => (
                  <Menu.Item key={smenu.key}>{smenu.title}</Menu.Item>
                ))}
            </SubMenu>
          ))}
        </Menu>
      </Sider>
    );
  }
}

export default AppMenu;
