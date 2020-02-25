import en from 'src/locales/en/messages';
import fa from 'src/locales/fa/messages';
import { i18n } from '@lingui/core';

const catalogs = { fa, en };

export const configI18n = () => {
  i18n.load(catalogs);
  i18n.activate('fa');
};
