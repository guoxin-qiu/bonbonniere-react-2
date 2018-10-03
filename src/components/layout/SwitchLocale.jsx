import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Radio } from 'antd';
import { actionCreators } from '../../store/SwitchLocale';
import { AppConstant } from '../../constants';

class SwitchLocale extends React.Component {
  changeLocale = e => {
    const localeValue = e.target.value || AppConstant.DEFAULT_LOCALE;
    const { changeLocale } = this.props;
    changeLocale(localeValue);
  };

  render() {
    const { locale } = this.props;
    return (
      <div className="change-locale">
        <Radio.Group defaultValue={locale} onChange={this.changeLocale}>
          <Radio.Button key="us" value="en-US">
            English
          </Radio.Button>
          <Radio.Button key="cn" value="zh-CN">
            中文
          </Radio.Button>
        </Radio.Group>
      </div>
    );
  }
}

SwitchLocale.propTypes = {
  locale: PropTypes.oneOf(['en-US', 'zh-CN']).isRequired,
  changeLocale: PropTypes.func.isRequired
};

export default connect(
  state => state.locales,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(SwitchLocale);
