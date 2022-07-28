import { themeDecorator } from 'src/stories/global-decorators';
import 'src/_config/install';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },

  backgrounds: {
    default: 'material-ui',
    values: [
      {
        name: 'material-ui',
        value: '#fafafa',
      },
      {
        name: 'white',
        value: '#ffffff',
      },
    ],
  },
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'fa',
    toolbar: {
      icon: 'globe',
      items: ['fa', 'en'],
    },
  },
};

export const decorators = [themeDecorator];
