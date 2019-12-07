import { i18n } from '@lingui/core';
import fa from 'src/locales/fa/messages';
import en from 'src/locales/en/messages';

const catalogs = { fa, en };

export const configI18n = () => {
  i18n.load(catalogs);
  i18n.activate('fa');
};
