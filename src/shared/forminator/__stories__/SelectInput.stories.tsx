import React from 'react';
import { FormControl, InputLabel } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import SelectInput from '../inputs/SelectInput';
import SubmitButton from '../utils/SubmitButton';
import { Forminator } from '../index';

const options = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
];

storiesOf('Forminator/Select input', module)
  .add('simple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <FormControl style={{ minWidth: 200 }}>
          <InputLabel>Number</InputLabel>
          <SelectInput options={options} />
        </FormControl>
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  })
  .add('with initial value', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <FormControl style={{ minWidth: 200 }}>
          <InputLabel>Number</InputLabel>
          <SelectInput options={options} initialValue="1" />
        </FormControl>
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
    );
  });
