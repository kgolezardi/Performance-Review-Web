import { addParameters } from '@storybook/react';
import configI18nSelector from 'src/stories/config-i18n-selector';
import 'src/_config/install';

addParameters({
  backgrounds: [
    // material ui default
    { name: 'default', value: '#fafafa', default: true },
    { name: 'white', value: '#ffffff' },
  ],
});

configI18nSelector('fa');
