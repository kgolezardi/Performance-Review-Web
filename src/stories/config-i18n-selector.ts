import addons from '@storybook/addons';
import { Direction } from '@material-ui/core';
import { addParameters, forceReRender } from '@storybook/react';
import { getLanguages } from 'src/core/locales';
import { i18n } from '@lingui/core';

import { directionState } from './direction-state';

const setLanguage = (language?: { value: string; direction: Direction }) => {
  if (language) {
    i18n.activate(language.value);
    directionState.setDirection(language.direction);
  }
};

export default function configI18nSelector(defaultLang: string) {
  addParameters({
    selector: [
      {
        name: 'language',
        icon: 'globe',
        title: 'Change language',
        options: getLanguages().map(({ code, name, direction }) => ({
          value: code,
          title: name,
          direction,
          default: code === defaultLang,
        })),
      },
    ],
  });

  addons.getChannel().on('storybook/selector/language/update', selected => {
    setLanguage(selected);
    forceReRender();
  });

  addons.getChannel().on('storybook/selector/language/rendered', selected => {
    setLanguage(selected);
  });
}
