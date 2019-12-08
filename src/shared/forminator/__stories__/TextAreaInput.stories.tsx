import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import LimitedTextAreaInput from 'src/shared/forminator/inputs/TextAreaInput';
import { themeDecorator } from 'src/stories/decorators';
import { Forminator } from '..';
import SubmitButton from '../utils/SubmitButton';

storiesOf('Forminator|Limited Text Area input', module)
  .addDecorator(themeDecorator({ rtl: false }))
  .add('simple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <LimitedTextAreaInput label="text" variant="outlined" rows={4} maxChars={11} />
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  });
