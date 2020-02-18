import { LanguageCodes } from 'src/core/locales/types';

const farsiFormatter = new Intl.NumberFormat('fa-IR', { useGrouping: false });
const englishFormatter = new Intl.NumberFormat('en-US', { useGrouping: false });

export function localizeNumber(value: number, languageCode: LanguageCodes) {
  switch (languageCode) {
    case 'fa':
      return farsiFormatter.format(value);
    case 'en':
      return englishFormatter.format(value);
  }
}
