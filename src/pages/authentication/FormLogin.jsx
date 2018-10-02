import _ from 'lodash';
import React from 'react';
import { PropTypes } from 'prop-types';
import RouterProps from 'react-router-prop-types';
import { Form, Icon, Input, Button, message, Spin } from 'antd';
import * as AppConstant from '../../constants/appConstant';
import '../../styles/login.less';

const FormItem = Form.Item;
const users = [
  {
    username: 'admin',
    password: 'admin'
  },
  {
    username: 'denis',
    password: 'denis'
  }
];

const matchUser = (username, pwd) =>
  _.findIndex(users, u => u.username === username && u.password === pwd) >= 0;

class LoginForm extends React.Component {
  state = {
    isLoading: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, history } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form:', values);
        if (matchUser(values.username, values.password)) {
          this.setState({ isLoading: true });
          localStorage.setItem(
            AppConstant.USER_INFO_STORAGE_KEY,
            JSON.stringify(values)
          );
          message.success('login successed.');
          setTimeout(() => {
            history.push({ pathname: '/app', state: values });
          }, 4000);
        } else {
          message.error('incorrect username or password.');
        }
      }
    });
  };

  render() {
    const { form } = this.props;
    const { isLoading } = this.state;
    const { getFieldDecorator } = form;
    return isLoading ? (
      <Spin size="large" className="loading" />
    ) : (
      <div className="login">
        <div className="login-form">
          <div className="login-logo">
            <div className="login-title">Meeting Assistant</div>
          </div>
          <Form onSubmit={this.handleSubmit} style={{ maxWidth: '300px' }}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' }]
              })(
                <Input
                  prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                  placeholder="用户名"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                  placeholder="密码"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: '100%' }}
              >
                {'登录'}
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func
  }).isRequired,
  history: RouterProps.history.isRequired
};

const FormLogin = Form.create()(LoginForm);
export default FormLogin;
