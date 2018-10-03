import React from 'react';
import { PropTypes } from 'prop-types';
import RouterProps from 'react-router-prop-types';
import { Form, Icon, Input, Button, message, Spin } from 'antd';
import { API, URL } from '../../constants';
import ajax from '../../utils/ajax';
import '../../styles/login.less';
import auth from '../../utils/auth';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  state = {
    isLoading: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const { form, history } = this.props;
    form.validateFields((err, values) => {
      const { username, password } = values;
      if (!err) {
        ajax
          .get(API.LOGIN, { username, password })
          .then(res => {
            if (res && res.length > 0) {
              const authInfo = res[0];
              this.setState({ isLoading: true });
              auth.setAuthentication(
                authInfo.username,
                authInfo.token,
                authInfo.locale
              );
              message.success('login successed.');
              setTimeout(() => {
                history.push({ pathname: URL.APP, state: values });
              }, 4000);
            } else {
              message.error('incorrect username or password.');
            }
          })
          .catch(() => message.error('server error.'));
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
                  type="password"
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
