import polyglotI18nProvider from 'ra-i18n-polyglot';

import polishMessages from './pl';
import englishMessages from './en';

const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === 'pl') {
    return polishMessages;
  }

  return englishMessages;
}, 'en');

export default i18nProvider;
