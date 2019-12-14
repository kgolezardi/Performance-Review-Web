import { i18n } from '@lingui/core';
import { Box } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Evaluation } from 'src/globalTypes/Evaluation';
import { Forminator, SubmitButton } from 'src/shared/forminator';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';
import { Rating } from './Rating';

storiesOf('Rating', module)
  .addDecorator(themeDecorator())
  .add('simple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <Box width={240}>
          <Rating inputLabel={i18n._('Select')} />
        </Box>
        <SubmitButton variant="contained" color="primary">
          {i18n._('Submit')}
        </SubmitButton>
      </Forminator>
    );
  })
  .add('w/ initial value', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <Box width={240}>
          <Rating inputLabel={i18n._('Select')} initialValue={Evaluation.EXCEEDS_EXPECTATIONS} />
        </Box>
        <SubmitButton variant="contained" color="primary">
          {i18n._('Submit')}
        </SubmitButton>
      </Forminator>
    );
  });
