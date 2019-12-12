import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { themeDecorator } from 'src/stories/decorators';
import { Forminator } from '../index';
import SelectWithAutoComplete from '../inputs/SelectWithAutoComplete';

const SUGGESTIONS = [{ title: 'مصطفی' }, { title: 'علی' }, { title: 'علی رضا' }, { title: 'رضا' }];

storiesOf('Forminator|Auto Complete', module)
  .addDecorator(themeDecorator())
  .add('simple', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <SelectWithAutoComplete options={SUGGESTIONS} label="یکی را انتخاب کنید:" />
      </Forminator>
    );
  })
  .add('simple with default value', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <SelectWithAutoComplete options={SUGGESTIONS} initialValue={SUGGESTIONS[3]} label="یکی را انتخاب کنید:" />
      </Forminator>
    );
  })
  .add('simple with specific size', () => {
    return (
      <Forminator onSubmit={action('submit')}>
        <SelectWithAutoComplete
          options={SUGGESTIONS}
          initialValue={SUGGESTIONS[3]}
          label="یکی را انتخاب کنید:"
          style={{ width: '300px' }}
        />
      </Forminator>
    );
  });
