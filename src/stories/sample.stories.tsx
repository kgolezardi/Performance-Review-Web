import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

storiesOf('Sample Story', module).add('Button', () => <button onClick={action('onClick')}>Click</button>);
