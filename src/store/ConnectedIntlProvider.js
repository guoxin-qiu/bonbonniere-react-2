import { connect } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import localeMessages from '../locale';
import flattenMessage from '../utils/flattenMessage';
import { AppConstant } from '../constants';

addLocaleData([...en, ...zh]);

const navigatorLocale =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  AppConstant.DEFAULT_LOCALE;

function mapStateToProps(state) {
  const locale = state.locales.locale || navigatorLocale;
  const messages = flattenMessage(localeMessages[locale]);
  return {
    locale,
    messages
  };
}

export default connect(mapStateToProps)(IntlProvider);
