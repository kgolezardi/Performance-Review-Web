import LimitedTextAreaInput from 'src/shared/forminator/inputs/LimitedTextAreaInput';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { storyWrapperDecorator } from 'src/stories/decorators/StoryWrapperDecorator';

import SubmitButton from '../utils/SubmitButton';
import { Forminator } from '..';

storiesOf('Forminator/Limited Text Area Input', module)
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
