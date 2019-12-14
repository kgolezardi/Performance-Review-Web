import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { themeDecorator } from 'src/stories/decorators';
import { Forminator } from '../index';
import SelectWithAutoComplete from '../inputs/SelectWithAutoComplete';
import SubmitButton from '../utils/SubmitButton';

const SUGGESTIONS = [
  { value: '1', label: 'مصطفی' },
  { value: '2', label: 'علی' },
  { value: '3', label: 'علی رضا' },
  { value: '4', label: 'رضا' },
];
const SUGGESTIONS_WITH_COLOR = [
  { value: '1', color: 'red', label: 'مصطفی' },
  { value: '2', color: 'blue', label: 'علی' },
  { value: '3', color: 'yellow', label: 'علی رضا' },
  { value: '4', color: 'green', label: 'رضا' },
];

storiesOf('Forminator|Auto Complete', module)
  .addDecorator(themeDecorator())
  .add('simple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <SelectWithAutoComplete options={SUGGESTIONS} label="یکی را انتخاب کنید:" />
        <SubmitButton>Submit</SubmitButton>
      </Forminator>
    );
  })
  .add('simple with default value', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <SelectWithAutoComplete options={SUGGESTIONS} initialValue={SUGGESTIONS[3].value} label="یکی را انتخاب کنید:" />
        <SubmitButton>Submit</SubmitButton>
      </Forminator>
    );
  })
  .add('simple with colors', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <SelectWithAutoComplete
          options={SUGGESTIONS_WITH_COLOR}
          initialValue={SUGGESTIONS[3].value}
          label="یکی را انتخاب کنید:"
          renderOption={(option, state) => {
            return (
              <div>
                <span style={{ backgroundColor: option.color, width: 8, height: 8, display: 'inline-block' }} />
                {option.label}
              </div>
            );
          }}
        />
        <SubmitButton>Submit</SubmitButton>
      </Forminator>
    );
  })
  .add('simple with specific size', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <SelectWithAutoComplete
          options={SUGGESTIONS}
          initialValue={SUGGESTIONS[3].value}
          label="یکی را انتخاب کنید:"
          style={{ width: '300px' }}
        />
        <SubmitButton>Submit</SubmitButton>
      </Forminator>
    );
  });
