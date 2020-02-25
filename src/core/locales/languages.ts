import { Direction } from '@material-ui/core';
import { i18n } from '@lingui/core';

export type LanguageCodes = 'fa' | 'en';

export interface Language {
  code: LanguageCodes;
  name: string;
  direction: Direction;
}

export function getLanguages(): Language[] {
  return [
    { code: 'fa', name: i18n._('Persian'), direction: 'rtl' },
    { code: 'en', name: i18n._('English'), direction: 'ltr' },
  ];
}
