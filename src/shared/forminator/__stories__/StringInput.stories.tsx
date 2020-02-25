import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { themeDecorator } from 'src/stories/decorators';

import SubmitButton from '../utils/SubmitButton';
import { Forminator, StringInput } from '..';

storiesOf('Forminator|String input', module)
  .addDecorator(themeDecorator({ direction: 'ltr' }))
  .add('simple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <StringInput label="text" />
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  });
storiesOf('Forminator|String input/with initial value', module)
  .addDecorator(themeDecorator({ direction: 'ltr' }))
  .add('on string input', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <StringInput label="text" initialValue="Default string" />
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  })
  .add('on parent node', () => {
    return (
      <Forminator onSubmit={action('submit')} initialValue="Default forminator">
        <StringInput label="text" />
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  })
  .add('on both', () => {
    return (
      <Forminator onSubmit={action('submit')} initialValue="Default forminator">
        <StringInput label="text" initialValue="Default string" />
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  });
