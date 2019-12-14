import { i18n } from '@lingui/core';
import { Box } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { Forminator, SubmitButton } from 'src/shared/forminator';
import { Option } from 'src/shared/forminator/types';
import { Select } from 'src/shared/select/Select';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';

const options: Option[] = [
  { value: '0', label: 'عالی' },
  { value: '1', label: 'بسیار خوب' },
  { value: '2', label: 'خوب' },
  { value: '3', label: 'نیازمند تلاش' },
];

storiesOf('Select', module)
  .addDecorator(themeDecorator())
  .add('simple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <Box width={240}>
          <Select inputLabel={i18n._('Select')} options={options} />
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
          <Select inputLabel={i18n._('Select')} options={options} initialValue="1" />
        </Box>
        <SubmitButton variant="contained" color="primary">
          {i18n._('Submit')}
        </SubmitButton>
      </Forminator>
    );
  });
