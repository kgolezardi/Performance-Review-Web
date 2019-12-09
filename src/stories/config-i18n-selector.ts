import { i18n } from '@lingui/core';
import { Direction } from '@material-ui/core/styles';
import addons from '@storybook/addons';
import { addParameters, forceReRender } from '@storybook/react';
import { getLanguages } from '../core/locales/languages';
import { directionState } from './direction-state';

const setLanguage = (language?: { value: string; direction: Direction }) => {
  if (language) {
    i18n.activate(language.value);
    directionState.setDirection(language.direction);
  }
};

export default function configI18nSelector(defaultLang: string) {
  addParameters({
    languages: {
      items: getLanguages().map(({ code, name, direction }) => ({ value: code, title: name, direction })),
    },
  });

  addons.getChannel().on('storybook/language/update', language => {
    setLanguage(language);
    forceReRender();
  });

  addons.getChannel().on('storybook/language/rendered', language => {
    setLanguage(language);
  });
}
