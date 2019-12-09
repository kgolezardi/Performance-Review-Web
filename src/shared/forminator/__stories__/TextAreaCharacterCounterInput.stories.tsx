import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import TextAreaCharacterCounterInput from 'src/shared/forminator/inputs/TextAreaCharacterCounterInput';
import { themeDecorator } from 'src/stories/decorators';
import { Forminator } from '..';
import SubmitButton from '../utils/SubmitButton';

storiesOf('Forminator|Text Area Character Count input', module)
  .addDecorator(themeDecorator({ rtl: false }))
  .add('simple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <TextAreaCharacterCounterInput label="text" variant="outlined" rows={4} maxChars={11} />
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  });
