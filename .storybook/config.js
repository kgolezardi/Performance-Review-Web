import { configure } from '@storybook/react';
import { addParameters } from '@storybook/react';

addParameters({
  backgrounds: [
    // material ui default
    { name: 'default', value: '#fafafa', default: true },
    { name: 'white', value: '#ffffff' },
  ],
});

function loadStories() {
  require('src/stories');
}

configure(loadStories, module);
