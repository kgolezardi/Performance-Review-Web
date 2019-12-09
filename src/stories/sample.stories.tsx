import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('Sample Story', module).add('Button', () => <button onClick={action('onClick')}>Click</button>);
