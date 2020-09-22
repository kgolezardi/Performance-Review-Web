import React from 'react';
import { Box } from '@material-ui/core';
import { Forminator, SubmitButton } from 'src/shared/forminator';
import { Option } from 'src/shared/forminator/types';
import { action } from '@storybook/addon-actions';
import { i18n } from '@lingui/core';
import { storiesOf } from '@storybook/react';

import { Select } from './Select';

const options: Option[] = [
  { value: '0', label: 'عالی' },
  { value: '1', label: 'بسیار خوب' },
  { value: '2', label: 'خوب' },
  { value: '3', label: 'نیازمند تلاش' },
];

storiesOf('Select', module)
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
