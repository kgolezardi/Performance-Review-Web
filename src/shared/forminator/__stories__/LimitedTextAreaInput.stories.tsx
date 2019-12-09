import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import LimitedTextAreaInput from 'src/shared/forminator/inputs/LimitedTextAreaInput';
import { themeDecorator } from 'src/stories/decorators';
import { storyWrapperDecorator } from 'src/stories/decorators/StoryWrapperDecorator';
import { Forminator } from '..';
import SubmitButton from '../utils/SubmitButton';

storiesOf('Forminator|Limited Text Area Input', module)
  .addDecorator(themeDecorator({ direction: 'ltr' }))
  .addDecorator(storyWrapperDecorator())
  .add('simple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <LimitedTextAreaInput label="text" variant="outlined" rows={4} maxChars={11} fullWidth />
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  });
