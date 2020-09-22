import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import DictInput from '../inputs/dict-input/DictInput';
import DictInputItem from '../inputs/dict-input/DictInputItem';
import SelectAutoComplete from '../inputs/SelectAutoComplete';
import SelectMultiAutoComplete from '../inputs/SelectMultiAutoComplete';
import SubmitButton from '../utils/SubmitButton';
import { Forminator } from '../index';

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

storiesOf('Forminator/Auto Complete', module)
  .add('simple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <SelectAutoComplete options={SUGGESTIONS} label="یکی را انتخاب کنید:" />
        <SubmitButton>Submit</SubmitButton>
      </Forminator>
    );
  })
  .add('simple with default value', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <SelectAutoComplete options={SUGGESTIONS} initialValue={SUGGESTIONS[3].value} label="یکی را انتخاب کنید:" />
        <SubmitButton>Submit</SubmitButton>
      </Forminator>
    );
  })
  .add('simple with black list', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <SelectAutoComplete options={SUGGESTIONS} excludes={['4']} label="یکی را انتخاب کنید:" />
        <SubmitButton>Submit</SubmitButton>
      </Forminator>
    );
  })
  .add('inside dict input', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <DictInput>
          <DictInputItem field="userId">
            <SelectAutoComplete options={SUGGESTIONS} initialValue={SUGGESTIONS[3].value} label="یکی را انتخاب کنید:" />
          </DictInputItem>
          <DictInputItem field="friendId">
            <SelectAutoComplete options={SUGGESTIONS} label="یکی را انتخاب کنید:" />
          </DictInputItem>
        </DictInput>
        <SubmitButton>Submit</SubmitButton>
      </Forminator>
    );
  })
  .add('simple with colors', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <SelectAutoComplete
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
        <SelectAutoComplete
          options={SUGGESTIONS}
          initialValue={SUGGESTIONS[3].value}
          label="یکی را انتخاب کنید:"
          style={{ width: '300px' }}
        />
        <SubmitButton>Submit</SubmitButton>
      </Forminator>
    );
  })
  .add('multiple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <SelectMultiAutoComplete filterSelectedOptions options={SUGGESTIONS} label="چند نفر را انتخاب نمایید" />
        <SubmitButton>Submit</SubmitButton>
      </Forminator>
    );
  })
  .add('multiple with initial value', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <SelectMultiAutoComplete
          filterSelectedOptions
          options={SUGGESTIONS}
          initialValue={['1', '4']}
          label="چند نفر را انتخاب نمایید"
        />
        <SubmitButton>Submit</SubmitButton>
      </Forminator>
    );
  })
  .add('multiple with blocked items', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <SelectMultiAutoComplete
          filterSelectedOptions
          options={SUGGESTIONS}
          excludes={['4']}
          label="چند نفر را انتخاب نمایید"
        />
        <SubmitButton>Submit</SubmitButton>
      </Forminator>
    );
  });
