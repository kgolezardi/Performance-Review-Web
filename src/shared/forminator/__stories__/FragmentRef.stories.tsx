import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import DictInput from '../inputs/dict-input/DictInput';
import DictInputItem from '../inputs/dict-input/DictInputItem';
import FragmentRef from '../core/fragment-lens/FragmentRef';
import StringInput from '../inputs/StringInput';
import SubmitButton from '../utils/SubmitButton';
import { Forminator } from '../index';
import { FragmentLens } from '../core/fragment-lens/FragmentLens';
import { useFragmentLens } from '../core/fragment-lens/useFragmentLens';
import { useLensValue } from '../core/fragment-lens/useLensValue';

const Spy = ({ lens, name }: { lens?: FragmentLens<any>; name: string }) => {
  const value = useLensValue<string>(lens);
  action('value')(value);
  return (
    <div>
      {name}: {value}
    </div>
  );
};

storiesOf('Forminator/Internal / Fragment lens', module).add('spy value', () => {
  const lens = useFragmentLens();

  return (
    <div>
      <Forminator onSubmit={action('submit')}>
        <DictInput>
          <DictInputItem field="name">
            <StringInput label="Name" />
            <FragmentRef lens={lens} />
          </DictInputItem>
        </DictInput>
        <SubmitButton color="primary" variant="contained">
          Submit
        </SubmitButton>
      </Forminator>
      <Spy name="by lens" lens={lens} />
    </div>
  );
});
