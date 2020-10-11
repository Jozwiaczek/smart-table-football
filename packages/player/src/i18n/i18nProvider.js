import { resolveBrowserLocale } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import polishMessages from './pl';
import englishMessages from './en';

const i18nProvider = polyglotI18nProvider((locale) => {
  if (locale === 'pl') {
    return polishMessages;
  }

  return englishMessages;
}, resolveBrowserLocale());

export default i18nProvider;
